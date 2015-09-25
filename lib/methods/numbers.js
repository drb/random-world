var numbers = (function() {

    var utils = require('../utils/utilities');
    
    /**
     * [getInt description]
     * 
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    getInt = function (options) {

        var max = 100,
            min = 0,
            integer,
            padding;

        if (!options) {
            options = {
                round: true,
                padding: false
            };
        }

        if (options) {
            if (options.max) {
                max = options.max;
            }
            if (options.min) {
                min = options.min;
            }
            if (options.padding !== false) {
                padding = options.padding;
            }
        }

        integer = Math.random() * max;

        if (options.round) {
            integer = Math.ceil(integer);
        }

        if (padding) {
            integer = utils.padNumber(integer, padding);
        }

        return integer;
    };


    /**
     * [getFloat description]
     * 
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    getFloat = function (options) {

        return getInt({round: false});
    };


    /**
     * getSum
     *
     * generates a set of numbers that sum the defined total
     * 
     * @param  {[type]} n [description]
     * @param  {[type]} t [description]
     * @return {[type]}   [description]
     */
    getSum = function (options) {

        var n       = options.count,
            t       = options.max,
            max     = n * (n + 1) / 2,
            list    = [],
            sum     = 0, 
            i       = n,
            factor;

        if (t < max) {
            throw 'Range error';
        }

        while (i--) {
            var r = Math.random();
            list.push(r);
            sum += r;
        }

        factor  = t / sum;
        sum     = 0;
        i       = n; 

        while (--i) {
            list[i] = parseInt(factor * list[i]);
            sum += list[i];
        }

        list[0] = t - sum;

        return list;
    };

    return {
        // identical method accessors - useful, as `number` is a more sensible name :/
        integer:    getInt,
        number:     getInt,
        // rest of the methods
        float:      getFloat,
        sum:        getSum
    };

})();

module.exports = numbers;