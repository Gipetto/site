"use strict";

document.addEventListener('DOMContentLoaded', function(event) {
    let nav = document.getElementsByTagName('header')[0]
        .getElementsByTagName('nav')[0];
    let hamburger = nav.getElementsByClassName('hamburger')[0];
    
    hamburger.getElementsByTagName('a')[0].onclick = function(e) {
        e.preventDefault();
        nav.classList.toggle('hamburgled');
    };
});