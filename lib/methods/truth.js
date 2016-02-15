/*jslint node: true */
"use strict";

var _           = require('underscore'),
    utils       = require('../utils/utilities'),
    resolver    = new (require('../utils/interface-resolver'))(),

    truth       = function () {

        // set the public facing methods and the namespace
        this.setInterface('truth', ['boolean']);

        return this;
    };

_.extend(truth.prototype, resolver, {

    boolean: function () {

        return parseInt(utils.random() * 2) ?  true : false;
    }
});

module.exports = truth;
