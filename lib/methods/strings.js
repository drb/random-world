var sentences = (function() {

    var _           = require('underscore'),
        lorem       = require('./data/lorem'),
        dictionary  = require('./data/dictionary');
    
    /**
     * getSentence
     *
     * returns a random sentence from lorem ipsum
     * 
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    function getSentence (options) {

        var sentences = _.without(_.compact(lorem.split('.')));

        return sentences[_.random(sentences.length - 1)];
    }


    /**
     * getRandom
     *
     * gets a random string
     * 
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    function getRandom (options) {

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
            result += chars[Math.round(Math.random() * (chars.length - 1))];
        }
        return result;
    }

    /**
     * getBlock
     *
     * generates a block of the type AAA-BBB-CCC (333)
     * or AAAA-BB-CCCCC (425)
     * 
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    function getBlock (options) {

        var defaults    = 333,
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
            blocks.push(getRandom({
                len:    portion, 
                chars:  chars
            }));
        });

        return blocks.join(delimiter);
    }


    /**
     * getWord
     *
     * returns a series of dictionary words, split by delimited
     * 
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    function getWord(options) {

        var language    = 'english',
            delimiter   = '-',
            limit       = 1,
            dict        = [],
            words       = [],
            charCase    = false; 

        if (options) {

            if (options.language) {
                console.warn("Only English is supported in this method");
                // throw new Error('Only English is supported in this method');
                //language = options.language;
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
            words.push(dict[_.random(dict.length -1)]);
        }

        return this.utils.formatString(
            words.join(delimiter), charCase
        );
    }

    return {
        sentence:   getSentence,
        block:      getBlock,
        random:     getRandom,
        word:       getWord
    };

})();

module.exports = sentences;