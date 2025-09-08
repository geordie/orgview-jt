require "test_helper"

class ReportsControllerTest < ActionDispatch::IntegrationTest
  # Employee Reports
  test "should get roles" do
    get reports_roles_url
    assert_response :success
    assert_select "h2", text: /Roles Report/i
  end

  test "should get employee_country" do
    get reports_employee_country_url
    assert_response :success
    assert_select "h2", text: /Employee Countries Report/i
  end

  test "employee_country report should filter by current data version" do
    # Ensure the correct data version is active (using existing fixtures)
    data_version_1 = data_versions(:test_version)
    data_version_2 = data_versions(:inactive_version)

    # Ensure data_version_1 is active (it should be by default in fixtures)
    data_version_1.update!(is_active: true, status: 'active')
    data_version_2.update!(is_active: false, status: 'archived')

    # Verify our test data setup using fixtures
    # Data version 1 should have employees from USA and Canada
    v1_countries = Employee.where(data_version_id: data_version_1.id).pluck(:country).uniq.sort
    assert_includes v1_countries, 'USA'
    assert_includes v1_countries, 'Canada'

    # Data version 2 should have employees from UK and Germany
    v2_countries = Employee.where(data_version_id: data_version_2.id).pluck(:country).uniq.sort
    assert_includes v2_countries, 'UK'
    assert_includes v2_countries, 'Germany'

    # Make request to employee_country report
    get reports_employee_country_url
    assert_response :success

    # Should use the generic template (modernized report)
    assert_select "h2", text: /Employee Countries Report/i
    assert_select "div.table-container"
    assert_select "canvas#employeeCountryChart"

    # Should see countries from active version (1) only
    assert_includes response.body, 'USA'
    assert_includes response.body, 'Canada'

    # Should NOT see countries from inactive version (2)
    assert_not_includes response.body, 'Germany',
      "Germany should not appear because it's only in the inactive data version"
  end

  test "should get employee_worker_type" do
    get reports_employee_worker_type_url
    assert_response :success
  end

  test "should get employee_country_worker_type" do
    get reports_employee_country_worker_type_url
    assert_response :success
  end

  test "should get employee_allocations" do
    get reports_employee_allocations_url
    assert_response :success
  end

  test "should get seniority" do
    get reports_seniority_url
    assert_response :success
  end

  # Job Function Reports
  test "should get job_function" do
    get reports_job_function_url
    assert_response :success
    assert_select "h2", text: /Job Functions Report/i
  end

  test "should get job_function_group" do
    get reports_job_function_group_url
    assert_response :success
    assert_select "h2", text: /Job Function Group Report/i
  end

  test "should get job_function_density" do
    get reports_job_function_density_url
    assert_response :success
    assert_select "h2", text: /Job Function Density Report/i
  end

  # Title/Role Reports
  test "should get title_density" do
    get reports_title_density_url
    assert_response :success
    assert_select "h2", text: /Title Density Report/i
  end

  # Management Reports
  test "should get management_ratios" do
    get reports_management_ratios_url
    assert_response :success
    assert_select "h2", text: /Management Ratios Report/i
  end

  # Squad Reports
  test "should get squad_size" do
    get reports_squad_size_url
    assert_response :success
  end

  test "should get squad_depth" do
    get reports_squad_depth_url
    assert_response :success
  end

  test "should get squad_children" do
    get reports_squad_children_url
    assert_response :success
  end

  test "should get squad_members_managers" do
    get reports_squad_members_managers_url
    assert_response :success
  end

  test "should get squad_health" do
    get reports_squad_health_url
    assert_response :success
  end

  test "should get squad_health_details" do
    get reports_squad_health_details_url
    assert_response :success
  end

  # Geographic Reports
  test "should get team_geos" do
    get reports_team_geos_url
    assert_response :success
  end

  # Test that all modernized reports use the generic template
  test "modernized reports should render generic template" do
    modernized_reports = %w[roles job_function job_function_group management_ratios]

    modernized_reports.each do |report|
      get "/reports/#{report}"
      assert_response :success

      # Check for generic report elements
      assert_select "div.table-container"
      assert_select "canvas" # Chart canvas element
    end
  end

  # Test that reports work with parameters
  test "should handle report parameters gracefully" do
    # Test with squad filtering
    get reports_roles_url(squad_id: 999999) # Non-existent squad
    assert_response :success

    # Test with job function filtering
    get reports_roles_url(job_function: "Engineering")
    assert_response :success

    # Test with depth parameters
    get reports_job_function_density_url(max_depth: 2)
    assert_response :success
  end

  # Test that reports handle missing data gracefully
  test "should handle empty data sets" do
    # This tests that reports don't crash when there's no data
    get reports_roles_url
    assert_response :success

    get reports_management_ratios_url
    assert_response :success
  end

  # Performance/Load Test
  test "all reports should load without errors" do
    # Get all report routes
    report_routes = [
      reports_roles_url,
      reports_employee_country_url,
      reports_employee_worker_type_url,
      reports_employee_country_worker_type_url,
      reports_employee_allocations_url,
      reports_seniority_url,
      reports_job_function_url,
      reports_job_function_group_url,
      reports_job_function_density_url,
      reports_title_density_url,
      reports_management_ratios_url,
      reports_squad_size_url,
      reports_squad_depth_url,
      reports_squad_children_url,
      reports_squad_members_managers_url,
      reports_squad_health_url,
      reports_squad_health_details_url,
      reports_team_geos_url
    ]

    # Test that all reports load successfully
    report_routes.each do |route|
      get route
      assert_response :success, "Failed to load #{route}"
    end
  end
end
