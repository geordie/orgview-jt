class ChartData
  attr_accessor :labels, :data, :percentages, :chart_id, :label_x_axis

  def initialize(labels:, data:, percentages:, chart_id:, label_x_axis: nil)
    @labels = labels
    @data = data
    @percentages = percentages
    @chart_id = chart_id
    @label_x_axis = label_x_axis
  end
end
