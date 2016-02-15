/*jslint node: true */
"use strict";

var     _                   = require('underscore'),
        utils               = require('../utils/utilities'),
        resolver            = new (require('../utils/interface-resolver'))(),

        geography = function () {

            // set the public facing methods and the namespace
            this.setInterface('geo', ['latlong', 'lat', 'long']);

            return this;
        };

_.extend(geography.prototype, resolver, {

    /**
     * [generateLatLong description]
     *
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    generateLatLong: function (options) {

        var num         = utils.random(180),
            posOrNeg    = Math.floor(utils.random(1));

        if (posOrNeg === 0) {
            num = num * -1;
        }

        return parseFloat(num.toFixed(6));
    },


    /**
     * [getLatLong description]
     *
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    latlong: function (options) {

        return {
            lat:    this.generateLatLong(options),
            long:   this.generateLatLong(options)
        };
    },


    /**
     * [getLong description]
     *
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    long: function (options) {

        return this.latlong(options).long;
    },


    /**
     * [getLat description]
     *
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    lat: function (options) {

        return this.latlong(options).lat;
    }
});

module.exports = geography;
