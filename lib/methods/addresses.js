var addresses = (function() {

    var _           = require('underscore'),
        countries   = require('./data/countries'), 
        cities      = require('./data/cities');
    

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
            country = countryKeys[_.random(countryKeys.length - 1)];
        }
        
        // ensure the country exists in the cities data
        if (country) {
            city = cities[country][_.random(cities[country].length - 1)];
        } else {
            throw 'No such city';
        }

        return city;
    };


    /**
     * [getCountry description]
     * 
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    getCountry = function (options) {

        return countries[_.random(countries.length - 1)].name;
    };

    return {
        city:    getCity,
        country: getCountry
    };

})();

module.exports = addresses;