class ReportsController < ApplicationController
  def roles
    roles = Role.all
    gon.labels = roles.map(&:role)
    gon.data = roles.map { |role| Employee.where('title = ?', role.role ).count }
  end

  def seniority
  end
end
