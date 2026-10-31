require "test_helper"

class TeamTest < ActiveSupport::TestCase
  test "path_within? matches whole path segments only" do
    assert Team.path_within?("Eng", "Eng")
    assert Team.path_within?("Eng > Platform", "Eng")
    assert_not Team.path_within?("Engineering", "Eng")
    assert_not Team.path_within?("Engineering > Frontend", "Eng")
  end

  test "in_subtree does not include teams whose name merely starts with the parent's" do
    eng = Team.create!(name: "Eng", full_path: "Eng", depth: 1, data_version_id: 1)
    Team.create!(name: "Platform", full_path: "Eng > Platform", depth: 2, parent: eng, data_version_id: 1)

    paths = Team.in_subtree("Eng").pluck(:full_path)

    assert_equal ["Eng", "Eng > Platform"], paths.sort
  end

  test "in_subtree treats LIKE wildcards in team names literally" do
    Team.create!(name: "R_D", full_path: "R_D", depth: 1, data_version_id: 1)
    Team.create!(name: "Labs", full_path: "R_D > Labs", depth: 2, data_version_id: 1)
    Team.create!(name: "RxD", full_path: "RxD", depth: 1, data_version_id: 1)
    Team.create!(name: "Ops", full_path: "RxD > Ops", depth: 2, data_version_id: 1)

    assert_equal ["R_D", "R_D > Labs"], Team.in_subtree("R_D").pluck(:full_path).sort
  end
end
