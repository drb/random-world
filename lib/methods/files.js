/*jslint node: true */
"use strict";

var files = (function() {

    var _           = require('underscore'),
        utils       = require('../utils/utilities'),
        extensions  = require('./data/extensions'),

    /**
     * getExtension
     *
     * return a random file extension
     */
    getExtension = function (options) {

        var ext = utils.pickRandom(extensions);

        if (options) {
            if (options.includeDot) {
                ext = ['.', ext].join('');
            }
        }

        return ext;
    };

    return utils.signOutput('files', {
        extension: getExtension
    });

})();

module.exports = files;