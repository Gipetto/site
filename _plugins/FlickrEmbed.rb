require 'shellwords'
require 'flickraw-cached'
require 'json'

$cache = JSON.parse(File.read('.flickr-cache.json'))
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
    
    def marshalResponse(obj)
      obj.to_hash.map { |k, v| 

        # why does Flickraw mess with key names?
        _k = case k
        when '_content' then 'text'
        else k
        end

        _o = case v
        when Hash, FlickRaw::Response then marshalResponse(v)
        when Array, FlickRaw::ResponseList then v.collect { |i| marshalResponse(i) }
        else v
        end

        [_k, _o]
      }.to_h
    end

    def fetch(flickr_id)
      return {
        "info" => marshalResponse($flickr.photos.getInfo(:photo_id => flickr_id)),
        "sizes" => marshalResponse($flickr.photos.getSizes(:photo_id => flickr_id))['size'].map { |v| 
          [v['label'], v]
        }.to_h
      }
    end

    def getPhotoInfo(photo_id)
      if $cache.key?(photo_id)
        return $cache[photo_id]
      else 
        puts "ERROR => cache miss for Flickr Photo: #{photo_id}"
        return fetch(photo_id)
      end
    end

    # naive: all sizes based on max-width
    def getSizes(photo)
      wideVersions = [
        'Small',
        'Small 320',
        'Medium',
        'Medium 640',
        'Large',
        'Original'
      ]

      filtered = photo['sizes'].select { |k, v|
        wideVersions.include?(k)
      }.values.sort_by { |s| 
        s['width'].to_i
      }
      
      srcset = filtered.map { |v| 
        "#{v['source']} #{v['width']}w"
      }

      return srcset
    end

    def render(context)
      photo = getPhotoInfo(@photo_id)

      # Fall back to original size in case Large doesn't exist
      large_photo_url = if photo['sizes'].key?('Large') 
        photo['sizes']['Large']['source']
      else
        photo['sizes']['Original']['source']
      end

      flickr_url = photo['info']['urls']['url'][0]['text']
      vertical = photo['sizes']['Original']['height'] > photo['sizes']['Original']['width']
 
      caption = "
#{xml_escape(photo['info']['title'])}<br />
<a href=\\\"#{flickr_url}\\\" rel=\\\"external\\\" target=\\\"_blank\\\" rel=\\\"noopener\\\">View on Flickr.</a>
      ".strip()

      srcset = getSizes(photo)

      sizesSmall = [
        "(max-width: 320px) 320px",
        "(max-width: 640px) 640px",
        "(max-width: 870px) 1024px",
        "500px"
      ]

      sizesLarge = [
        "(max-width: 340px) 320px",
        "(max-width: 520px) 500px",
        "(max-width: 660px) 640px", 
        photo['sizes'].key?('Large') ? "(max-width: 1044px) 1024px" : "1024", 
        photo['sizes'].key('Large') ? "1650px" : ""
      ].reject!(&:empty?)

      # Seems fucky, but works
      Liquid::Template.parse("{% include lightbox.html 
        id=\"#{@photo_id}\"
        img_lg=\"#{large_photo_url}\"
        img_sm=\"#{photo['sizes']['Medium']['source']}\"
        title=\"#{xml_escape(photo['info']['title'])}\"
        caption=\"#{caption}\"
        center=#{vertical}
        srcset=\"#{srcset.join(', ')}\"
        sizesSmall=\"#{sizesSmall.join(', ')}\"
        sizesLarge=\"#{sizesLarge.join(', ')}\"
      %}").render(context)
    end
  end
end

Liquid::Template.register_tag('flickr_photo', Jekyll::FlickrPhoto)
