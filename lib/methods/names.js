var names = (function(){

    var names       = require('./data/names'),
        _           = require('underscore'),
        utils       = require('../utils/utilities'), 
        cache       = {};
    

    /**
     * [getFullName description]
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    function getFullName (options) {

        return [
            getFirstName(options), 
            getLastName(options)
        ].join(' ');
    }


    /**
     * [getFirstName description]
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    function getFirstName (options) {

        var foreNames,
            foreName;

        if (!options) {
            options = {};
        }

        if (options.gender) {
            foreNames = names[options.gender];
        } else {
            foreNames = names.female.concat(names.male);  
        }

        if (options.startsWith) {
            foreNames = _.filter(foreNames, function(foreName){
                return foreName.substr(0, options.startsWith.length).toLowerCase() == options.startsWith.toLowerCase();
            });
        }

        // console.log(this.utils);

        return utils.formatString(
            foreNames[_.random(foreNames.length-1)], 
            options.charcase
        );
    }


    /**
     * [getLastName description]
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    function getLastName (options) {

        var surnames = names.surnames;

        if (!options) {
            options = {};
        }

        if (options && options.startsWith) {
            surnames = _.filter(surnames, function(surname){
                return surname.substr(0, options.startsWith.length).toLowerCase() == options.startsWith.toLowerCase();
            });
        }

        return utils.formatString(
            surnames[_.random(surnames.length-1)], 
            options.charcase
        );
    }


    /**
     * [getTitle description]
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    function getTitle (options) {

        var titles = names.titles;
            title = utils.pickRandom(titles);

        return title.name;
    }


    /**
     * getEmail
     *
     * returns a random email address with optional plus address
     * 
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    function getEmail (options) {

        var email   = '',
            opts    = options || {};

        options = _.defaults(
            opts, {
                charcase: 'lower'
            }
        );

        return utils.formatString(
            [
                getFirstName(options),
                (options.hasDot  ? '.' : ''),
                getLastName(options),
                (options.hasPlusAddress ? '+' + this.word() : ''),
                '@',
                this.word(),
                '.',
                this.tld(options)
            ].join(''), options.charcase
        );
    }


    return {
        firstname:  getFirstName,
        lastname:   getLastName,
        fullname:   getFullName,
        title:      getTitle,
        email:      getEmail
    };

})();

module.exports = names;