class SquadsController < ApplicationController
	include CbaSquadGenerator
	before_action :set_squad, only: [:show, :edit, :update, :destroy]

	# GET /squads or /squads.json
	def index
		@squads = Squad.order(:full_path).paginate(page: params[:page], per_page: 20)
	end

	# GET /squads/1 or /squads/1.json
	def show
	end

	# GET /squads/new
	def new
		@squad = Squad.new
	end

	# GET /squads/1/edit
	def edit
	end

	# POST /squads or /squads.json
	def create
		@squad = Squad.new(squad_params)

		respond_to do |format|
			if @squad.save
				format.html { redirect_to squad_url(@squad), notice: "Squad was successfully created." }
				format.json { render :show, status: :created, location: @squad }
			else
				format.html { render :new, status: :unprocessable_entity }
				format.json { render json: @squad.errors, status: :unprocessable_entity }
			end
		end
	end

	# PATCH/PUT /squads/1 or /squads/1.json
	def update
		respond_to do |format|
			if @squad.update(squad_params)
				format.html { redirect_to squad_url(@squad), notice: "Squad was successfully updated." }
				format.json { render :show, status: :ok, location: @squad }
			else
				format.html { render :edit, status: :unprocessable_entity }
				format.json { render json: @squad.errors, status: :unprocessable_entity }
			end
		end
	end

	# DELETE /squads/1 or /squads/1.json
	def destroy
		@squad.destroy
		respond_to do |format|
		format.html { redirect_to squads_url, notice: "Squad was successfully destroyed." }
		format.json { head :no_content }
		end
	end

	def treeview
		@squads = Squad.where("parent_id IS NULL")
	end

	def sub_teams
		squad = Squad.find(params[:id])
		sub_teams = Squad.where(parent_id: squad.id)
		@sub_teams = sub_teams.map { |sub_team| build_hierarchy(sub_team, false) }

		respond_to do |format|
			format.html { render partial: 'structure', locals: { sub_teams: @sub_teams } }
			format.json { render json: @sub_teams }
		end
  	end

  private

	# Use callbacks to share common setup or constraints between actions.
	def set_squad
		@squad = Squad.find(params[:id])
	end

	def build_hierarchy(sub_team, recursive = true)
		sub_teams = []
		if recursive
			sub_teams = sub_team.sub_teams.map { |sub_team| build_hierarchy(sub_team, false) }
		end
		{
			sub_team: sub_team,
			sub_team_count: sub_team.sub_teams.count,
			sub_teams: sub_team.sub_teams
		}
	end

	# Only allow a list of trusted parameters through.
	def squad_params
		params.require(:squad).permit(:team_name, :team_parent_id, :full_path)
	end
end