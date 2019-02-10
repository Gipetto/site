module Jekyll
    class Page
        def destination(dest)
            path = site.in_dest_dir(dest, URL.unescape_path(url))
            path = File.join(path, "index") if url.end_with?("/")
            #path << output_ext unless path.end_with? output_ext
            path << output_ext if !(path.end_with?(output_ext) || data['title'] == '.htaccess')
            path
        end
    end
end