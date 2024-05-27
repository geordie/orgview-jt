require "test_helper"

class ReportsControllerTest < ActionDispatch::IntegrationTest
  test "should get roles" do
    get reports_roles_url
    assert_response :success
  end

  test "should get seniority" do
    get reports_seniority_url
    assert_response :success
  end
end
