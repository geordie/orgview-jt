class DataVersionsController < ApplicationController
  before_action :set_data_version, only: [:show, :edit, :update, :activate, :archive, :destroy]

  def index
    @data_versions = DataVersion.recent.includes(:employees, :squads)
    @current_version = DataVersion.active.first
  end

  def show
    @employee_count = @data_version.employee_count
    @squad_count = @data_version.squad_count
    @role_count = @data_version.roles.count
    @squads_employees_count = @data_version.squads_employees.count
  end

  def new
    @data_version = DataVersion.new
  end

  def create
    @data_version = DataVersion.new(data_version_params)
    @data_version.snapshot_date = Time.current

    if @data_version.save
      redirect_to data_versions_path, notice: 'Data version was successfully created.'
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @data_version.update(data_version_params)
      redirect_to @data_version, notice: 'Data version was successfully updated.'
    else
      render :edit
    end
  end

  def activate
    @data_version.activate!
    redirect_to data_versions_path, notice: "#{@data_version.name} is now the active version."
  end

  def archive
    @data_version.archive!
    redirect_to data_versions_path, notice: "#{@data_version.name} has been archived."
  end

  def destroy
    if @data_version.is_active?
      redirect_to data_versions_path, alert: 'Cannot delete the active version.'
    else
      @data_version.destroy
      redirect_to data_versions_path, notice: 'Data version was successfully deleted.'
    end
  end

  private

  def set_data_version
    @data_version = DataVersion.find(params[:id])
  end

  def data_version_params
    params.require(:data_version).permit(:name, :description, :status, :snapshot_date)
  end
end
