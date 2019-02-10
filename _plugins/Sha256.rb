require 'digest'

module Jekyll
    module Sha256Filter
        def sha256(input)
            Digest::SHA256.base64digest input
        end
    end
end

Liquid::Template.register_filter(Jekyll::Sha256Filter)