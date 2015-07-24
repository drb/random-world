var addresses = (function() {

    var _           = require('underscore'),
        cities      = require('./data/cities');
    
    getCity = function (options) {

        return "Leeds";
    };

    return {
        city:    getCity
    };

})();

module.exports = addresses;