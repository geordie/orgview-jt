class EmployeesController < ApplicationController
  include EmployeeCsvImporter
  include ContractorCsvImporter
  include JobFamilyProcessor
  before_action :set_employee, only: [:show, :edit, :update, :destroy]

  def index
    @employees = Employee.current.includes(:manager, :direct_reports, :teams)

    @employees = @employees.where(title: params[:title])           if params[:title].present?
    @employees = @employees.where(job_code: params[:job_code])     if params[:job_code].present?
    @employees = @employees.where(job_family: params[:job_family]) if params[:job_family].present?

    if params[:direct_reports_bucket].present?
      min, max = direct_reports_bucket_to_range(params[:direct_reports_bucket])
      manager_ids = Employee.current.group(:manager_id).having("COUNT(*) >= ? AND COUNT(*) <= ?", min, max).pluck(:manager_id)
      @employees = @employees.where(person_id: manager_ids)
    end

    if params[:team_id].present?
      team = Team.where(data_version_id: @current_data_version.id).find_by(id: params[:team_id])
      if team
        descendant_teams = Team.where(
          "(full_path = :path OR full_path LIKE :like_path) AND data_version_id = :data_version_id",
          path: team.full_path,
          like_path: "#{team.full_path} > %",
          data_version_id: @current_data_version.id
        )
        @employees = @employees
          .joins(:teams_employees)
          .where(teams_employees: { team_id: descendant_teams.pluck(:id) })
      end
    end

    @employees = @employees.distinct.paginate(page: params[:page], per_page: 20)
  end

  def show
  end

  def new
    @employee = Employee.new
  end

  def edit
  end

  def create
    @employee = Employee.new(employee_params)
    respond_to do |format|
      if @employee.save
        format.html { redirect_to employee_url(@employee), notice: 'Employee was successfully created.' }
        format.json { render :show, status: :created, location: @employee }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @employee.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @employee.update(employee_params)
        format.html { redirect_to employee_url(@employee), notice: 'Employee was successfully updated.' }
        format.json { render json: @employee, status: :ok }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @employee.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @employee.destroy!
    respond_to do |format|
      format.html { redirect_to employees_url, notice: 'Employee was successfully deleted.' }
      format.json { head :no_content }
    end
  end

  # Deletes the employees of the current data version only, along with their
  # team memberships (which would otherwise block the delete via foreign key).
  # Other data versions and the teams themselves are left untouched.
  def destroy_all
    unless @current_data_version
      redirect_to employees_path, alert: 'No data version selected, so no employees were deleted.'
      return
    end

    employees = Employee.where(data_version_id: @current_data_version.id)
    deleted = 0
    Employee.transaction do
      TeamsEmployee.where(employee_id: employees.select(:id)).delete_all
      deleted = employees.delete_all
    end

    redirect_to employees_path,
                notice: "Deleted #{deleted} employees from #{@current_data_version.name}."
  end

  def treeview
    @org_sizes = org_sizes_for(@current_data_version&.id)
    @employees = Employee.current.includes(:teams, :direct_reports).where(
      'manager_id IS NULL OR manager_id NOT IN (SELECT person_id FROM employees WHERE data_version_id = ?)',
      @current_data_version&.id
    )
  end

  def direct_reports
    manager       = Employee.find(params[:id])
    direct_reports = Employee.where(manager_id: manager.person_id)
    org_sizes     = org_sizes_for(manager.data_version_id)
    @employees    = direct_reports.map { |e| build_hierarchy(e, false, org_sizes) }

    respond_to do |format|
      format.html { render partial: 'structure', locals: { employees: @employees } }
      format.json { render json: @employees }
    end
  end

  def import_csv
    uploaded_file = params[:csv_file]
    if uploaded_file.nil?
      flash[:alert] = 'No file selected.'
      redirect_to root_path and return
    end
    import_csv_file(uploaded_file)
  end

  def import_csv_contractors
    uploaded_file = params[:csv_file]
    if uploaded_file.nil?
      flash[:alert] = 'No file selected.'
      redirect_to root_path and return
    end
    import_contractor_csv_file(uploaded_file)
  end

  private

  # Maps person_id => total number of people below them (direct and indirect)
  # for one data version.
  def org_sizes_for(version_id)
    reports = Hash.new { |hash, key| hash[key] = [] }
    Employee.where(data_version_id: version_id).pluck(:person_id, :manager_id).each do |person_id, manager_id|
      reports[manager_id] << person_id if manager_id.present?
    end

    sizes = {}
    size_of = lambda do |person_id, path|
      sizes[person_id] ||= reports.fetch(person_id, []).sum do |report_id|
        path.include?(report_id) ? 0 : 1 + size_of.call(report_id, path + [person_id])
      end
    end
    Employee.where(data_version_id: version_id).pluck(:person_id).each { |person_id| size_of.call(person_id, []) }
    sizes
  end

  def build_hierarchy(employee, recursive = true, org_sizes = {})
    directs = recursive ? employee.direct_reports.map { |d| build_hierarchy(d, false, org_sizes) } : []
    {
      employee:       employee,
      directs_count:  employee.direct_reports.count,
      org_size:       org_sizes[employee.person_id] || 0,
      team_names:     employee.teams.map(&:name),
      direct_reports: directs
    }
  end

  def set_employee
    @employee = Employee.find(params[:id])
  end

  def direct_reports_bucket_to_range(bucket)
    case bucket
    when '> 15' then [16, 9999]
    when '11-15' then [11, 15]
    when '5-10'  then [5, 10]
    when '3-4'   then [3, 4]
    when '1-2'   then [1, 2]
    else [0, 0]
    end
  end

  def employee_params
    params.require(:employee).permit(
      :person_id, :title, :job_code, :job_level, :seniority,
      :manager_id, :is_manager, :country, :personnel_area, :company,
      :data_version_id, :page, :per_page, :name
    )
  end
end
