"use strict";

function fluffyBunnies() {
    const cachebuster = document.querySelector('meta[name="cachebuster"]')?.getAttribute('content');
    const cacheBust = function(url) {
        return url + '?v=' + cachebuster;
    }

    // Sigh... Google is the new IE.
    if (navigator.getEnvironmentIntegrity !== undefined) {
        fetch(cacheBust('/assets/google-web-environment-integrity-warning.html'))
            .then(r => { 
                return r.text(); 
            }).then(warning => {
                const fragment = document.createDocumentFragment(),
                    tmp = document.createElement("div")
                tmp.innerHTML = warning
                fragment.appendChild(tmp.firstChild)
                document.body.insertBefore(fragment, document.getElementById("bag-o-holding"))
            });
    }

    // Init
    var nav = document.querySelector('header')?.querySelector('nav');
    var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    var is4G = connection && connection.effectiveType == '4g' || true;
    var searchInput = document.querySelector('.search-box input');
    var queryParams = new URLSearchParams(window.location.search);

    var stopEvent = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };

    // Hamburger
    var hamburger = (function() {
        var xmlns = "http://www.w3.org/2000/svg";
        var linkns = "http://www.w3.org/1999/xlink";

        // Create the hamburger dynamically to ensure that text-only browsers never see it
        var hli = document.createElement("li");
        hli.classList.add("hamburger");
        hli.setAttribute("hidden", true);

        var ha = document.createElement("a");
        ha.setAttribute("href", "#");
        ha.setAttribute("aria-expanded", false);

        var hsvg = document.createElementNS(xmlns, "svg");
        hsvg.setAttribute("height", 32);
        hsvg.setAttribute("width", 32);

        var huse = document.createElementNS(xmlns, "use");
        huse.setAttributeNS(linkns, "xlink:href", "#menu-hamburger");

        hsvg.appendChild(huse);
        ha.appendChild(hsvg);
        hli.appendChild(ha);
        nav?.querySelector("ul").prepend(hli);

        var hamburgerToggle = nav?.querySelector('.hamburger a');
        return function(e) {
            stopEvent(e);
            nav.classList.toggle('hamburgled');
            hamburgerToggle
                .setAttribute('aria-expanded', nav.classList.contains('hamburgled') ? 'true' : 'false');
        }
    })();
    nav && document.querySelector('.hamburger').addEventListener('click', hamburger)

    // Search

    var typeAhead = function(posts) {
        var maxResults = 20;
        var typeAheadTimer = null;
        var resultItemTemplate = document.querySelector('.result-item-template .result-item');
        var resultNotFound = document.querySelector('.result-item-template .not-found');
        var resultsList = document.querySelector('.found-stuff');
        var fuseOptions = {
            ignoreLocation: true,
            keys: [{
                name: 'title',
                weight: 0.3
            },{
                name: 'tokens',
                weight: 0.2
            }, {
                name: 'tags',
                weight: 0.25
            }, {
                name: 'categories',
                weight: 0.25
            }]
        };
        var fuse = new Fuse(posts, fuseOptions);

        var buildResult = function(item) {
            var li = resultItemTemplate.cloneNode(true);
            var itemLink = li.querySelector('.result-title a');
            itemLink.setAttribute('href', item.url)
            itemLink.appendChild(document.createTextNode(item.title));
            li.querySelector('.result-blurb').appendChild(document.createTextNode(item.excerpt));
            li.querySelector('.date').appendChild(document.createTextNode(item.date));
            li.querySelector('.category').appendChild(document.createTextNode(item.categories.join(', ')));
            li.querySelector('.tags').appendChild(document.createTextNode(item.tags.join(', ')));
            return li;
        };

        return function() {
            var _this = this;
            clearTimeout(typeAheadTimer);
            
            typeAheadTimer = setTimeout(function() {
                var _value = _this.value;
                queryParams.set('q', _value);
                window.history.pushState("", "", "/search?" + queryParams.toString());

                while (resultsList.firstChild) {
                    resultsList.removeChild(resultsList.firstChild);
                }
                if (_value.length) {
                    var results = fuse.search(_this.value, {limit: maxResults});
                    if (results.length) {
                        results.forEach(function(item) {
                            resultsList.appendChild(buildResult(item["item"]));
                        });
                    } else {
                        resultsList.appendChild(resultNotFound);
                    }
                }
            }, 700);
        };
    };

    if (searchInput) {
        fetch(cacheBust('/js/search.json'))
            .then(r => { 
                return r.json(); 
            }).then(posts => {
                searchInput.addEventListener('keyup', typeAhead(posts));
                searchInput.focus();
        
                if (queryParams.has('q')) {
                    searchInput.value = queryParams.get('q');
                    searchInput.dispatchEvent(new KeyboardEvent('keyup', {'key': 'a'}));
                }        
            });
    }

    // Archive Filter

    var filterArchiveListItem = (checked_categories) => {
        return (item) => {
            var item_categories = item.getAttribute('data-categories');
            var is_active_category = checked_categories.reduce((accumulator, category) => {
                return accumulator ? accumulator : item_categories.includes(category)
            }, false)

            item.classList.toggle('hidden', !is_active_category);
        };
    };

    var filterArchiveList = (event) => {
        var checked_categories = [].slice.call(archiveFilters)
            .filter((item) => item.checked)
            .map((item) => item.value)

        if (!checked_categories.length) {
            archiveItems.forEach((item) => item.classList.remove('hidden'));
            archiveFilterClear.forEach((el) => el.classList.add('disabled'));    
        } else {
            archiveItems.forEach(filterArchiveListItem(checked_categories));
            archiveFilterClear.forEach((el) => el.classList.remove('disabled'));    
        }

        archiveSections.forEach((section) => {
            var is_empty = !section.querySelectorAll('.item:not(.hidden)').length
            section.classList.toggle('hidden', is_empty);
        });
    };

    var archiveFilters = document.querySelectorAll('.archives .archive-filter input[type="checkbox"]')
    var archiveSections = document.querySelectorAll('.archives section')
    var archiveItems = document.querySelectorAll('.archives .item')
    var archiveFilterClear = document.querySelectorAll('.archives a.clear')
    
    archiveFilters.forEach((element) => {
        element.addEventListener('change', filterArchiveList);
    });

    archiveFilterClear.forEach((el) => {
        el.addEventListener('click', (evt) => {
            stopEvent(evt);
            evt.target.classList.add('disabled');
            archiveFilters.forEach((el) => {
                if (el.checked) {
                    el.checked = false;
                    el.dispatchEvent(new Event('change'));    
                }
            });
        });
    })

    // Errors

    var errorDiv = document.querySelector('#bofh-reason');
    if (errorDiv) {
        fetch(cacheBust('/js/bofh.json')).then(r => {
            return r.json();
        }).then(reasons => {
            errorDiv.innerHTML = reasons[Math.floor(Math.random() * reasons.length)];                
        })
    }

    // Lightbox

    var doLightbox = (function(data) {
        var lightbox = document.querySelector('.lightbox');
        var lightboxImage = lightbox.querySelector('img');
        var lightboxCaption = lightbox.querySelector('figcaption');
        
        lightboxImage.addEventListener('load', function() {
            this.style.opacity = 1;
        });

        var mkCaption = function(str) {
            var caption = document.createElement('span');
            caption.innerHTML = str;
            caption.addEventListener('click', function(e) {
                e.stopPropagation();
            })
            return caption;
        };

        var populateLightbox = function(data) {
            lightbox.id = 'i' + data['id'] ? data['id'] : 'foo';
            lightboxImage.src = data['src'];

            lightboxImage.removeAttribute('width');
            if (data['width']) {
                lightboxImage.width = data['width'];
            }
            
            lightboxImage.removeAttribute('height');
            if (data['height']) {
                lightboxImage.height = data['height'];
            }
            
            lightboxCaption.appendChild(mkCaption(data['caption']));
        };

        lightbox.addEventListener('click', function(e) {
            stopEvent(e);
            lightboxImage.style.opacity = 0;
            
            while(lightboxCaption.hasChildNodes()) {
                lightboxCaption.removeChild(lightboxCaption.lastChild);
            }
            
            lightbox.classList.toggle('onstage');
        });

        return function(e) {
            stopEvent(e);
            var _img = this.querySelector('img')
            try {
                var data = JSON.parse(_img.dataset.lgImg);
            } catch(e) {
                var data = {
                    'src': _img.dataset.lgImg,
                    'caption': _img.alt
                };
            }
            populateLightbox(data);
            lightbox.classList.toggle('onstage');
        };         
    })();

    document.querySelectorAll('.thickbox:not(.meta)').forEach(function(element) {
        element.addEventListener('click', doLightbox);
    });

    window.addEventListener("keydown", (e) => {
        if (e.key == "Escape") {
            document.querySelectorAll(".onstage").forEach((i) => { 
                i.classList.toggle("onstage");
            });
        }
    })

    // Gallery

    var gal = document.querySelector('.gallery');
    if (gal) {
        var loader = gal.querySelector('.loader');
        var msnry = new Masonry(gal, {
            itemSelector: '.frame',
            columnWidth: '.frame',
            percentPosition: true,
            gutter: 3,
            initLayout: false,
            stagger: 30,
            transitionDuration: 0,
            stamp: '.stamp'
        });
    
        var thickboxen = document.querySelectorAll('.thickbox');
        var lazyLoad = function(i) {
            var thisun = thickboxen[i].querySelector('img');
            if (!thisun) {
                return
            }
        
            if (!thisun.dataset.primed && thisun.dataset.src) {
                thisun.addEventListener('load', function() {
                    var next = i + 2;
                    if (thickboxen[next] != undefined) {
                        lazyLoad(next);
                    }
                });
        
                thisun.src = is4G ? thisun.dataset.src : thisun.dataset.srcTiny;
                thisun.dataset.primed = true;
                thisun.style.visibility = 'visible';
        
                setTimeout(function() {
                    thisun.style.opacity = 1;
                    msnry.layout();
                }, 100);
            }
        };
        lazyLoad(0);
        lazyLoad(1);

        imagesLoaded(gal, function() {
            loader.style.opacity = 0;
        });
    }

    // Add class to code blocks that have overflow text
    document.querySelectorAll('div.highlight').forEach((el) => {
        var child = el.querySelector('.highlight');
        if (el.scrollWidth <= child.scrollWidth) {
            el.classList.add('highlight-overflow');
        }
    });
}

'loading' === document.readyState ? 
    document.addEventListener('DOMContentLoaded', fluffyBunnies, false) :
    fluffyBunnies();
