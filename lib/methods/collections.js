/*jslint node: true */
"use strict";

var     _                   = require('underscore'),
        utils               = require('../utils/utilities'),
        resolver            = new (require('../utils/interface-resolver'))(),

        collections = function () {

            // set the public facing methods and the namespace
            this.setInterface('collections', [
                'array', 'pickone'
            ]);

            return this;
        };

_.extend(collections.prototype, resolver, {

    /**
    * [getSimpleArray description]
    *
    * @param  {[type]} options [description]
    * @return {[type]}         [description]
    */
    array: function (options) {

        var limit   = Math.round(utils.random() * 12),
            arr     = [];

        if (options && options.limit) {
            limit = options.limit;
        }

        for (var i = 0; i < limit; i++) {
            arr.push(Math.ceil(utils.random() * 200));
        }

        return arr;
    },


    /**
     * [getItemFromList description]
     *
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    pickone: function (options) {

        var items = '',
            delimiter = '|';

        if (options) {

            if (options.delimiter) {

                delimiter = options.delimiter;

                if (!_.contains([',', '|'], delimiter.replace(/\s/g, ""))) {
                    throw 'pickone() delimiter is restricted to commas (,) or pipes (|)';
                }
            }

            if (options.items) {
                items = options.items;
            }
        }

        items = _.compact(items.split(delimiter));

        if (!items.length) {
            throw 'No suitable items provided to pickone()';
        }

        return utils.pickRandom(items);
    }
});

module.exports = collections;
