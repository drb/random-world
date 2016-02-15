/*jslint node: true */
"use strict";

var     _                   = require('underscore'),
        extensions          = require('./data/extensions'),
        utils               = require('../utils/utilities'),
        resolver            = new (require('../utils/interface-resolver'))(),

        files = function () {

            // set the public facing methods and the namespace
            this.setInterface('files', ['extension']);

            return this;
        };

_.extend(files.prototype, resolver, {

    /**
     * getExtension
     *
     * return a random file extension
     */
    extension: function (options) {

        var ext = utils.pickRandom(extensions);

        if (options) {
            if (options.includeDot) {
                ext = ['.', ext].join('');
            }
        }

        return ext;
    }
});

module.exports = files;
