/*jslint node: true */
"use strict";

var _           = require('underscore'),
    utils       = require('../utils/utilities'),
    resolver    = new (require('../utils/interface-resolver'))(),

    numbers = function () {

        // set the public facing methods and the namespace
        this.setInterface('numbers', [
            'integer', 'number', 'float', 'sum'
        ]);

        return this;
    };

_.extend(numbers.prototype, resolver, {

    /**
     * [integer description]
     *
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    integer: function (options) {

        var max = 10000000,
            min = 0,
            integer,
            padding = false,
            round = true;

        if (options) {

            if (_.has(options, 'max')) {
                if (!_.isNaN(+options.max)) {
                    max = +options.max;
                }
            }

            if (_.has(options, 'min')) {
                if (!_.isNaN(+options.min)) {
                    min = +options.min;
                }
            }

            if (_.has(options, 'round')) {
                round = options.round;
            }

            if (_.has(options, 'padding')) {
                padding = options.padding;
            }
        }

        if (max === min) {
            throw 'Maximum and minimum values are identical (default min = 0).';
        }

        integer = (utils.random() * (max - min)) + min;

        if (round) {
            integer = Math.ceil(integer);
        }

        if (padding) {
            integer = utils.padNumber(integer, padding);
        }

        return integer;
    },


    /**
     * [number description]
     *
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    number: function (options) {

        return this.integer(options);
    },


    /**
     * [float description]
     *
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    float: function (options) {

        return this.integer({round: false});
    },


    /**
     * sum
     *
     * generates a set of numbers that sum the defined total
     *
     * @param  {[type]} n [description]
     * @param  {[type]} t [description]
     * @return {[type]}   [description]
     */
    sum: function (options) {

        var n       = options.count,
            t       = options.max,
            max     = n * (n + 1) / 2,
            list    = [],
            sum     = 0,
            i       = n,
            factor;

        if (t < max) {
            throw 'Range error';
        }

        while (i--) {
            var r = utils.random();
            list.push(r);
            sum += r;
        }

        factor  = t / sum;
        sum     = 0;
        i       = n;

        while (--i) {
            list[i] = parseInt(factor * list[i]);
            sum += list[i];
        }

        list[0] = t - sum;

        return list;
    }
});

module.exports = numbers;
