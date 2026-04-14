module ContractorCsvImporter
  extend ActiveSupport::Concern

  require 'csv'

  CONTRACTOR_CSV_HEADERS = ['Person', 'Team', 'Role', 'Leader Level 4', 'FTC Count', 'Vendor', 'Team_ID'].freeze

  def import_contractor_csv_file(uploaded_file)
    unless uploaded_file.content_type == 'text/csv'
      flash[:alert] = 'Please upload a valid CSV file.'
      redirect_to root_path and return
    end

    if uploaded_file.size == 0
      flash[:alert] = 'The uploaded file is empty.'
      redirect_to root_path and return
    end

    if uploaded_file.size > 58.megabytes
      flash[:alert] = 'The uploaded file is too large. Please upload a file smaller than 58MB.'
      redirect_to root_path and return
    end

    temp_file = Rails.root.join('tmp', uploaded_file.original_filename)
    File.open(temp_file, 'wb') { |f| f.write(uploaded_file.read) }

    process_contractor_csv(temp_file)
    File.delete(temp_file) if File.exist?(temp_file)
  end

  private

  def process_contractor_csv(temp_file)
    csv = begin
      CSV.read(temp_file, encoding: 'bom|utf-8', headers: true)
    rescue CSV::MalformedCSVError
      flash[:alert] = 'The uploaded file is not a valid CSV file.'
      redirect_to root_path and return
    end

    missing = CONTRACTOR_CSV_HEADERS.reject { |h| csv.headers.include?(h) }
    if missing.any?
      flash[:alert] = "CSV is missing required headers: #{missing.join(', ')}"
      redirect_to root_path and return
    end

    current_version = DataVersion.active.first
    unless current_version
      flash[:alert] = 'No active data version. Please create and activate a version first.'
      redirect_to root_path and return
    end

    title_job_attrs_cache  = {}
    team_manager_pid_cache = {}
    employee_records       = []
    teams_employee_map     = [] # [{person_id:, team_id:}]

    csv.each do |row|
      title   = row['Role'].to_s.strip
      team_id = row['Team_ID'].to_s.strip.to_i
      next if title.blank? || team_id.zero?

      # Generate a unique person_id for this contractor ("FTC_" + 28 hex chars = 32 chars max)
      person_id = "FTC_#{SecureRandom.hex(14)}"

      job_attrs   = title_job_attrs_cache[title]   ||= fetch_contractor_job_attrs(title, current_version.id)
      manager_pid = team_manager_pid_cache[team_id] ||= fetch_team_manager_pid(team_id, current_version.id)

      employee_records << {
        person_id:       person_id,
        title:           title,
        job_code:        job_attrs[:job_code],
        job_level:       job_attrs[:job_level],
        seniority:       job_attrs[:seniority],
        manager_id:      manager_pid,
        is_manager:      false,
        employee_type:   'FTC',
        data_version_id: current_version.id,
        created_at:      Time.current,
        updated_at:      Time.current
      }
      teams_employee_map << { person_id: person_id, team_id: team_id }
    end

    if employee_records.empty?
      flash[:alert] = 'No valid contractor rows found in the CSV.'
      redirect_to root_path and return
    end

    Employee.insert_all!(employee_records)

    # Resolve person_id → employee.id for teams_employees (insert_all doesn't return IDs)
    pid_to_id = Employee
      .where(person_id: teams_employee_map.map { |r| r[:person_id] })
      .pluck(:person_id, :id)
      .to_h

    te_records = teams_employee_map.filter_map do |r|
      emp_id = pid_to_id[r[:person_id]]
      next unless emp_id
      {
        employee_id:     emp_id,
        team_id:         r[:team_id],
        allocation:      1.0,
        data_version_id: current_version.id,
        created_at:      Time.current,
        updated_at:      Time.current
      }
    end

    TeamsEmployee.insert_all!(te_records) if te_records.any?

    flash[:notice] = "Imported #{employee_records.size} contractors successfully."
    redirect_to root_path
  end

  # Returns the most common {job_code, job_level, seniority} combination for the given title.
  def fetch_contractor_job_attrs(title, version_id)
    result = Employee
      .where(data_version_id: version_id, title: title)
      .group(:job_code, :job_level, :seniority)
      .order(Arel.sql('COUNT(*) DESC'))
      .limit(1)
      .pick(:job_code, :job_level, :seniority)

    result ? { job_code: result[0], job_level: result[1], seniority: result[2] || 0 }
           : { job_code: nil, job_level: nil, seniority: 0 }
  end

  # Returns the person_id of the manager on the given team for the current version.
  def fetch_team_manager_pid(team_id, version_id)
    Employee
      .joins(:teams_employees)
      .where(
        data_version_id: version_id,
        is_manager:      true,
        teams_employees: { team_id: team_id, data_version_id: version_id }
      )
      .pick(:person_id)
  end
end
