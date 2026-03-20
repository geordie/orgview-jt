require "test_helper"

class ReportsControllerTest < ActionDispatch::IntegrationTest
  # Employee Reports
  test "should get roles" do
    get reports_roles_url
    assert_response :success
  end

  test "should get employee_country" do
    get reports_employee_country_url
    assert_response :success
  end

  test "employee_country report should filter by current data version" do
    data_version_1 = data_versions(:test_version)
    data_version_2 = data_versions(:inactive_version)

    data_version_1.update!(is_active: true, status: 'active')
    data_version_2.update!(is_active: false, status: 'archived')

    v1_countries = Employee.where(data_version_id: data_version_1.id).pluck(:country).uniq.sort
    assert_includes v1_countries, 'USA'
    assert_includes v1_countries, 'Canada'

    v2_countries = Employee.where(data_version_id: data_version_2.id).pluck(:country).uniq.sort
    assert_includes v2_countries, 'UK'
    assert_includes v2_countries, 'Germany'

    get reports_employee_country_url
    assert_response :success

    assert_includes response.body, 'USA'
    assert_includes response.body, 'Canada'

    assert_not_includes response.body, 'Germany',
      "Germany should not appear because it's only in the inactive data version"
  end

  test "should get personnel_area" do
    get reports_personnel_area_url
    assert_response :success
  end

  test "should get company" do
    get reports_company_url
    assert_response :success
  end

  test "should get seniority" do
    get reports_seniority_url
    assert_response :success
  end

  test "should get job_code" do
    get reports_job_code_url
    assert_response :success
  end

  test "should get job_code_density" do
    get reports_job_code_density_url
    assert_response :success
  end

  # Title/Role Reports
  test "should get title_density" do
    get reports_title_density_url
    assert_response :success
  end

  # Management Reports
  test "should get management_ratios" do
    get reports_management_ratios_url
    assert_response :success
  end

  # Team Reports
  test "should get team_size" do
    get reports_team_size_url
    assert_response :success
  end

  test "should get team_depth" do
    get reports_team_depth_url
    assert_response :success
  end

  test "should get team_children" do
    get reports_team_children_url
    assert_response :success
  end

  test "should get team_members_managers" do
    get reports_team_members_managers_url
    assert_response :success
  end

  test "should get team_health" do
    get reports_team_health_url
    assert_response :success
  end

  test "should get team_health_details" do
    get reports_team_health_details_url
    assert_response :success
  end

  test "should handle report parameters gracefully" do
    get reports_roles_url(team_id: 999999)
    assert_response :success

    get reports_roles_url(job_code: "ENGR03")
    assert_response :success

    get reports_job_code_density_url(max_depth: 2)
    assert_response :success
  end

  test "should handle empty data sets" do
    get reports_roles_url
    assert_response :success

    get reports_management_ratios_url
    assert_response :success
  end

  test "all reports should load without errors" do
    report_routes = [
      reports_roles_url,
      reports_title_density_url,
      reports_job_code_url,
      reports_job_code_density_url,
      reports_seniority_url,
      reports_employee_country_url,
      reports_personnel_area_url,
      reports_company_url,
      reports_management_ratios_url,
      reports_team_size_url,
      reports_team_depth_url,
      reports_team_children_url,
      reports_team_members_managers_url,
      reports_team_health_url,
      reports_team_health_details_url
    ]

    report_routes.each do |route|
      get route
      assert_response :success, "Failed to load #{route}"
    end
  end
end
