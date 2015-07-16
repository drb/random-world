var collections = (function() {

    getSimpleArray = function (options) {

        var limit = Math.ceil(Math.random() * 12),
            arr = [];

        if (options && options.limit) {
            limit = options.limit;
        }

        for (var i = 0; i < limit; i++) {
            arr.push(Math.floor(Math.random() * 200));
        }

        return arr;
    };

    return {
        array: getSimpleArray
    };

})();

module.exports = collections;