var numbers = (function(){
    

    /**
     * [getInt description]
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
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    getFloat = function (options) {

        return getInt({round: false});
    };

    return {
        integer:    getInt,
        float:      getFloat
    };

})();

module.exports = numbers;