require 'shellwords'
require 'flickraw-cached'
require 'json'

auth = JSON.parse(File.read('../flickr_auth/auth.json'))

FlickRaw.api_key = auth['api_key']
FlickRaw.shared_secret = auth['api_secret']
$flickr = FlickRaw::Flickr.new
$flickr.access_token = auth['oauth_token']
$flickr.access_secret = auth['oauth_secret']

module Jekyll
  class FlickrPhoto < Liquid::Tag
    include Filters

    def initialize(tag_name, photo_data, tokens)
      super
      params = Shellwords.shellwords photo_data
      @photo_id = params[0].strip()
    end
    
    def render(context)
      info = $flickr.photos.getInfo(:photo_id => @photo_id)
      dims = $flickr.photos.getSizes(:photo_id => @photo_id).select { |s|
        s.label == 'Original'
      }.pop

      vertical = dims.height > dims.width

      caption = "
#{xml_escape(info.title)}<br />
<a href=\\\"#{FlickRaw.url_photopage(info)}\\\" rel=\\\"external\\\" target=\\\"_blank\\\">View on Flickr.</a>
      ".strip()

      # Seems fucky, but works
      Liquid::Template.parse("{% include lightbox.html 
        id=\"#{@photo_id}\"
        img_lg=\"#{FlickRaw.url_b(info)}\"
        img_sm=\"#{FlickRaw.url(info)}\"
        title=\"#{xml_escape(info.title)}\"
        caption=\"#{caption}\"
        center=#{vertical}
      %}").render(context)
    end
  end
end

Liquid::Template.register_tag('flickr_photo', Jekyll::FlickrPhoto)
