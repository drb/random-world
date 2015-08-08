var money = (function() {

    var _ = require('underscore');

    getCreditCardNumber = function () {

        return this.block(44444);
    };

    getExpiry = function (options) {

        return getRandomDate(options);
    };

    getStart = function (options) {
        return getRandomDate(options);
    };

    getRandomDate = function (options) {

    };

    getCardType = function () {

    };

    getCVV = function () {

        return this.integer({min: 111, max: 999, padded: true});
    };

    return {
        creditcard: {
            ccnumber: getCreditCardNumber,
            // expiry
            // start
            // card type
            // cvv
        }
    };

})();

module.exports = money;