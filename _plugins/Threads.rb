module Threads 
    DATA_KEY = 'threads'
end

Jekyll::Hooks.register :site, :post_read do | site |
    include Jekyll::Filters
    
    for post in site.posts.docs do
        post.data[Threads::DATA_KEY].map { | thread |
            thread_slug = "thread-#{slugify(thread)}"

            if !site.data.has_key?(thread_slug)
                site.data[thread_slug] = []
            end

            site.data[thread_slug] << Hash[
                "title", post.data['title'],
                "url", post.url,
                "date", post.date
            ]
        }
    end
end

Jekyll::Hooks.register :posts, :pre_render do | post |
    if !post.data[Threads::DATA_KEY].empty?
        threads = []
        post.data[Threads::DATA_KEY].each { | thread |
            threads << "'#{thread}'"
        }
        threads = threads.join(' ')

        post.content += "\n{% post_thread #{threads} %}"
    end
end

module Threads
    class PostThreadRenderer < Liquid::Tag
        include Jekyll::Filters

        def initialize(tag_name, input, tokens)
            params = Shellwords.shellwords input
            @threads = params.map(&:chomp)
            super
        end

        def render(context)
            thread_word = @threads.length > 1 ? 'threads' : 'thread'
            thread_links = array_to_sentence_string(@threads.map { | thread | 
                "<a href=\\\"/thread/#{slugify(thread)}\\\">#{thread}</a>"
            })

            Liquid::Template.parse("{%- include post-thread.html 
                thread_word=\"#{thread_word}\" 
                threads=\"#{thread_links}\"
            -%}").render(context)
        end
    end
end

Liquid::Template.register_tag('post_thread', Threads::PostThreadRenderer)