module Threads 
    DATA_KEY = 'threads'
    CSS_MAPPINGS = {
        0 => "",
        5 => "xs",
        12 => "sm",
        30 => "md",
        90 => "lg",
        180 => "xl"
    }.reverse_each.to_h
end

Jekyll::Hooks.register :site, :post_read do | site |
    include Jekyll::Filters
    
    last_dates = {}

    for post in site.posts.docs do
        post.data[Threads::DATA_KEY].map { | thread |
            thread_slug = "thread-#{slugify(thread)}"

            if !site.data.has_key?(thread_slug)
                site.data[thread_slug] = []
            end

            days_diff = 0
            if last_dates[thread_slug] != nil
                a = Date.parse(post.date.to_s)
                b = Date.parse(last_dates[thread_slug].to_s)
                days_diff = a.mjd - b.mjd
            end

            last_dates[thread_slug] = post.date

            diff_class = Threads::CSS_MAPPINGS.inject("xxl") do |memo, (k, v)|
                if days_diff.to_i <= k.to_i
                    memo = v
                end
                memo
            end

            site.data[thread_slug] << Hash[
                "title", post.data['title'],
                "url", post.url,
                "date", post.date,
                "days_diff", days_diff,
                "diff_class", diff_class, 
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