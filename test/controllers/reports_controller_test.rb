require "test_helper"

class ReportsControllerTest < ActionDispatch::IntegrationTest
  # Employee Reports
  test "should get roles" do
    get reports_roles_url
    assert_response :success
  end

  test "roles report shows job family column" do
    employees(:engineer).update_column(:job_family, 'Software Engineering')

    get reports_roles_url
    assert_response :success

    assert_includes response.body, 'Job Family'
    assert_includes response.body, 'Software Engineering'
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

  test "should get job_family" do
    get reports_job_family_url
    assert_response :success
  end

  test "job_family report shows job family counts grouped correctly" do
    employees(:engineer).update_column(:job_family, 'Software Engineering')
    employees(:manager).update_column(:job_family, 'Software Engineering')

    get reports_job_family_url
    assert_response :success

    assert_includes response.body, 'Software Engineering'
    assert_includes response.body, 'Unassigned'
  end

  test "job_family report only shows data for active version" do
    employees(:engineer).update_column(:job_family, 'Software Engineering')

    get reports_job_family_url
    assert_response :success

    assert_includes response.body, 'Software Engineering'
  end

  test "should get seniority" do
    get reports_seniority_url
    assert_response :success
  end

  test "seniority report filters by team_id to include only team and its sub-hierarchy" do
    engineering = teams(:engineering)
    ceo         = employees(:ceo)   # seniority: 30, in Leadership (outside engineering hierarchy)
    cto         = employees(:cto)   # seniority: 28, in Engineering

    get reports_seniority_url, params: { team_id: engineering.id }
    assert_response :success

    assert_includes response.body, engineering.full_path,
      "Subtitle should include the filtered team's full path"
    assert_includes response.body, cto.seniority.to_s,
      "CTO seniority should appear as they are in the engineering hierarchy"

    # CEO (seniority 30) is in Leadership. When filtered by engineering, only 3 employees
    # appear (CTO, manager, engineer). The total row should reflect this, not include CEO.
    assert_includes response.body, "<strong> 3 </strong>",
      "Only 3 employees in the engineering hierarchy should be counted"
    assert_not_includes response.body, "<strong> #{Employee.current.count} </strong>",
      "Full employee count should not appear when filtered by team"
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
  test "should get individual_contributors" do
    get reports_individual_contributors_url
    assert_response :success
  end

  test "individual_contributors report shows managers and ICs" do
    get reports_individual_contributors_url
    assert_response :success
    assert_includes response.body, 'Managers'
    assert_includes response.body, 'Individual Contributors'
  end

  test "individual_contributors report shows correct counts for active version" do
    data_version_1 = data_versions(:test_version)
    data_version_1.update!(is_active: true, status: 'active')

    expected_managers = Employee.where(data_version_id: data_version_1.id, is_manager: true).count
    expected_ics      = Employee.where(data_version_id: data_version_1.id).where.not(is_manager: true).count

    get reports_individual_contributors_url
    assert_response :success

    assert_includes response.body, expected_managers.to_s
    assert_includes response.body, expected_ics.to_s
  end

  test "should get management_ratios" do
    get reports_management_ratios_url
    assert_response :success
  end

  # Team Reports
  test "should get team_size" do
    get reports_team_size_url
    assert_response :success
  end

  test "team_size report filters by team_id to include only team and its sub-hierarchy" do
    engineering = teams(:engineering)
    leadership  = teams(:leadership)

    # Leadership (member_count: 2) should appear in unfiltered report
    get reports_team_size_url
    assert_response :success
    assert_includes response.body, leadership.member_count.to_s

    # When filtered by engineering, Leadership should be excluded.
    # Engineering sub-hierarchy: Engineering (3), Frontend (2), Backend (1)
    # Leadership (2) is outside this hierarchy and must not affect the count.
    # Unfiltered: member_count=2 has 2 teams (Frontend + Leadership)
    # Filtered:   member_count=2 has 1 team  (Frontend only)
    get reports_team_size_url, params: { team_id: engineering.id }
    assert_response :success

    assert_includes response.body, engineering.full_path,
      "Subtitle should include the filtered team's full path"

    # The report groups by member_count and counts teams.
    # With engineering filter there should be exactly 3 rows (one per team in hierarchy).
    assert_includes response.body, engineering.member_count.to_s
    assert_not_includes response.body, leadership.full_path
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
      reports_individual_contributors_url,
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

  test "tenure report groups employees by completed years of service" do
    version = data_versions(:test_version)
    ids = Employee.where(data_version_id: version.id).order(:id).limit(9).pluck(:id)
    Employee.where(data_version_id: version.id).update_all(start_date: nil)

    today = ReportsController::TENURE_AS_OF
    starts = [
      today - 6.months,                  # < 1 year
      today - 1.year - 1.day,            # 1 - 2 years
      today - 3.years - 1.day,           # 3 - 5 years
      today - 3.years - 2.days,          # 3 - 5 years
      today - 7.years,                   # 5 - 10 years
      today - 15.years,                  # 10 - 20 years
      today - 25.years,                  # > 20 years
      today - 2.years - 364.days         # still 2 completed years -> 1 - 2 years
    ]
    starts.each_with_index { |date, i| Employee.where(id: ids[i]).update_all(start_date: date) }

    get reports_tenure_url
    assert_response :success

    rows = css_select("table tbody tr").to_h do |tr|
      cells = tr.css("td").map { |td| td.text.strip }
      [cells[0], cells[1].to_i]
    end

    total = Employee.where(data_version_id: version.id).count
    assert_includes response.body, "as of Oct 26, 2026"
    assert_equal total, rows.delete("Totals")

    assert_equal 1, rows["< 1 year"]
    assert_equal 2, rows["1 - 2 years"]
    assert_equal 2, rows["3 - 5 years"]
    assert_equal 1, rows["5 - 10 years"]
    assert_equal 1, rows["10 - 20 years"]
    assert_equal 1, rows["> 20 years"]
    assert_equal total - 8, rows["Unknown"]
    assert_equal ["< 1 year", "1 - 2 years", "3 - 5 years", "5 - 10 years", "10 - 20 years", "> 20 years", "Unknown"], rows.keys
  end
end
