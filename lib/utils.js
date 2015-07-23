var utils = (function() {

    var seedrandom  = require('seedrandom'),
        constants   = require('./utils/constants'), 
        // 
        rnd         = seedrandom(
                        constants.RANDOM_SEED, { 
                            entropy: true 
                        }
                    );

    /**
     * getRandomWithEntropy 
     *
     * uses a seeded randomistation library to overcome Math.random()'s inherent 
     * "not actually very random"-ness
     * 
     * @param  {[type]}     [description]
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