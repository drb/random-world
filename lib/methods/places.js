/*jslint node: true */
"use strict";

var _           = require('underscore'),
    countries   = require('./data/countries'),
    cities      = require('./data/cities'),
    utils       = require('../utils/utilities'),
    resolver    = new (require('../utils/interface-resolver'))(),

    places      = function () {

        // set the public facing methods and the namespace
        this.setInterface('places', [
            'street', 'city', 'country', 'countrycode'
        ]);

        return this;
    };

_.extend(places.prototype, resolver, {

    /**
     * [street description]
     *
     * returns a fake sounding street name
     *
     * @return {[type]} [description]
     */
    street: function () {

        var number  = this.proxy.numbers.integer({min: 1, max: 200}),
            name    = this.proxy.strings.word({charcase: 'sentence'}),
            types   = [
                'Street', 'Avenue', 'Boulevard', 'Crescent', 'Place',
                'Close', 'Grange', 'Road', 'Mews', 'Court', 'Way', 'Lane',
                'Heights', 'Walk', 'Vale', 'Plaza', 'Quay', 'Parade', 'Hill',
                'Square', 'Parkway', 'Park', 'Promenade'
            ];

        return [number, name, utils.pickRandom(types)].join(' ');
    },

    /**
     * [getCity description]
     *
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    city: function (options) {

        var countryKeys = Object.keys(cities),
            country,
            city;

        // if a country was set, pluck the city from that country
        // otherwise, pick a random country and then pick a random city from there
        if (options && options.country) {
            country = options.country;
        } else {
            country = utils.pickRandom(countryKeys);
        }

        // ensure the country exists in the cities data
        if (country) {
            cities[country] = _.compact(cities[country]);
            city = utils.pickRandom(cities[country]);
        } else {
            throw 'No such city';
        }

        return city;
    },


    /**
     * [getCountry description]
     *
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    country: function (options) {

        return utils.pickRandom(countries).name;
    },

    /**
     * [getCountry description]
     *
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    countrycode: function (options) {

        return utils.pickRandom(countries).code;
    }
});

module.exports = places;
