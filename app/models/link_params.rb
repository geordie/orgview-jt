class LinkParams
  attr_accessor :name, :value_col, :default_value
  def initialize(name:, value_col:, default_value: nil)
    @name = name
    @value_col = value_col
    @default_value = default_value
  end
end
