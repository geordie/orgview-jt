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
      # If the link parameter has a static value, use it
      if link_param.value
        params[link_param.name] = link_param.value
        next
      end

      # If the link parameter has a default value, use it
      if link_param.default_value
        params[link_param.name] = link_param.default_value
        next
      end

      # If the link parameter has a value column, find it
      lookup_column = self.columns.find{ |col| col.label == link_param.value_col }
      next if lookup_column.nil?

      # Find the value in the lookup column for the current row index
      cell_value = lookup_column.values[row_index]

      # If there's a lookup hash, use it to map the value
      if link_param.lookup && link_param.lookup[cell_value]
        mapped_value = link_param.lookup[cell_value]
        params[link_param.name] = mapped_value
        Rails.logger.debug "DEBUG URL generation: Mapped '#{cell_value}' to '#{mapped_value}' for param '#{link_param.name}'"
      else
        # Otherwise use the cell value directly
        params[link_param.name] = cell_value
        Rails.logger.debug "DEBUG URL generation: Using direct value '#{cell_value}' for param '#{link_param.name}'"
      end
    end

    # Only return result if we have valid params
    if params.empty? || params.values.any?(&:nil?)
      Rails.logger.debug "DEBUG URL generation: Invalid params, returning nil: #{params.inspect}"
      return nil
    end

    result = { controller: info.controller, action: info.action, params: params }
    Rails.logger.debug "DEBUG URL generation: Final result: #{result.inspect}"
    return result
  end

  def visible_columns
    @columns.select { |column| column.visible }
  end

  def max_items_count
    @columns.map { |column| column.values.size }.max || 0
  end
end
