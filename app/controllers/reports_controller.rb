class ReportsController < ApplicationController
  def roles
    employee_titles = Employee.all.group(:title).count.sort_by { |k, v| v }.reverse.to_h
    @titles = employee_titles.keys
    @counts = employee_titles.values

    # sum the counts
    sum = 0
    employee_titles.each do |title, count|
      sum += count
    end

    # build an array of percentages
    @percentages = []
    employee_titles.each do |title, count|
      @percentages << (count.to_f / sum * 100).round(2)
    end

  end

  def seniority
  end
end
