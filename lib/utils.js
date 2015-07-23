var utils = (function() {

    var seedrandom  = require('seedrandom'),
        rnd         = seedrandom('iamateapot', { entropy: true });

    /**
     * getRandomWithEntropy 
     *
     * wjn
     * 
     * @param  {[type]} ass [description]
     * @return {[type]}     [description]
     */
    getRandomWithEntropy = function (seed) {

        return rnd() * (seed || 100);
    };

    return {
        utils: {
            random: getRandomWithEntropy
        }
    };

})();

module.exports = utils;