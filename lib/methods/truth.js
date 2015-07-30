var truth = (function() {
    
    getBoolean = function () {

        return parseInt(this.utils.random(2)) ?  true : false;
    };

    return {
        boolean:    getBoolean
    };

})();

module.exports = truth;