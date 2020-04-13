module BooksHelper
  def propagate_events(controller, actions)
    actions.inject('') do |result, action|
      result << " #{action}->#{controller}##{action}"
    end.lstrip
  end
end
