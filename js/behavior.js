"use strict";

function fluffyBunnies() {
    // Init

    var cachebuster = document.querySelector('meta[name="cachebuster"]').getAttribute('content');
    var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    var is4G = connection && connection.effectiveType == '4g' || true;
    var searchInput = document.querySelector('.search-box input');
    var queryParams = new URLSearchParams(window.location.search);

    var cacheBust = function(url) {
        return url + '?v=' + cachebuster;
    }

    // Hamburger

    var hamburger = (function() {
        var nav = document.querySelector('header').querySelector('nav');
        var hamburgerToggle = nav.querySelector('.hamburger a');
        return function(e) {
            e.preventDefault();
            nav.classList.toggle('hamburgled');
            hamburgerToggle
                .setAttribute('aria-expanded', nav.classList.contains('hamburgled') ? 'true' : 'false');
        }
    })();
    document.querySelector('.hamburger').addEventListener('click', hamburger);

    // Search

    var typeAhead = function(posts) {
        var maxResults = 10;
        var typeAheadTimer = null;
        var resultItemTemplate = document.querySelector('.result-item-template .result-item');
        var resultNotFound = document.querySelector('.result-item-template .not-found');
        var resultsList = document.querySelector('.found-stuff');
        var fuseOptions = {
            shouldSort: true,
            threshold: 0.5,
            matchAllTokens: true,
            location: 0,
            distance: 50,
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
                    var results = fuse.search(_this.value);
                    if (results.length) {
                        results.slice(0, maxResults).forEach(function(item) {
                            resultsList.appendChild(buildResult(item));
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

        lightboxImage.addEventListener('click', function(e) {
            e.preventDefault();
            lightboxImage.style.opacity = 0;
            while(lightboxCaption.hasChildNodes()) {
                lightboxCaption.removeChild(lightboxCaption.lastChild);
            }
            lightbox.classList.toggle('onstage');
        });

        return function(e) {
            e.preventDefault();
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

    document.querySelectorAll('.thickbox').forEach(function(element) {
        element.addEventListener('click', doLightbox);
    });

    // Gallery

    var gal = document.querySelector('.gallery');
    if (gal) {
        var loader = gal.querySelector('.loader');
        var msnry = new Masonry(gal, {
            itemSelector: '.frame',
            columnWidth: '.frame',
            percentPosition: true,
            gutter: 2,
            initLayout: false,
            stagger: 30,
            transitionDuration: 0
        });
    
        var thickboxen = document.querySelectorAll('.thickbox');
        var lazyLoad = function(i) {
            var thisun = thickboxen[i].querySelector('img');
        
            if (!thisun.dataset.primed && thisun.dataset.src) {
                thisun.addEventListener('load', function() {
                    var next = ++i;
                    if (thickboxen[next] != undefined) {
                        lazyLoad(next);
                    }
                });
        
                thisun.src = is4G ? thisun.dataset.src : thisun.dataset.srcTiny;
                thisun.dataset.primed = true;
                thisun.style.visibility = 'visible';
                msnry.layout();
        
                setTimeout(function() {
                    thisun.style.opacity = 1;
                }, 100);
            }
        };
        lazyLoad(0);

        imagesLoaded(gal, function() {
            loader.style.opacity = 0;
        });
    }
}

'loading' === document.readyState ? 
    document.addEventListener('DOMContentLoaded', fluffyBunnies, false) :
    fluffyBunnies();
