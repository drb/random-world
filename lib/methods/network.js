/*jslint node: true */
"use strict";

var     _                   = require('underscore'),
        tlds                = require('./data/tlds'),
        utils               = require('../utils/utilities'),
        resolver            = new (require('../utils/interface-resolver'))(),

        //
        network = function () {

            // set the public facing methods and the namespace
            this.setInterface('network', [
                'url', 'domain', 'tld', 'ip', 'ipv6'
            ]);

            return this;
        };

_.extend(network.prototype, resolver, {


    /**
     * url
     *
     * generates a URL with custom protocol & port. defaults to http
     *
     * @todo needs work
     *
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    url: function (options) {

        var domain      = this.domain(options),
            protocol    = 'http',
            port        = '',
            path        = '';

        if (options) {

            if (_.has(options, 'protocol')) {
                protocol = options.protocol;
            }

            if (_.has(options, 'port')) {
                port = ':' + options.port;
            }

            if (_.has(options, 'protocol')) {
                protocol = options.protocol;
            }
        }

        return [protocol, '://www.', domain, port, path].join('');
    },


    /**
     * getDomain
     *
     * returns a random domain with a random TLD
     *
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    domain: function (options) {

        if (!options) {
            options = {};
        }

        options = _.extend({
            includeDot: true,
            standard: true
        }, options);

        return [this.proxy.strings.word(), this.tld(options)].join('');
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
    tld: function (options) {

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
    ip: function (options) {

        var ip = [];

        for (var i = 0; i < 4; i++) {
            ip.push(this.proxy.numbers.integer({max: 255}));
        }

        ip = ip.join('.');

        if (options) {
            if (options.mask) {
                ip += '/' + this.proxy.numbers.integer({max: 32});
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
    ipv6: function (options) {

    }
});

module.exports = network;
