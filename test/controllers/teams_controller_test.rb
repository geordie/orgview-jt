require "test_helper"

class TeamsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @engineering = teams(:engineering)   # id: 1, depth: 1, parent: nil
    @frontend    = teams(:frontend)      # id: 2, depth: 2, parent: engineering
    @backend     = teams(:backend)       # id: 3, depth: 2, parent: engineering
    @leadership  = teams(:leadership)    # id: 4, depth: 1, parent: nil
  end

  # --- move action ---

  test "should move team to a new parent" do
    patch move_team_url(@backend), params: { parent_id: @leadership.id }, as: :json

    assert_response :success
    data = JSON.parse(response.body)
    assert data.key?("redirect_url")

    @backend.reload
    assert_equal @leadership.id, @backend.parent_id
    assert_equal 2, @backend.depth
    assert_equal "#{@leadership.full_path} > #{@backend.name}", @backend.full_path
  end

  test "should move team to root (no parent)" do
    patch move_team_url(@frontend), params: {}, as: :json

    assert_response :success

    @frontend.reload
    assert_nil @frontend.parent_id
    assert_equal 1, @frontend.depth
    assert_equal @frontend.name, @frontend.full_path
  end

  test "should not move team to its own descendant" do
    patch move_team_url(@engineering), params: { parent_id: @frontend.id }, as: :json

    assert_response :unprocessable_entity
    data = JSON.parse(response.body)
    assert_match /descendant/, data["error"]
  end

  test "should not move team to itself" do
    patch move_team_url(@engineering), params: { parent_id: @engineering.id }, as: :json

    assert_response :unprocessable_entity
  end

  # --- move_candidates action ---

  test "should return move candidates excluding self and descendants" do
    get move_candidates_url(@engineering), as: :json

    assert_response :success
    ids = JSON.parse(response.body).map { |t| t["id"] }

    assert_not_includes ids, @engineering.id
    assert_not_includes ids, @frontend.id
    assert_not_includes ids, @backend.id
    assert_includes ids, @leadership.id
  end

  test "move candidates returns teams ordered by full_path" do
    get move_candidates_url(@backend), as: :json

    assert_response :success
    results = JSON.parse(response.body)
    full_paths = results.map { |t| t["full_path"] }
    assert_equal full_paths.sort, full_paths
  end

  # --- descendants full_path update ---

  test "moving a parent team updates descendants full_path" do
    # Engineering has Frontend and Backend as children.
    # Move Engineering under Leadership.
    patch move_team_url(@engineering), params: { parent_id: @leadership.id }, as: :json

    assert_response :success

    @engineering.reload
    @frontend.reload
    @backend.reload

    assert_equal "#{@leadership.full_path} > Engineering", @engineering.full_path
    assert_equal "#{@leadership.full_path} > Engineering > Frontend", @frontend.full_path
    assert_equal "#{@leadership.full_path} > Engineering > Backend",  @backend.full_path
    assert_equal 3, @frontend.depth
    assert_equal 3, @backend.depth
  end

  # --- team_members action ---

  test "team members renders as HTML" do
    get team_members_url(@engineering)

    assert_response :success
    assert_select "table tbody tr", 2
    assert_select "a[href=?]", employee_path(employees(:cto))
  end

  test "team members renders as JSON" do
    get team_members_url(@engineering, format: :json)

    assert_response :success
    data = JSON.parse(response.body)
    assert_equal [2, 4], data.map { |m| m["employee_id"] }.sort
    assert data.all? { |m| m.key?("employee") }
  end

  # --- sub_teams action ---

  test "sub teams renders as HTML" do
    get sub_teams_url(@engineering)

    assert_response :success
    assert_select "table tbody tr", 2
    assert_select "a[href=?]", team_path(@frontend)
    assert_select "a[href=?]", team_path(@backend)
  end

  test "sub teams renders as JSON" do
    get sub_teams_url(@engineering, format: :json)

    assert_response :success
    data = JSON.parse(response.body)
    assert_equal [@frontend.id, @backend.id].sort, data.map { |t| t["sub_team"]["id"] }.sort
  end
end
