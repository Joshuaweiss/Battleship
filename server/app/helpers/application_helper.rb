module ApplicationHelper

  def webpack_entry(type)
    WEBPACK_MANIFEST[type.to_s].to_a.map do |ext, path|
      case ext
      when "js"
        javascript_include_tag path
      when "css"
        stylesheet_link_tag path
      else
        fail "trying to use asset with file extension '.#{ext}'"
      end
    end.join("").html_safe
  end

end
