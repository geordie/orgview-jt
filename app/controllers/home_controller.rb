class HomeController < ApplicationController
  def index
    @data_versions = DataVersion.recent.limit(10)
    @current_version = DataVersion.active.first
  end
end
