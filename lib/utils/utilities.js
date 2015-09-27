var utils = (function() {

    var seedrandom  = require('seedrandom'),
        _           = require('underscore'),
        constants   = require('./constants'), 
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
    getRandomWithEntropy = function () {

        return rnd();
    };


    /**
     * [padNumber description]
     *
     * pads a number with the required number of zeroes to make it the specified 
     * string length
     * 
     * @param  {[type]} number [description]
     * @return {[type]}        [description]
     */
    padNumber = function (number, length) {

        if (!length) {
            length = 3;
        }

        while (number.toString().length < length) {
            number = '0' + number;
        }

        return number.toString();
    };


    /**
     * [sentenceCase description]
     *
     * returns a string 
     * 
     * @param  {[type]} str [description]
     * @return {[type]}     [description]
     */
    sentenceCase = function (str) {

        return str.split(" ").map(function(i) {
            return i[0].toUpperCase() + i.substring(1);
        }).join(" ");
    };


    /**
     * [formatString description]
     * 
     * @param  {[type]} string   [description]
     * @param  {[type]} charCase [description]
     * @return {[type]}          [description]
     */
    formatString = function (string, charCase) {

        if (!charCase) {
            return string;
        }

        switch (charCase) {
            case 'upper':
                return (string || '').toUpperCase();
                break;
            case 'lower':
                return (string || '').toLowerCase();
                break;
            case 'sentence':
                return sentenceCase(string);
                break;        
            }
    };


    pickRandomArrayItem = function (array) {

        var len = array.length,
            index = Math.floor(rnd() * len);

        return array[index];
    };

    return {
        random:         getRandomWithEntropy,
        pickRandom:     pickRandomArrayItem,
        padNumber:      padNumber,
        formatString:   formatString
    };

})();

module.exports = utils;