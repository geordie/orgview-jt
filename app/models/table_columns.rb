class TableColumns
  attr_accessor :columns

  def initialize
    @columns = []
  end

  def add_column_object(column)
    @columns << column
  end

  def add_column(label:, values:, type: "numeric", visible: true, link_info: nil)
    column = TableColumn.new(label: label, values: values,
      type: type, visible: visible, link_info: link_info)
    @columns << column
  end

  def get_cell_links(column_key, row_index)

    # Find the column by its label
    column = self.columns.find { |col| col.label == column_key }
    if column.nil?
      return nil
    end

    # Check if the column has link information
    info = column.link_info
    if info.nil?
      return nil
    end

    # Create the link parameters
    params = {}
    info.link_params.each do |link_param|
      # If the link parameter has a default value, use it
      if link_param.default_value
        params[link_param.name] = link_param.default_value
        next
      end

      # If the link parameter has a value column, find it
      lookup_column = self.columns.find{ |col| col.label == link_param.value_col }
      next if lookup_column.nil?

      # Find the value in the lookup column for the current row index
      # and assign it to the link parameter
      # This assumes that the lookup column has the same number of rows as the current column
      # and that the row_index is valid for both columns
      params[link_param.name] = lookup_column.values[row_index]
    end
    return { controller: info.controller, action: info.action, params: params }
  end

  def visible_columns
    @columns.select { |column| column.visible }
  end

  def max_items_count
    @columns.map { |column| column.values.size }.max || 0
  end
end
