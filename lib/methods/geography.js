var geography = (function() {

    var utils = require('../utils/utilities');
    
    /**
     * [generateLatLong description]
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    generateLatLong = function (options) {

        var num         = utils.random(180),
            posorneg    = Math.floor(utils.random(1));

        if (posorneg === 0) {
            num = num * -1;
        }

        return parseFloat(num.toFixed(6));
    };


    /**
     * [getLatLong description]
     * 
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    getLatLong = function (options) {

        return {
            lat:    generateLatLong.call(this, options),
            long:   generateLatLong.call(this, options)
        };
    };


    /**
     * [getLong description]
     * 
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    getLong = function (options) {

        return getLatLong.call(this, options).long;
    };


    /**
     * [getLat description]
     * 
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    getLat = function (options) {

        return getLatLong.call(this, options).lat;
    };

    return {
        latlong:    getLatLong,
        lat:        getLat,
        long:       getLong
    };

})();

module.exports = geography;