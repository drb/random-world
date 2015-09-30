/*jslint node: true */
"use strict";

var truth = (function() {

    var utils = require('../utils/utilities'),
    
    getBoolean = function () {

        return parseInt(utils.random() * 2) ?  true : false;
    };

    return {
        boolean: getBoolean
    };

})();

module.exports = truth;