var utils = (function () {

    var instance;
 
    function createInstance() {
        return [];
        // var object = new Object();
        // return object;
    }
 
    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

module.exports = utils;