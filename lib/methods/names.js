/*jslint node: true */
"use strict";

var     _                   = require('underscore'),
        utils               = require('../utils/utilities'),
        namesDict           = require('./data/names'),
        resolver            = new (require('../utils/interface-resolver'))(),

        names = function () {

            // set the public facing methods and the namespace
            this.setInterface('names', [
                'firstname', 'lastname', 'fullname',
                'title', 'email'
            ]);

            return this;
        };

_.extend(names.prototype, resolver, {

    /**
     * [getFullName description]
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    fullname: function (options) {

        return [
            this.firstname(options),
            this.lastname(options)
        ].join(' ');
    },


    /**
     * [getFirstName description]
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    firstname: function (options) {

        var foreNames,
            foreName;

        if (!options) {
            options = {};
        }

        if (options.gender) {
            foreNames = namesDict[options.gender];
        } else {
            foreNames = namesDict.female.concat(namesDict.male);
        }

        if (options.startsWith) {
            foreNames = _.filter(foreNames, function(foreName) {
                return foreName.substr(0, options.startsWith.length).toLowerCase() == options.startsWith.toLowerCase();
            });
        }

        // console.log(this.utils);

        return utils.formatString(
            utils.pickRandom(foreNames),
            options.charcase
        );
    },


    /**
     * [getLastName description]
     *
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    lastname: function (options) {

        var surnames = namesDict.surnames;

        if (!options) {
            options = {};
        }

        if (options && options.startsWith) {
            surnames = _.filter(surnames, function(surname) {
                return surname.substr(0, options.startsWith.length).toLowerCase() == options.startsWith.toLowerCase();
            });
        }

        return utils.formatString(
            utils.pickRandom(surnames),
            options.charcase
        );
    },


    /**
     * [getTitle description]
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    title: function (options) {

        var titles = namesDict.titles,
            title = utils.pickRandom(titles);

        return title.name;
    },


    /**
     * email
     *
     * returns a random email address with optional plus address
     *
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    email: function (options) {

        var email   = '',
            opts    = options || {};

        options = _.defaults(
            opts, {
                charcase: 'lower'
            }
        );

        return utils.formatString(
            [
                this.firstname(options),
                (options.hasDot  ? '.' : ''),
                this.lastname(options),
                (options.hasPlusAddress ? '+' + this.proxy.strings.word() : ''),
                '@',
                this.proxy.strings.word(),
                '.',
                this.proxy.network.tld(options)
            ].join(''), options.charcase
        );
    }
});

module.exports = names;
