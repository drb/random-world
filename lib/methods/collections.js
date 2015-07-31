var collections = (function() {

   var _ = require('underscore'),


    /**
    * [getSimpleArray description]
    * 
    * @param  {[type]} options [description]
    * @return {[type]}         [description]
    */
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


    /**
     * [getItemFromList description]
     * 
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    getItemFromList = function (options) {

        var items = [],
            delimiter = '|';

        if (options) {

            if (options.delimiter) {
                delimiter = options.delimiter;
            }

            if (options.items) {
                items = options.items;
            }
        }

        items = _.compact(items.split(delimiter));

        if (!items.length) {
            throw 'No suitable items provided to pickone()';
        }

        return items[_.random(items.length-1)];
    };

    return {
        array:      getSimpleArray,
        pickone:    getItemFromList
    };

})();

module.exports = collections;