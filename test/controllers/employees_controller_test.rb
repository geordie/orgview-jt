require "test_helper"

class EmployeesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @employee = employees(:employee_2183)
  end

  test "should get index" do
    get employees_url
    assert_response :success
  end

  test "should get new" do
    get new_employee_url
    assert_response :success
  end

  test "should create employee" do
    assert_difference("Employee.count") do
      post employees_url, params: { employee: {
        person_id: "EMP999",
        name: @employee.name,
        title: @employee.title,
        job_function: @employee.job_function,
        job_function_group: @employee.job_function_group,
        seniority: @employee.seniority,
        manager_id: @employee.manager_id,
        is_manager: @employee.is_manager,
        start_date: @employee.start_date,
        worker_type: @employee.worker_type,
        country: @employee.country,
        data_version_id: @employee.data_version_id
      } }
    end

    assert_redirected_to employee_url(Employee.last)
  end

  test "should show employee" do
    get employee_url(@employee)
    assert_response :success
  end

  test "should get edit" do
    get edit_employee_url(@employee)
    assert_response :success
  end

  test "should update employee" do
    patch employee_url(@employee), params: { employee: {
      person_id: @employee.person_id,
      name: @employee.name,
      title: @employee.title,
      job_function: @employee.job_function,
      job_function_group: @employee.job_function_group,
      seniority: @employee.seniority,
      manager_id: @employee.manager_id,
      is_manager: @employee.is_manager,
      start_date: @employee.start_date,
      worker_type: @employee.worker_type,
      country: @employee.country,
      data_version_id: @employee.data_version_id
    } }
    assert_redirected_to employee_url(@employee)
  end

  test "should destroy employee" do
    assert_difference("Employee.count", -1) do
      delete employee_url(@employee)
    end

    assert_redirected_to employees_url
  end

  test "index should only return employees from current data version" do
    get employees_url

    assert_response :success

    # Get all employees that should be visible (current data version)
    active_data_version = data_versions(:test_version)
    expected_employees = Employee.where(data_version_id: active_data_version.id)

    # Get all employees that should not be visible (inactive data version)
    inactive_data_version = data_versions(:inactive_version)
    inactive_employees = Employee.where(data_version_id: inactive_data_version.id)

    # Verify we have test data for both versions
    assert inactive_employees.any?, "Test should have employees in inactive data version"
    assert expected_employees.any?, "Test should have employees in active data version"

    # Check that the page contains expected employees
    expected_employees.each do |employee|
      assert_select "tr", text: /#{employee.name}/, count: 1,
        message: "Employee #{employee.name} from active data version should be visible"
    end

    # Check that the page does not contain inactive employees
    inactive_employees.each do |employee|
      assert_select "tr", text: /#{employee.name}/, count: 0,
        message: "Employee #{employee.name} from inactive data version should not be visible"
    end
  end
end
