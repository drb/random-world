/*jslint node: true */
"use strict";

var utils = (function() {

    var seedrandom  = require('seedrandom'),
        _           = require('underscore'),
        constants   = require('./constants'), 
        // 
        rnd         = seedrandom(
                        constants.RANDOM_SEED, { 
                            entropy: true 
                        }
                    ),

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
    },


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

        number = number.toString();

        while (number.length < length) {
            number = ['0', number].join('');
        }

        return number;
    },


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
    },


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
            case 'lower':
                return (string || '').toLowerCase();
            case 'sentence':
                return sentenceCase(string);
            }
    },

    /**
     * pickRandomArrayItem
     *
     * picks a random item from an array using the rnd method
     */
    pickRandomArrayItem = function (array) {

        var len = array.length,
            index = Math.floor(rnd() * len);

        return array[index];
    },


    /**
     * luhnModCheck
     *
     * checks for a valid credit card number by using the luhn mod 10 check
     * 
     * @param  {[type]} str [description]
     * @return {[type]}     [description]
     */
    luhnModCheck = function (str) {

        return str.split('').reduceRight(function(prev, curr, idx) {
            prev = parseInt(prev, 10);
            if ((idx + 1) % 2 !== 0) {
                curr = (curr * 2).toString().split('').reduce(function(p, c){ 
                    return parseInt(p, 10) + parseInt(c, 10); 
                });
            }
            return (prev + parseInt(curr, 10));
        }) % 10 === 0;
    },


    /**
     *
     **/
    proxy = function (method, options) {

        return 123;
    },


    /**
     * signOutput
     * 
     * each method container returns all the exposed methods, and a sub object with 
     * the class name as the property name to allow the methods to be accessed via the 
     * namespace.
     * 
     * i.e. randomWorld.money.creditcard() instead of simply randomWorld.creditcard()
     **/
    signOutput = function (clsName, object) {

        var output = {};
        output[clsName] = object;
        
        return _.extend(output, object);
    };

    return {
        proxy:          proxy,    
        random:         getRandomWithEntropy,
        pickRandom:     pickRandomArrayItem,
        padNumber:      padNumber,
        formatString:   formatString,
        luhnModCheck:   luhnModCheck,
        signOutput:     signOutput
    };

})();

module.exports = utils;