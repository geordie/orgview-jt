class TableColumn
  attr_accessor :label, :values, :link_info, :type, :visible

  def initialize(label:, values:, type: "numeric", visible: true, link_info: nil)
    @label = label
    @values = values
    @type = type
    @link_info = link_info
    @visible = visible
  end


  def display(index)
    if index.nil? || index > @values.length - 1
      return "invalid index"
    end

    if @type == "percentage"
      return @values[index].round(1).to_s + "%"
    end

    return @values[index]
  end


  def summarize
    if @type == "numeric"
      return @values.sum
    end

    if @type == "percentage"
      return @values.sum.round(0).to_s + "%"
    end

    return ""
  end
end
