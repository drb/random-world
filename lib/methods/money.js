/*jslint node: true */
"use strict";

var money = (function() {

    var _       = require('underscore'),
        cards   = require('./data/ccards'), 
        utils   = require('../utils/utilities'),

    getCreditCardNumber = function () {

        return this.block(44444);
    },

    getExpiry = function (options) {

        return getRandomDate(options);
    },

    getStart = function (options) {

        return getRandomDate(options);
    },

    getRandomDate = function (options) {

        var month = this.number({padding: 2, min: 1, max: 12}),
            year = this.number({padding: 2, min: 1, max: 12});

        return [month, year].join('/');
    },

    getCardType = function () {

    },

    getCVV = function () {

        return this.integer({
            min: 0, 
            max: 999, 
            padded: true
        });
    };

    return {
        ccnumber: getCreditCardNumber,
            start: getStart,
            expiry: getExpiry,
            // card type
            cvv: getCVV,
            cv2: getCVV
    };

})();

module.exports = money;