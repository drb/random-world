/*jslint node: true */
"use strict";

var addresses = (function() {

    var _           = require('underscore'),
        countries   = require('./data/countries'), 
        cities      = require('./data/cities'),
        utils       = require('../utils/utilities'),
    

    /**
     * [getCity description]
     * 
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    getCity = function (options) {

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
            city = cities[country][_.random(cities[country].length - 1)];
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
    getCountry = function (options) {

        return utils.pickRandom(countries).name;
    },

    /**
     * [getCountry description]
     * 
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    getCountryCode = function (options) {

        return utils.pickRandom(countries).code;
    };

    return {
        city:           getCity,
        country:        getCountry,
        countrycode:    getCountryCode
    };

})();

module.exports = addresses;