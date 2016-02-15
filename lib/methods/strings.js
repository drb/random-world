/*jslint node: true */
"use strict";

var     _                   = require('underscore'),
        lorem               = require('./data/lorem'),
        dictionary          = require('./data/dictionary'),
        utils               = require('../utils/utilities'),
        resolver            = new (require('../utils/interface-resolver'))(),

        strings = function () {

            // set the public facing methods and the namespace
            this.setInterface('strings', [
                'word', 'sentence', 'random', 'block'
            ]);

            return this;
        };

_.extend(strings.prototype, resolver, {

    /**
     * getSentence
     *
     * returns a random sentence from lorem ipsum
     *
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    sentence: function (options) {

        var sentences = _.without(_.compact(lorem.split('.')));

        return utils.pickRandom(sentences);
    },


    /**
     * getRandom
     *
     * gets a random string
     *
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    random: function (options) {

        var result  = '',
            length  = 16,
            chars   = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

        if (options) {
            if (options.len) {
                length = options.len;
            }
            if (options.chars) {
                chars = options.chars;
            }
        }

        for (var i = length; i > 0; --i) {
            result += chars[Math.round(utils.random() * (chars.length - 1))];
        }
        return result;
    },

    /**
     * getBlock
     *
     * generates a block of the type AAA-BBB-CCC (333)
     * or AAAA-BB-CCCCC (425)
     *
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    block: function (options) {

        var me = this,
            defaults    = 333,
            delimiter   = '-',
            blocks      = [],
            chars       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        if (options) {

            if (options.blockSize) {
                defaults = options.blockSize;
            }

            if (options.delimiter) {
                delimiter = options.delimiter;
            }

            if (options.chars) {
                chars = options.chars;
            }
        }

        defaults.toString().split('').forEach(function(portion){
            blocks.push(me.proxy.strings.random({
                len:    portion,
                chars:  chars
            }));
        });

        return blocks.join(delimiter);
    },


    /**
     * getWord
     *
     * returns a series of dictionary words, split by delimited
     *
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    word: function(options) {

        var language    = 'english',
            delimiter   = '-',
            limit       = 1,
            dict        = [],
            words       = [],
            charCase    = false;

        if (options) {

            if (options.language) {
                throw new Error('Only English is supported in this method');
            }

            if (options.limit) {
                limit = options.limit;
            }

            if (options.delimiter) {
                delimiter = options.delimiter;
            }

            if (options.charcase) {
                charCase = options.charcase;
            }
        }

        dict = dictionary[language];

        for (var i = 0; i < limit; i++) {
            words.push(utils.pickRandom(dict));
        }

        return utils.formatString(
            words.join(delimiter), charCase
        );
    }
});

module.exports = strings;
