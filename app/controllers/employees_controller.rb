class EmployeesController < ApplicationController
  include EmployeeGenerator, CbaEmployeeGenerator
  before_action :set_employee, only: [ :show, :edit, :update, :destroy ]

  # GET /employees or /employees.json
  def index
    @employees = Employee.all.paginate(page: params[:page], per_page: 20)
  end

  # GET /employees/1 or /employees/1.json
  def show
  end

  # GET /employees/new
  def new
    @employee = Employee.new
  end

  # GET /employees/1/edit
  def edit
  end

  # POST /employees or /employees.json
  def create
    @employee = Employee.new(employee_params)

    respond_to do |format|
      if @employee.save
        format.html { redirect_to employee_url(@employee), notice: "Employee was successfully created." }
        format.json { render :show, status: :created, location: @employee }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @employee.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /employees/1 or /employees/1.json
  def update
    respond_to do |format|
      if @employee.update(employee_params)
        format.html { redirect_to employee_url(@employee), notice: "Employee was successfully updated." }
        format.json { render :show, status: :ok, location: @employee }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @employee.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /employees/1 or /employees/1.json
  def destroy
    @employee.destroy!

    respond_to do |format|
      format.html { redirect_to employees_url, notice: "Employee was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  def destroy_all
    Employee.delete_all
    redirect_to employees_path, notice: 'All employees have been deleted.'
  end

  def structure
    employee = Employee.where(['manager_id = ? ', 518933])
    @employees = employee.map { |manager| build_hierarchy(manager, false) }
  end

  def direct_reports
    manager = Employee.find(params[:id])
    direct_reports = Employee.where(manager_id: manager.id)
    @employees = direct_reports.map { |employee| build_hierarchy(employee, false) }

    respond_to do |format|
      format.html { render partial: 'structure', locals: { employees: @employees } }
      format.json { render json: @employees }
    end
  end

  def treeview
    employee = Employee.where("manager_id NOT IN (SELECT id FROM employees)").first
    employees = [employee]
    direct_reports = Employee.where(manager_id: employee.id)
    direct_reports.each do |direct|
      employees << direct
    end
    @google_chart_data = employees.map do |employee|
      [
        {
          v: employee.id.to_s,
          f: employee.name,
        },
        employee.manager_id.to_s,
        employee.title
      ]
    end
  end

  def treeview2
    #@employees = Employee.where("manager_id NOT IN (SELECT id FROM employees)")
    @employees = Employee.where("id = 517096")
    fill_with_direct_reports(@employees)
  end

  private
    def build_hierarchy(employee, recursive = true)
      directs = []
      if recursive
        directs = employee.direct_reports.map { |direct| build_hierarchy(direct, false) }
      end
      {
        employee: employee,
        directs_count: employee.direct_reports.count,
        direct_reports: directs
      }
    end

    def fill_with_direct_reports(employees)
      employees = employees.to_a
      employees.each do |employee|
        direct_reports = employee.get_direct_reports
        direct_reports.each do |direct|
          employees << direct
        end
        fill_with_direct_reports(direct_reports)
      end
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_employee
      @employee = Employee.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def employee_params
      params.require(:employee).permit(:name, :title, :job_function, :seniority, :start_date, :manager_id, :is_manager, :page, :per_page, :sort_by, :sort_order, :search)
    end

end
