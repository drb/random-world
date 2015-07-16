var numbers = (function(){
    

    /**
     * [getInt description]
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    function getInt (options) {

        return Math.ceil(Math.random() * 100);
    }


    /**
     * [getMultiply description]
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    function getMultiply (options) {

        return (options.value * options.factor);
    }

    return {
        integer:    getInt,
        multiply:   getMultiply
    };

})();

module.exports = numbers;