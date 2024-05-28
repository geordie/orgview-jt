module PaginationHelper
  def will_paginate_with_bootstrap(objects, options = {})
    will_paginate(objects, options.merge({
      renderer: BootstrapPaginationRenderer,
      class: 'pagination justify-content-center',
      inner_window: 2,
      outer_window: 0,
      previous_label: '&laquo;',
      next_label: '&raquo;'
    }))
  end
end