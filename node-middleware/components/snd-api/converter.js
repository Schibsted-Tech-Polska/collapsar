'use strict';

var _ = require('underscore');

function parseResponse(data) {
    var withId = function (article) {
        return !!getId(article);
    };


    return data.filter(withId).reduce(function(acc, curr){
      acc[getId(curr)] = getImage(curr);
      return acc;
    }, {});
}

function getId(escenicEntry) {
    var idExtension = _.findWhere(escenicEntry.extensions, {'name': 'snd:id'});
    if (idExtension) {
        return idExtension.children[0];
    }
}

function hasImage(escenicEntry) {
    return escenicEntry.links && escenicEntry.links.some(function (link) {
        return link.rel === 'FREECROP' || link.rel === 'TEASERREL';
    });
}

function findImage(escenicEntry) {
    var link = _.findWhere(escenicEntry.links, {'rel': 'FREECROP'}) ||
               _.findWhere(escenicEntry.links, {'rel': 'TEASERREL'});
    if (link.self) {
        return httpsSaveUrl(link.self);
    }
    if (link.href) {
        return httpsSaveUrl(link.href);
    }
}

function getImage(escenicEntry) {
    if (hasImage(escenicEntry)) {
        return findImage(escenicEntry)
            .replace("{snd:widthversion}", "w" + 480)
            .replace("{snd:mode}/{snd:cropversion}", "ALTERNATES/w480c169");
    }
    return '//placehold.it/300x300&text=no+image';
}



function httpsSaveUrl(url) {
    return url; //TODO do not commit
    return url.replace(/^http:/, "");
}

exports.parse = parseResponse;
