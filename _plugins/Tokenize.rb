module Jekyll
    module Tokenize
        include Jekyll::Filters

        @@stopwords = "a,able,about,across,after,all,almost,also,am,among,an,and,any,are,as,at,be,because,been,but,by,can,cannot,could,dear,did,do,does,either,else,ever,every,for,from,get,got,had,has,have,he,her,hers,him,his,how,however,i,if,in,into,is,it,its,just,least,let,like,likely,may,me,might,most,must,my,neither,no,nor,not,of,off,often,on,only,or,other,our,own,rather,said,say,says,she,should,since,so,some,than,that,the,their,them,then,there,these,they,this,tis,to,too,twas,us,wants,was,we,were,what,when,where,which,while,who,whom,why,will,with,would,yet,you,your"
            .split(",")

        def tokenize(input)
            tokens = Set.new()

            stripped = strip_html(input)
                .downcase.gsub(/[^a-z0-9\s]/i, '')

            stripped.scan(/\w+/) { |word|
                if !@@stopwords.include?(word) &&
                    word.length > 2

                    tokens.add(word)
                end
            }

            tokens.to_a.join(" ")
        end
    end
end

Liquid::Template.register_filter(Jekyll::Tokenize)