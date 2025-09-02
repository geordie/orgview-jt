class LinkParams
  attr_accessor :name, :value_col, :default_value, :value, :lookup

  def initialize(name:, value_col: nil, default_value: nil, value: nil, lookup: nil)
    @name = name
    @value_col = value_col
    @default_value = default_value
    @value = value
    @lookup = lookup
  end
end
