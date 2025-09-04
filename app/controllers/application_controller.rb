class ApplicationController < ActionController::Base
  before_action :set_current_data_version

  private

  def set_current_data_version
    @current_data_version = DataVersion.active.first
    @all_data_versions = DataVersion.recent.limit(10)

    # If no active version exists, try to get the most recent one
    if @current_data_version.nil? && @all_data_versions.any?
      @current_data_version = @all_data_versions.first
    end
  end
end
