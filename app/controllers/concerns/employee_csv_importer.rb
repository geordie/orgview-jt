module EmployeeCsvImporter
  extend ActiveSupport::Concern

  require 'csv'

  EXPECTED_CSV_HEADERS = %w[
    Person\ ID
    Business\ Title
    Job\ Code
    Job\ Level
    Country
    Personnel\ Area
    Company/Subsidiary
    Org\ Unit
    Leader\ ID
  ].freeze

  # Parses "(P22) Sr" or "(M25) Dir" → [is_manager, seniority_int]
  # M prefix = manager, P prefix = individual contributor.
  # Returns [nil, 0] when the format is unrecognised.
  def parse_job_level(job_level)
    return [nil, 0] if job_level.blank?

    match = job_level.match(/\(([MP])(\d+)\)/i)
    return [nil, 0] unless match

    is_manager = match[1].upcase == 'M'
    seniority  = match[2].to_i
    [is_manager, seniority]
  end

  def import_csv_file(uploaded_file)
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

    process_csv(temp_file)
    File.delete(temp_file) if File.exist?(temp_file)
  end

  private

  def process_csv(temp_file)
    csv = begin
      CSV.read(temp_file, encoding: 'bom|utf-8', headers: true)
    rescue CSV::MalformedCSVError
      flash[:alert] = 'The uploaded file is not a valid CSV file.'
      redirect_to root_path and return
    end

    missing = EXPECTED_CSV_HEADERS.reject { |h| csv.headers.include?(h) }
    if missing.any?
      flash[:alert] = "CSV is missing required headers: #{missing.join(', ')}"
      redirect_to root_path and return
    end

    current_version = DataVersion.active.first
    unless current_version
      flash[:alert] = 'No active data version. Please create and activate a version first.'
      redirect_to root_path and return
    end

    # Clear existing data for this version
    TeamsEmployee.where(data_version_id: current_version.id).delete_all
    Team.where(data_version_id:          current_version.id).delete_all
    Employee.where(data_version_id:      current_version.id).delete_all
    Emp.delete_all

    # --- Stage 1: load raw rows into emp ---
    emp_batch     = []
    emp_batch_size = 5000
    seen_ids      = {}

    csv.each do |row|
      person_id = row['Person ID'].to_s.strip
      next if person_id.blank? || seen_ids[person_id]

      seen_ids[person_id] = true
      emp_batch << {
        person_id:      person_id,
        business_title: row['Business Title'],
        job_code:       row['Job Code'],
        job_level:      row['Job Level'],
        country:        row['Country'],
        personnel_area: row['Personnel Area'],
        company:        row['Company/Subsidiary'],
        org_unit:       row['Org Unit'],
        leader_id:      row['Leader ID'],
        created_at:     Time.current,
        updated_at:     Time.current
      }

      if emp_batch.size >= emp_batch_size
        Emp.insert_all!(emp_batch)
        emp_batch.clear
      end
    end
    Emp.insert_all!(emp_batch) if emp_batch.any?

    # --- Stage 2: build employees from emp ---
    # First pass: collect all person_ids so we can derive is_manager from leader_id
    all_person_ids = Emp.pluck(:person_id).to_set
    leader_ids     = Emp.where.not(leader_id: [nil, '']).pluck(:leader_id).to_set

    employee_batch     = []
    employee_batch_size = 5000

    Emp.import_filter.each do |emp|
      is_manager, seniority = parse_job_level(emp.job_level)

      # Fall back to leader_id scan when job_level prefix is absent
      is_manager = leader_ids.include?(emp.person_id) if is_manager.nil?

      employee_batch << {
        person_id:      emp.person_id,
        title:          emp.business_title,
        job_code:       emp.job_code,
        job_level:      emp.job_level,
        seniority:      seniority,
        manager_id:     emp.leader_id.presence,
        is_manager:     is_manager || false,
        country:        emp.country,
        personnel_area: emp.personnel_area,
        company:        emp.company,
        data_version_id: current_version.id,
        created_at:     Time.current,
        updated_at:     Time.current
      }

      if employee_batch.size >= employee_batch_size
        Employee.insert_all!(employee_batch)
        employee_batch.clear
      end
    end
    Employee.insert_all!(employee_batch) if employee_batch.any?

    flash[:notice] = "Imported #{Employee.where(data_version_id: current_version.id).count} employees successfully."
    redirect_to root_path
  end
end
