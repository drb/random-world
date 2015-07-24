var collections = (function() {

   var _ = require('underscore'),

    getSimpleArray = function (options) {

        var limit = _.random(1, 12),
            arr = [];

        if (options && options.limit) {
            limit = options.limit;
        }

        for (var i = 0; i < limit; i++) {
            arr.push(_.random(1, 200));
        }

        return arr;
    };

    return {
        array: getSimpleArray
    };

})();

module.exports = collections;