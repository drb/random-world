/*jslint node: true */
"use strict";

var     _                   = require('underscore'),
        utils               = require('../utils/utilities'),
        cards               = require('./data/ccards'),
        resolver            = new (require('../utils/interface-resolver'))(),

        money = function () {

            // set the public facing methods and the namespace
            this.setInterface('money', [
                'ccnumber', 'ccstart', 'ccexpiry',
                'cctype', 'cvv', 'cv2'
            ]);

            return this;
        };

_.extend(money.prototype, resolver, {

    /**
     * ccnumber
     *
     * reverse the luhn mod check to generate a number:
     *
     * Drop the last digit from the number. The last digit is what we want to check against
     * Reverse the numbers
     * Multiply the digits in odd positions (1, 3, 5, etc.) by 2 and subtract 9 to all any result higher than 9
     * Add all the numbers together
     * The check digit (the last number of the card) is the amount that you would need to add to get a multiple of 10 (Modulo 10)
     *
     * @return {[type]} [description]
     */
    ccnumber: function (options) {

        var cardDefaults = utils.pickRandom(cards),
            number = '',
            check,
            startsWith,
            len,
            hasHyphens = false;

        if (options) {
            if (options.shortName) {
                cardDefaults = _.find(cards, function(card) {
                    return card.shortName === options.shortName;
                });
            }
            if (_.has(options, 'hasHyphens')) {
                hasHyphens = options.hasHyphens;
            }
        }

        if (!cardDefaults) {
            throw 'No card found with supplied shortName';
        } else {
            // get the setup values for the chosen card type
            startsWith = utils.pickRandom(cardDefaults.startsWith);
            len = utils.pickRandom(cardDefaults.len);
        }

        // seed the number
        number += startsWith.toString();

        // build number up to full length, minus the check digit
        while (number.length < (len - 1)) {
            number += Math.floor(utils.random() * 10).toString();
        }

        // get the check digit for this string
        check = this.calculateCheckDigit(number);

        // generate the check digit
        number += check;

        // split the string with hyphens, if required
        if (hasHyphens) {
            number = number.match(/.{1,4}/g).join('-');
        }

        return number;
    },


    /**
     * [calculateCheckDigit description]
     *
     * bit nasty
     *
     * @param  {[type]} string [description]
     * @return {[type]}        [description]
     */
    calculateCheckDigit: function (string) {

        var checksum = 0,
            reversed,
            // odd numbered strings need to be offset by one
            isOdd = (string.length % 2) === 0;

        string.split('').reverse().forEach(function(val, idx) {

            val = +val;

            // some unreadable shit. sorry, future me
            if ((idx + (isOdd ? 0 : 1)) % 2) {
                val *= 2;
                if (val > 9) {
                    val -= 9;
                }
            }
            checksum += +val;
        });

        if (checksum !== 0) {
            checksum = 10 - (checksum % 10);
            if (checksum === 10) {
               checksum = 0;
            }
        }

        return checksum.toString();
    },


    /**
     * ccexpiry
     *
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    ccexpiry: function (options) {

        return this.getRandomDate.apply(this, options);
    },


    /**
     * ccstart
     *
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    ccstart: function (options) {

        return this.getRandomDate.apply(this, options);
    },


    /**
     * getRandomDate
     *
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    getRandomDate: function (options) {

        var defaults = {
                padding: 2,
                round: true,
                min: 1,
                max: 12,
                separator: '/'
            },
            month = this.proxy.numbers.integer(defaults),
            year = this.proxy.numbers.integer(defaults);

        return [month, year].join(defaults.separator);
    },


    /**
     * cctype
     *
     * @return {[type]} [description]
     */
    cctype: function () {

        return utils.pickRandom(cards).name;
    },

    /**
     * cvv
     *
     * @return {[type]} [description]
     */
    cvv: function () {

        return this.proxy.numbers.integer({
            min:    0,
            max:    999,
            padding: 3,
            round:  true
        });
    },

    /**
     * cv2
     *
     * @return {[type]} [description]
     */
    cv2: function () {
        return this.cvv();
    }
});

module.exports = money;
