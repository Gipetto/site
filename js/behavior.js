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