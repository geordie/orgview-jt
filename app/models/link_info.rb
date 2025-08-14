class LinkInfo
  attr_accessor :controller, :action, :link_params

  def initialize(controller:, action:, link_params:)
    @controller = controller
    @action = action
    @link_params = link_params # Array of LinkParams
  end
end
