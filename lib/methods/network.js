/*jslint node: true */
"use strict";

var network = (function() {

    var _           = require('underscore'),
        tlds        = require('./data/tlds'),
        utils       = require('../utils/utilities'),

    /**
     * getDomain
     *
     * returns a random domain with a random TLD
     * 
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    getDomain = function (options) {

        if (!options) {
            options = {};
        }

        options = _.defaults(
            { 
                includeDot: true, 
                standard: true 
            }, options
        );

        return [this.word(), getTLD(options)].join('');
    },



    /**
     * getTLD
     *
     * returns a top level domain - default is to return a "standard"
     * TLD (one that is recognisable, i.e .com or .org)
     * 
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    getTLD = function (options) {

        var tld,
            sample;

        if (!options) {
            options = { 
                standard: true 
            };
        } 

        if (_.has(options, 'standard')) {
            sample = _.filter(tlds, function(tld){
                return tld.standard === options.standard;
            });
            tld = utils.pickRandom(sample).tld;
        } else {
            tld = utils.pickRandom(tlds).tld;
        }

        if (options.includeDot) {
            tld = '.' + tld;
        }

        return tld;
    },


    /**
     * getIP
     *
     * returns a random IP address with optional CIDR mask
     *
     * n.b. the addresses are bullshit
     * 
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    getIP = function (options) {

        var ip = [];

        for (var i = 0; i < 4; i++) {
            ip.push(this.integer({max: 255}));
        }

        ip = ip.join('.');

        if (options) {
            if (options.mask) {
                ip += '/' + this.integer({max: 32});
            }
        }

        return ip;
    },


    /**
     * getIPv6
     *
     * this is tricky. @todo
     * 
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    getIPv6 = function (options) {

    };

    return {
        domain: getDomain,
        ip:     getIP,
        ipv6:   getIPv6,
        tld:    getTLD
    };

})();

module.exports = network;