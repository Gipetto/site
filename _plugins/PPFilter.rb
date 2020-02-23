module Jekyll
module PPFilter
    def pp(input)
    "<i class=\"pp\" aria-hidden=\"true\">§</i>#{input}"
    end
end
end

Liquid::Template.register_filter(Jekyll::PPFilter)