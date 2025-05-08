const fluffyBunnies = () => {
  const cachebuster = document.querySelector('meta[name="cachebuster"]')?.getAttribute("content")
  var queryParams = new URLSearchParams(window.location.search);

  // Search & Filter Blog Archives
  var searchInput = document.querySelector('.search input[name="q"]');
  if (searchInput) {
    class Search {
      queryParams = undefined
      searchTerm = undefined

      fuse = undefined
      searchDebounceTimer = null
      searchDebounceTimeout = 500
      searchMaxResults = 20

      posts = undefined
      filters = undefined

      noResults = undefined

      constructor(searchInput) {
        this.searchInput = searchInput

        this.posts = Array.from(document.querySelectorAll(
          ".archives-list .posts li:not(.no-results)"
        ))
        
        this.filters = document.querySelectorAll(
          '.archives-list .categories input[type="checkbox"]'
        )

        this.noResults = document.querySelector(
          ".archives-list .posts li.no-results"
        )

        this.attachListeners()
        
        this.queryParams = new URLSearchParams(window.location.search);
        if (this.queryParams.has("q")) {
          this.searchTerm = this.queryParams.get("q")
          this.run()
        }
      }

      async initFuse() {
        if (this.fuse) {
          return
        }
        
        this.fuse = await fetch(`/search.json?c=${cachebuster}`)
          .then((r) => r.json())
          .then((json) => {
            return new Fuse(json, {
              threshold: 0.2,
              ignoreFieldNorm: true,
              ignoreLocation: true,
              includeScore: true,
              findAllMatches: true,
              includeMatches: true,
              keys: [
                {
                  name: 'title',
                  weight: 0.6
                },
                {
                  name: 'tags',
                  weight: 0.2
                },
                {
                  name: 'categories',
                  weight: 0.2
                },
                {
                  name: 'tokens',
                  weight: 0.5
                },
              ]
            })
          })
      }

      attachListeners() {
        this.searchInput.addEventListener("keyup", (e) => {
          this.searchTerm = e.target.value
          this.queryParams.set("q", this.searchTerm)
          window.history.pushState("", "", `/blog/?${this.queryParams.toString()}`)
          this.run()
        })

        this.filters.forEach((filter) => {
          filter.addEventListener("change", () => this.run())
        })
      }

      async run() {
        const activeSearchPosts = await this.search()
        const activeFilterPosts = this.filter()

        let activePosts = []

        if (activeSearchPosts.length && activeFilterPosts.length) {
          activePosts = activeSearchPosts.filter((item) => {
            return activeFilterPosts.includes(item)
          })
        }

        this.posts.forEach((post) => {
          post.hidden = !activePosts.includes(post.dataset.slug)
        })

        this.noResults.hidden = !!activePosts.length
      }

      async search() {
        if (!this.fuse) {
          await this.initFuse()
        }

        let activePosts = undefined
        clearTimeout(this.searchDebounceTimer)

        if (this.searchTerm) {          
          // await Promise.resolve(this.searchDebounceTimer = setTimeout(() => {
            activePosts = this.fuse.search(this.searchTerm, { limit: this.searchMaxResults })
              .map((result) => result.item.slug)
          // }, this.searchDebounceTimeout))
        } else {
          activePosts = this.posts.map((post) => post.dataset.slug)
        }

        return activePosts ?? []
      }

      filter() {
        const activeFilters = this.getActiveFilters()

        const activePosts = this.posts.reduce((acc, post) => {
          if (activeFilters.length) {
            const postCats = post.dataset.categories
            activeFilters.forEach((filter) => {
              if (postCats.includes(filter)) {
                acc.push(post.dataset.slug)
              }
            })
          } else {
            acc.push(post.dataset.slug)
          }
          return acc
        }, [])

        return activePosts
      }

      getActiveFilters() {
        return [].slice.call(this.filters)
          .filter((item) => item.checked)
          .map((item) => item.value)
      }
    }

    const search = new Search(searchInput)
    search.run()
  }

  // Trusted Types
  // Needed to generate safe strings for "innerHtml" setting
  if (typeof trustedTypes == "undefined")
    trustedTypes = { createPolicy: (n, rules) => rules };
      
  const lbPolicy = trustedTypes.createPolicy("lightbox-html", {
    createHTML: (input) => input
  })

  // Lightbox
  const lightboxImages = document.querySelectorAll("a.lightbox")

  if (lightboxImages.length) {
    const dialog = document.querySelector("dialog.lightbox")
    const dialogImg = dialog.querySelector("img")

    const showLightbox = (anchor, e) => {
      dialogImg.src = anchor.dataset.lbImage
      dialogImg.width = anchor.dataset.lbImageWidth
      dialogImg.height = anchor.dataset.lbImageHeight

      dialog.showModal()
      e.stopPropagation()
      e.preventDefault()
    }

    const hideLIghtbox = (e) => {
      e.stopPropagation()
      e.preventDefault()
      // allow right click in modal
      if (e.button !== 2) {
        dialog.close()
      }
    }

    lightboxImages.forEach((anchor) => {
      anchor.onclick = (e) => showLightbox(anchor, e)
    })

    dialog.onmousedown = hideLIghtbox
  }
}

"loading"===document.readyState ?
  document.addEventListener("DOMContentLoaded", fluffyBunnies, false):
  fluffyBunnies()
