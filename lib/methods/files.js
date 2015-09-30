/*jslint node: true */
"use strict";

var files = (function() {

    var _           = require('underscore'),
        utils       = require('../utils/utilities'),
        extensions  = require('./data/extensions'),

    getExtension = function (options) {

        var ext = utils.pickRandom(extensions);

        if (options) {
            if (options.includeDot) {
                ext = ['.', ext].join('');
            }
        }

        return ext;
    };

    return {
        extension: getExtension
    };

})();

module.exports = files;