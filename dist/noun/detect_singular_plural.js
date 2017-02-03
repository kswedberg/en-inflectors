"use strict";
var countableDetection = require("./detect_countable");
var patternReconginition = require("./regexps_detection");
var exceptions = require("./list_exceptions");
function isSingular(input) {
    input = input.split(/\W/)[0].toLowerCase().trim();
    if (countableDetection.isNotCountable(input))
        return true;
    else if (exceptions.singular2plural[input])
        return true;
    else if (exceptions.plural2singular[input])
        return false;
    for (var i = 0; i < patternReconginition.singularPatterns.length; i++) {
        if (patternReconginition.singularPatterns[i].test(input))
            return true;
    }
    for (var i = 0; i < patternReconginition.pluralPatterns.length; i++) {
        if (patternReconginition.pluralPatterns[i].test(input))
            return false;
    }
    return true;
}
exports.isSingular = isSingular;
function isPlural(input) {
    input = input.split(/\W/)[0].toLowerCase().trim();
    if (countableDetection.isNotCountable(input))
        return true;
    return !isSingular(input);
}
exports.isPlural = isPlural;