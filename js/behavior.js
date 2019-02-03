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
        stagger: 30
    });

    function showImage(curr, items) {
        var img = items[curr].element.querySelector('img');
        img.style.visibility = 'visible';
        img.style.opacity = 1;

        var next = curr + 1;
        if (items[next]) {
            setTimeout(function() {
                showImage(next, items);
            }, 50);
        }
    }

    msnry.on('layoutComplete', function(laidOutItems) {
        loader.style.opacity = 0;

        if (slowLoad) {
            showImage(0, laidOutItems);
        } else {
            laidOutItems.forEach(function(item) {
                var img = item.element.querySelector('img');
                img.style.visibility = 'visible';
                img.style.opacity = 1;
            });
        }
    });

    imagesLoaded(gal, function() {
        msnry.layout();
    });
}
