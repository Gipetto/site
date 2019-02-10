"use strict";

function fluffyBunnies() {
    var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    var is4G = connection && connection.effectiveType == '4g' || true;

    var fetch = function(file) {
        var request = new XMLHttpRequest();
        request.open('GET', file, false);
        request.send(null);
        return JSON.parse(request.responseText);
    }

    var hamburger = (function() {
        var nav = false;
        return function(e) {
            e.preventDefault();
            if (!nav) {
                nav = document.getElementsByTagName('header')[0]
                    .getElementsByTagName('nav')[0];        
            }
            nav.classList.toggle('hamburgled');
        }
    })();
    document.querySelector('.hamburger').addEventListener('click', hamburger)

    var errorDiv = document.querySelector('#bofh-reason');
    if (errorDiv) {
        let reasons = fetch('/js/bofh.js');
        errorDiv.innerHTML = reasons[Math.floor(Math.random() * reasons.length)];                
    }

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
        }

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

    var gal = document.querySelector('.gallery');
    if (gal) {
        var slowLoad = true;
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
        function lazyLoad(i) {
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
        }
        lazyLoad(0, false);

        imagesLoaded(gal, function() {
            loader.style.opacity = 0;
        });
    }
}

'loading' === document.readyState ? 
    document.addEventListener('DOMContentLoaded', fluffyBunnies, false) :
    fluffyBunnies();
