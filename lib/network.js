var network = (function() {

    var _           = require('underscore'),
        tlds        = require('./data/tlds');

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
    };



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
            tld = sample[_.random(sample.length-1)].tld;
        } else {
            tld = tlds[_.random(tlds.length-1)].tld;
        }

        if (options.includeDot) {
            tld = '.' + tld;
        }

        return tld;
    };

    return {
        domain: getDomain,
        tld:    getTLD
    };

})();

module.exports = network;