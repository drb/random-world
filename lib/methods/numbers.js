var numbers = (function(){
    
    /**
     * [getInt description]
     * 
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    getInt = function (options) {

        var max = 100,
            min = 0,
            integer;

        if (!options) {
            options = {
                round: true
            };
        }

        if (options) {
            if (options.max) {
                max = options.max;
            }
            if (options.min) {
                min = options.min;
            }
        }

        integer = Math.random() * max;

        if (options.round) {
            return Math.ceil(integer);
        } else {
            return integer;
        }
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
        integer:    getInt,
        float:      getFloat,
        sum:        getSum
    };

})();

module.exports = numbers;