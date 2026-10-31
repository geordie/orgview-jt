require "test_helper"

# MySQL's utf8mb4_0900_ai_ci collation made text comparisons case-insensitive.
# SQLite keeps that behaviour through COLLATE NOCASE on text columns.
class CollationTest < ActiveSupport::TestCase
  setup do
    @version = data_versions(:test_version)
    Employee.create!(person_id: "C1", title: "Collation Engineer", job_code: "J1", seniority: 1, data_version: @version)
    Employee.create!(person_id: "C2", title: "collation engineer", job_code: "J1", seniority: 1, data_version: @version)
  end

  test "equality ignores case" do
    assert_equal 2, Employee.where(title: "COLLATION ENGINEER").count
  end

  test "grouping ignores case" do
    counts = Employee.where("title LIKE ?", "collation%").group(:title).count
    assert_equal [2], counts.values
  end

  test "person ids match managers regardless of case" do
    Employee.create!(person_id: "C3", title: "Report", job_code: "J1", seniority: 1, manager_id: "c1", data_version: @version)
    assert_equal ["C3"], Employee.find_by(person_id: "C1").direct_reports.pluck(:person_id)
  end
end
