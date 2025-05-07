"use strict";

$(function() {
    var formatTooltip = function(item) {
        var occurs;
        switch(item['count']) {
            case 1: 
                occurs = "once";
                break;
            case 2:
                occurs = "twice";
                break;
            default:
                occurs = item['count'] + " times";
        }
        var html = "<h3>" + item['term'] + "</h3>" +
                "<p>Type: " + item['type'] + "<br />" +
                "Occurs: " + occurs + "</p>" +
                "<ul>";
        for(var i in item['files']) {
            html += "<li>" + i + ", " + (item['files'][i].length > 1 ? "lines: " : "line: ") +
                    item['files'][i].join(", ") +"</li>";
        }
        html += "</ul>";
        return '<span class="tooltip" style="left: -999999px; top: -999999px;">' + html + '</span>';
    };

    var setMeta = function(data) {
        $('#wp-version').text(data['version']);
        $('#wp-filters').text(data['counts']['filters']);
        $('#wp-actions').text(data['counts']['actions']);
    };

    var onTermMouseIn = function() {
        var tip = $(this).siblings('.tooltip');
        var offset = $(this).offset();

        if (!tip.data('has-dims')) {
            tip.width(tip.outerWidth())
            tip.height(tip.outerHeight())
            tip.data('has-dims', 1);
        }

        var toLeft = offset.left < tip.width();
        var toTop = offset.top < tip.height();

        var css = {
            left: toLeft ? '100%' : '',
            right: toLeft ? '' : '100%',
            top: toTop ? '100%' : '',
            bottom: toTop ? '' : '100%'
        };

        tip.css(css);
    };

    var onTermMouseOut = function(e) {
        $(this).siblings('.tooltip').css({
            left: '-999999px',
            top: '-999999px'
        });
    };

    var searchParams = new URLSearchParams(window.location.search);
    var version = searchParams.has('v') ? searchParams.get('v') : $('#version').val();
    
    $('#version').val(version);
    var cloud = $('#cloud');

    $.get('json/wordpress-' + version + '.json', function(data) {
        setMeta(data);

        for (var i in data['data']) {
            var item = data['data'][i];
            if (!item['term'].length) {
                continue;
            }

            var tooltip = formatTooltip(item);

            var term = $('<span/>', {
                id: "item" + i,
                class: item['type'] + " size_" + item['count'],
                style: "font-size: " + item['font-size'] + "; opacity: " + item['opacity'] + ";"
            }).html(item['term']);

            term.hover(onTermMouseIn, onTermMouseOut);

            cloud.append($('<div/>').append(term, tooltip));
        };
    });
});
