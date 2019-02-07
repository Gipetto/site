"use strict";

const hamburger = (function() {
    let nav = false;
    return function(e) {
        e.preventDefault();
        if (!nav) {
            nav = document.getElementsByTagName('header')[0]
                .getElementsByTagName('nav')[0];        
        }
        nav.classList.toggle('hamburgled');
    }
})();

function fluffyBunnies() {
    var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    var is4G = connection && connection.effectiveType == '4g' || true;

    document.querySelectorAll('.thickbox').forEach(function(element) {
        element.addEventListener('click', function(e) {
            e.preventDefault();
            var target = document.querySelector(this.getAttribute('href'));
            var targetImage = target.querySelector('img');

            if (!targetImage.dataset.primed) {
                target.querySelector('a').addEventListener('click', function(e) {
                    e.preventDefault();
                    target.classList.toggle('onstage');
                });

                if (targetImage.dataset.src) {
                    targetImage.addEventListener('load', function() {
                        this.style.opacity = 1;
                    });
                    
                    targetImage.style.opacity = 0;
                    targetImage.src = targetImage.dataset.src;
                }
                targetImage.dataset.primed = true;
            }

            target.classList.toggle('onstage');
        });
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
            console.log(thisun.dataset);
    
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

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fluffyBunnies, false);
} else {
    fluffyBunnies();
}
