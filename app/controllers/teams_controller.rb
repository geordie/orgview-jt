class TeamsController < ApplicationController
  include TeamGenerator
  before_action :set_team, only: [:show, :edit, :update, :destroy, :move, :move_candidates]

  def index
    current_version = DataVersion.active.first
    return redirect_to root_path, alert: 'No active data version found.' unless current_version

    sort_col = index_sortable_columns.include?(params[:sort]) ? params[:sort] : 'name'
    sort_dir = params[:direction] || 'asc'

    @teams = Team
      .where(data_version_id: current_version.id)
      .then { |q| params[:depth].present?     ? q.where(depth: params[:depth])           : q }
      .then { |q| params[:parent_id].present? ? q.where(parent_id: params[:parent_id])   : q }
      .then { |q| params[:search].present?    ? q.where('name LIKE ?', "%#{params[:search]}%") : q }
      .order("#{sort_col} #{sort_dir}")
      .paginate(page: params[:page], per_page: 20)
  end

  def show
    current_version = DataVersion.active.first
    return redirect_to root_path, alert: 'No active data version found.' unless current_version

    sort_col  = sortable_columns.include?(params[:sort]) ? params[:sort] : 'employees.person_id'
    sort_dir  = params[:direction] || 'asc'

    @team_members = @team.teams_employees
      .where(data_version_id: current_version.id)
      .includes(:employee)
      .order(Arel.sql("#{sort_col} #{sort_dir}"))

    @sub_teams = Team.where(parent_id: @team.id, data_version_id: current_version.id)
      .order('org_member_count desc')
  end

  def new
    @team = Team.new
  end

  def edit
  end

  def create
    current_version = DataVersion.active.first
    return redirect_to root_path, alert: 'No active data version found.' unless current_version

    @team = Team.new(team_params)
    @team.data_version = current_version

    respond_to do |format|
      if @team.save
        format.html { redirect_to team_url(@team), notice: 'Team was successfully created.' }
        format.json { render :show, status: :created, location: @team }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @team.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @team.update(team_params)
        format.html { redirect_to team_url(@team), notice: 'Team was successfully updated.' }
        format.json { render json: @team, status: :ok }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @team.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @team.destroy
    respond_to do |format|
      format.html { redirect_to teams_url, notice: 'Team was successfully deleted.' }
      format.json { head :no_content }
    end
  end

  def treeview
    current_version = DataVersion.active.first
    return redirect_to root_path, alert: 'No active data version found.' unless current_version

    @teams = Team.where(parent_id: nil, data_version_id: current_version.id)
  end

  def sub_teams
    current_version = DataVersion.active.first
    return redirect_to root_path, alert: 'No active data version found.' unless current_version

    team     = Team.where(data_version_id: current_version.id).find(params[:id])
    sub_teams = Team.where(parent_id: team.id, data_version_id: current_version.id)
    @sub_teams = sub_teams.map { |st| build_team_hierarchy(st) }

    respond_to do |format|
      format.html { render partial: 'structure', locals: { sub_teams: @sub_teams } }
      format.json { render json: @sub_teams }
    end
  end

  def team_members
    current_version = DataVersion.active.first
    return redirect_to root_path, alert: 'No active data version found.' unless current_version

    team          = Team.where(data_version_id: current_version.id).find(params[:id])
    @team_members = team.teams_employees.where(data_version_id: current_version.id).includes(:employee)

    respond_to do |format|
      format.html { render partial: 'members', locals: { team_members: @team_members } }
      format.json { render json: @team_members.to_json(include: :employee) }
    end
  end

  def move_candidates
    current_version = DataVersion.active.first
    excluded = [@team.id] + descendant_ids(@team)
    candidates = Team.where(data_version_id: current_version.id)
      .where.not(id: excluded)
      .order(:full_path)
    render json: candidates.map { |t| { id: t.id, name: t.pretty_name.presence || t.name, full_path: t.full_path, depth: t.depth } }
  end

  def move
    current_version = DataVersion.active.first
    new_parent_id   = params[:parent_id].presence

    if new_parent_id
      new_parent = Team.where(data_version_id: current_version.id).find(new_parent_id)
      if descendant_ids(@team).include?(new_parent.id) || new_parent.id == @team.id
        render json: { error: 'Cannot move a team to itself or its own descendant' }, status: :unprocessable_entity
        return
      end
      new_depth     = new_parent.depth + 1
      new_full_path = "#{new_parent.full_path} > #{@team.name}"
    else
      new_depth     = 1
      new_full_path = @team.name
    end

    old_full_path = @team.full_path
    depth_delta   = new_depth - @team.depth

    Team.where(data_version_id: current_version.id)
        .where("full_path LIKE ?", "#{Team.sanitize_sql_like(old_full_path)} > %")
        .update_all([
          "full_path = REPLACE(full_path, ?, ?), depth = depth + ?",
          "#{old_full_path} >", "#{new_full_path} >", depth_delta
        ])

    @team.assign_attributes(parent_id: new_parent_id, full_path: new_full_path, depth: new_depth)

    if @team.save
      build_teams_stats(current_version)
      render json: { redirect_url: team_url(@team) }
    else
      render json: { error: @team.errors.full_messages.join(', ') }, status: :unprocessable_entity
    end
  end

  private

  def set_team
    current_version = DataVersion.active.first
    return redirect_to root_path, alert: 'No active data version found.' unless current_version

    @team = Team.where(data_version_id: current_version.id).find(params[:id])
  end

  def descendant_ids(team)
    ids, queue = [], [team.id]
    until queue.empty?
      batch = Team.where(parent_id: queue, data_version_id: team.data_version_id).pluck(:id)
      ids.concat(batch)
      queue = batch
    end
    ids
  end

  def build_team_hierarchy(team)
    {
      sub_team:       team,
      sub_team_count: team.sub_teams.count,
      sub_teams:      team.sub_teams
    }
  end

  def team_params
    params.require(:team).permit(:name, :full_path, :parent_id, :depth, :pretty_name)
  end

  def sortable_columns
    %w[employees.person_id employees.title employees.job_code employees.seniority
       employees.manager_id employees.country]
  end

  def index_sortable_columns
    %w[name member_count manager_count children descendents org_member_count team_health]
  end
end
