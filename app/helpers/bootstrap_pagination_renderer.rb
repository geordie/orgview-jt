class BootstrapPaginationRenderer < WillPaginate::ActionView::LinkRenderer
  def container_attributes
    super.except('class').merge({class: 'pagination'})
  end

  def html_container(html)
    tag(:ul, html, container_attributes)
  end

  def page_number(page)
    tag :li, link(page, page, rel: rel_value(page), class: 'page-link'), class: ['page-item', ('active' if page == current_page)].join(' ')
  end

  def gap
    tag :li, link(super, '#', class: 'page-link'), class: 'disabled page-item'
  end

  def previous_or_next_page(page, text)
    tag :li, link(text, page || '#', class: 'page-link'), class: ['page-item', ('disabled' unless page)].join(' ')
  end

  def previous_page
    num = @collection.current_page > 1 && @collection.current_page - 1
    previous_or_next_page(num, '&laquo;')
  end

  def next_page
    num = @collection.current_page < total_pages && @collection.current_page + 1
    previous_or_next_page(num, '&raquo;')
  end

  protected

  def link(text, target, attributes = {})
    if target.is_a? Integer
      attributes[:rel] = rel_value(target)
      target = url(target)
    end

    unless target == '#'
      attributes[:href] = target
    end

    attributes[:class] = 'page-link' # Add the page-link class

    tag(:a, text, attributes)
  end
end