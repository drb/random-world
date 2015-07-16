var names = (function(){

    var names       = require('./data/names'),
        _           = require('underscore'),
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

        if (options && options.gender) {
            foreNames = names[options.gender];
        } else {
            foreNames = names.female.concat(names.male);  
        }
        
        return changeCase(foreNames[_.random(foreNames.length)], options);
    }


    /**
     * [getLastName description]
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    function getLastName (options) {

        var surnames = names.surnames;

        if (options && options.startsWith) {
            surnames = _.filter(surnames, function(surname){
                return surname.substr(0, options.startsWith.length).toLowerCase() == options.startsWith.toLowerCase();
            });
        }

        return changeCase(surnames[_.random(surnames.length)], options);
    }


    /**
     * [getTitle description]
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    function getTitle (options) {

        var titles = names.titles;
            title = titles[Math.floor(Math.random() * titles.length)];

        return title.name;
    }


    function changeCase (string, options) {

        if (options) {
            switch (options['charcase']) {
                case 'upper':
                    string = string.toUpperCase();
                    break;
                case 'lower':
                    string = string.toLowerCase();
                    break;
            }
        }

        return string;

    }

    return {
        firstname:  getFirstName,
        lastname:   getLastName,
        fullname:   getFullName,
        title:      getTitle
    };

})();

module.exports = names;