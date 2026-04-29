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

  def destroy_all
    Employee.delete_all
    redirect_to employees_path, notice: 'All employees have been deleted.'
  end

  def treeview
    @employees = Employee.current.where(
      'manager_id IS NULL OR manager_id NOT IN (SELECT person_id FROM employees WHERE data_version_id = ?)',
      @current_data_version&.id
    )
  end

  def direct_reports
    manager       = Employee.find(params[:id])
    direct_reports = Employee.where(manager_id: manager.person_id)
    @employees    = direct_reports.map { |e| build_hierarchy(e, false) }

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

  def build_hierarchy(employee, recursive = true)
    directs = recursive ? employee.direct_reports.map { |d| build_hierarchy(d, false) } : []
    {
      employee:       employee,
      directs_count:  employee.direct_reports.count,
      direct_reports: directs
    }
  end

  def set_employee
    @employee = Employee.find(params[:id])
  end

  def employee_params
    params.require(:employee).permit(
      :person_id, :title, :job_code, :job_level, :seniority,
      :manager_id, :is_manager, :country, :personnel_area, :company,
      :data_version_id, :page, :per_page, :name
    )
  end
end
