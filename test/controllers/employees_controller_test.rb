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
        title: @employee.title,
        job_code: @employee.job_code,
        job_level: @employee.job_level,
        seniority: @employee.seniority,
        manager_id: @employee.manager_id,
        is_manager: @employee.is_manager,
        country: @employee.country,
        personnel_area: @employee.personnel_area,
        company: @employee.company,
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
      title: @employee.title,
      job_code: @employee.job_code,
      job_level: @employee.job_level,
      seniority: @employee.seniority,
      manager_id: @employee.manager_id,
      is_manager: @employee.is_manager,
      country: @employee.country,
      personnel_area: @employee.personnel_area,
      company: @employee.company,
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

  # --- populate_job_families ---

  test "populate_job_families sets job_family for software engineer titles" do
    engineer = employees(:engineer)
    engineer.update_column(:title, 'Software Engineer II')
    assert_nil engineer.job_family

    post populate_job_families_url
    assert_redirected_to root_path

    engineer.reload
    assert_equal 'Software Engineering', engineer.job_family
  end

  test "populate_job_families does not affect non-software-engineer titles" do
    ceo = employees(:ceo)
    assert_nil ceo.job_family

    post populate_job_families_url
    ceo.reload

    assert_nil ceo.job_family
  end

  test "populate_job_families matches titles case-insensitively" do
    engineer = employees(:engineer)
    engineer.update_column(:title, 'SOFTWARE ENGINEER II')

    post populate_job_families_url
    engineer.reload

    assert_equal 'Software Engineering', engineer.job_family
  end

  test "populate_job_families sets job_family for infrastructure administrator titles" do
    engineer = employees(:engineer)
    engineer.update_column(:title, 'Infrastructure Administrator II')
    assert_nil engineer.job_family

    post populate_job_families_url
    engineer.reload

    assert_equal 'Infrastructure Administration', engineer.job_family
  end

  test "populate_job_families sets job_family for software administrator titles" do
    engineer = employees(:engineer)
    engineer.update_column(:title, 'Software Administrator II')
    assert_nil engineer.job_family

    post populate_job_families_url
    engineer.reload

    assert_equal 'Software & System Administration', engineer.job_family
  end

  test "populate_job_families sets job_family for system administrator titles" do
    engineer = employees(:engineer)
    engineer.update_column(:title, 'System Administrator III')
    assert_nil engineer.job_family

    post populate_job_families_url
    engineer.reload

    assert_equal 'Software & System Administration', engineer.job_family
  end

  test "populate_job_families sets job_family to Directors when title contains dir" do
    engineer = employees(:engineer)
    engineer.update_column(:title, 'Dir, Software Engineering')
    assert_nil engineer.job_family

    post populate_job_families_url
    engineer.reload

    assert_equal 'Directors', engineer.job_family
  end

  test "populate_job_families sets job_family to Engineering Management when title contains mgr and engineering" do
    engineer = employees(:engineer)
    engineer.update_column(:title, 'Mgr, Platform Engineering')
    assert_nil engineer.job_family

    post populate_job_families_url
    engineer.reload

    assert_equal 'Engineering Management', engineer.job_family
  end

  test "populate_job_families sets job_family to Business Analysis when title contains analyst" do
    engineer = employees(:engineer)
    engineer.update_column(:title, 'Senior Business Analyst')
    assert_nil engineer.job_family

    post populate_job_families_url
    engineer.reload

    assert_equal 'Business Analysis', engineer.job_family
  end

  test "populate_job_families sets job_family for network engineer titles" do
    engineer = employees(:engineer)
    engineer.update_column(:title, 'Network Engineer II')
    assert_nil engineer.job_family

    post populate_job_families_url
    engineer.reload

    assert_equal 'Network Engineering', engineer.job_family
  end

  test "populate_job_families sets job_family for infrastructure engineer titles" do
    engineer = employees(:engineer)
    engineer.update_column(:title, 'Infrastructure Engineer III')
    assert_nil engineer.job_family

    post populate_job_families_url
    engineer.reload

    assert_equal 'Infrastructure Engineering', engineer.job_family
  end

  test "index should only return employees from current data version" do
    get employees_url

    assert_response :success

    active_data_version = data_versions(:test_version)
    expected_employees = Employee.where(data_version_id: active_data_version.id)

    inactive_data_version = data_versions(:inactive_version)
    inactive_employees = Employee.where(data_version_id: inactive_data_version.id)

    assert inactive_employees.any?, "Test should have employees in inactive data version"
    assert expected_employees.any?, "Test should have employees in active data version"

    expected_employees.each do |employee|
      assert_select "tr", text: /#{employee.person_id}/, minimum: 1,
        message: "Employee #{employee.person_id} from active data version should be visible"
    end

    inactive_employees.each do |employee|
      assert_select "tr", text: /#{employee.person_id}/, count: 0,
        message: "Employee #{employee.person_id} from inactive data version should not be visible"
    end
  end
end
