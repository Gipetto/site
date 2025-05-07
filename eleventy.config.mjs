// import { eleventyImageTransformPlugin } from "@11ty/eleventy-img"
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import markdownIt from "markdown-it"
import markdownItFootnotes from "markdown-it-footnote"
import natural from "natural"
import { JSDOM } from "jsdom"

const stopWords = "a,able,about,across,after,all,almost,also,am,among,an,and,any,are,as,at,be,because,been,but,by,can,cannot,could,dear,did,do,does,either,else,ever,every,for,from,get,got,had,has,have,he,her,hers,him,his,how,however,i,if,in,into,is,it,its,just,least,let,like,likely,ll,may,me,might,most,must,my,neither,no,nor,not,of,off,often,on,only,or,other,our,own,rather,re,said,say,says,she,should,since,so,some,than,that,the,their,them,then,there,these,they,this,tis,to,too,twas,us,wants,was,we,were,what,when,where,which,while,who,whom,why,will,with,would,yet,you,your".split(",")

export default function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/js")
  eleventyConfig.addPassthroughCopy("src/assets")
  eleventyConfig.addPassthroughCopy("src/favicon.svg")
  eleventyConfig.addPassthroughCopy("src/robots.txt")
  eleventyConfig.addPassthroughCopy("src/humans.txt")
  eleventyConfig.addPassthroughCopy("src/htc/assets")
  eleventyConfig.addPassthroughCopy("src/htc/json")
  eleventyConfig.addPassthroughCopy("src/poocherino/js")
  eleventyConfig.addPassthroughCopy("src/poocherino/assets")
  eleventyConfig.addPassthroughCopy("src/avatar")
  eleventyConfig.addPassthroughCopy("src/.well-known")
  
  eleventyConfig.watchIgnores.add("src/scss/**/*.scss")
  eleventyConfig.watchIgnores.add("src/poocherino/**/*.scss")

	eleventyConfig.addPlugin(syntaxHighlight, {
    alwaysWrapLineHighlights: true,
  });

  eleventyConfig.setLibrary("md", markdownIt({
    html: true,
    linkify: true,
    typographer: true,
  }))
  eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(markdownItFootnotes))

  eleventyConfig.addCollection("posts", function (collectionApi) {
		return collectionApi.getFilteredByGlob("src/_posts/*.md").reverse()
	});

  eleventyConfig.addCollection("categories", function(collectionsApi) {
    const categoriesSet = new Set()

    collectionsApi.getAll().forEach((item) => {
      if (!item.data.categories || !Array.isArray(item.data.categories)) {
        return
      }

      item.data.categories.forEach((cat) => {
        categoriesSet.add(
          cat.toLowerCase().replace(/\b\w/g, s => s.toUpperCase())
        )
      })
    })

    return Array.from(categoriesSet).sort()
  })

  eleventyConfig.addCollection("sitemap", function(collectionsApi) {
    const pageSet = new Set()

    collectionsApi.getAll().forEach((item) => {
      if (
        item.url.includes("/script_src/") ||
        item.url.includes("/stuff/") ||
        item.url.includes("/dl/") ||
        item.url.includes("/sitemap.xml") ||
        item.url.includes("/search.json") ||
        item.url.includes(".htaccess") ||
        item.url.includes("robots.txt") ||
        item.url.includes("cheatsheets/")
      ) {
        return
      }
      pageSet.add(item)
    })

    return Array.from(pageSet)
  })

  eleventyConfig.addFilter("tokenize", (value) => {
    const dom = JSDOM.fragment(value)
    const text = dom.textContent

    const tokenizer = new natural.WordTokenizer()
    const set = new Set(tokenizer.tokenize(text ?? []))

    return [...set].filter((value) => {
      const token = value.toLowerCase()

      if (token.length < 2) {
        return false
      }
      if (stopWords.includes(token)) {
        return false
      }
      return true
    }).join(" ")
  })

  eleventyConfig.addFilter("excerpt", (value) => {
    const dom = JSDOM.fragment(value)
    const text = dom.textContent

    return text.substring(0, 1024)
      .replace(/(\s+)?(\n+)/mg, "\n")
      .trim()
  })

  eleventyConfig.setFrontMatterParsingOptions({
		excerpt: true,
		excerpt_separator: "<!-- excerpt -->",
	});
  
  eleventyConfig.setServerOptions({
    watch: [
      "_site/css/**/*.css",
      "_site/poocherino/**/*.css"
    ]
  })

  return {
    markdownTemplateEngine: "liquid",
    dir: {
      input: "src",
      layouts: "_layouts",
    }
  }
}
