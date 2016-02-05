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
    },



    /**
     * setChecker
     *
     * utilities class to compute the combinations and permutations
     * of a known set size (n) with (r) possible options
     *
     * this is used for ensuring that when using the CLI options, a user
     * can realistically achieve the required number of data combos
     * when they use the uniq flag. if we don't have the number of possible
     * combinations before processing, then we can't do the output!
    **/
    setChecker = (function() {

        // permutations of n things taken r at at time, order important
        function permutations(n, r) {

            return  factorialPermutations(n, n - r);
        }

        // combinations of n things taken r at a time, order not important
        function combinations(n, r) {
        
            if ((r === 0) || (r === n)) {
                return 1;
            } else if ((r > n) || (r < 0)) {
                return 0;
            } else {
                return factorialCombinations(n, r, (n - r));
            }
        }

        // computes (num! / den!) for permutations
        function factorialPermutations(num, den) {

            var t;

            if (den > num)  {
                return 0;
            } else {
                t = 1;
                while (num > den) {
                    t *= num--;
                }
                return t;
            }
        }

        // computes (n! / k1! k2!) for combinations
        function factorialCombinations(n, k1, k2) {
    
            var i, t, t2;

            // assure k1 >= k2
            if (k1 < k2) { 
                i   = k1;
                k1  = k2;
                k2  = i; 
            }

            if (k1 > n)  {
                t = 0;
            } else {

                // accumulate the factors for k2 factorial
                t = 1;
                while (k2 > 1) {
                    t *= k2--;
                }

                // accumulate the factors from n down to k1
                t2 = 1;
                while (n > k1) {
                    t2 *= n--;
                }
                t = (t2 / t);
            }
            return t;
        }

        // we only want to expose the comb/perm methods
        return {
            combinations: combinations,
            permutations: permutations
        };
    })();

    return {
        random:         getRandomWithEntropy,
        pickRandom:     pickRandomArrayItem,
        padNumber:      padNumber,
        formatString:   formatString,
        luhnModCheck:   luhnModCheck,
        signOutput:     signOutput,
        setChecker:     setChecker
    };

})();

module.exports = utils;