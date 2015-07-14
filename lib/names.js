var names = (function(){

    var names       = require('./data/names'),
        _           = require('underscore');
    
    function getFullName (options) {

        return [
            getFirstName(options), 
            getLastName(options)
        ].join(' ');
    }

    function getFirstName (options) {

        var foreNames;

        if (options.gender) {
            foreNames = names[options.gender];
        } else {
            foreNames = _.union(names.female, names.male);  
        }
        
        return foreNames[_.random(foreNames.length)];
    }

    function getLastName (options) {

        var surnames = names.surnames;
        return surnames[_.random(surnames.length)];
    }

    function getTitle (options) {

        var titles = names.titles;
            title = titles[Math.floor(Math.random() * titles.length)];

        return title.name;
    }

    return {
        firstname:  getFirstName,
        lastname:   getLastName,
        fullname:   getFullName,
        title:      getTitle
    };

})();

module.exports = names;