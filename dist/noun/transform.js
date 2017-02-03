"use strict";
var detector = require("./detect_singular_plural");
var excpetions = require("./list_exceptions");
var transformationPatterns = require("./regexps_transformation");
exports.toPlural = function (input) {
    if (detector.isPlural(input))
        return input;
    else if (excpetions.singular2plural[input])
        return excpetions.singular2plural[input][0];
    for (var i = 0; i < transformationPatterns.toPlural.length; i++) {
        var pattern = transformationPatterns.toPlural[i];
        if (pattern.regexp.test(input))
            return input.replace(pattern.regexp, pattern.replacement);
    }
    return input;
};
exports.toSingular = function (input) {
    if (detector.isSingular(input))
        return input;
    else if (excpetions.plural2singular[input])
        return excpetions.plural2singular[input][0];
    for (var i = 0; i < transformationPatterns.toSingular.length; i++) {
        var pattern = transformationPatterns.toSingular[i];
        if (pattern.regexp.test(input))
            return input.replace(pattern.regexp, pattern.replacement);
    }
    return input;
};