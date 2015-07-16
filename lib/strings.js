var sentences = (function() {

    var _       = require('underscore'),
        lorem   = require('./data/lorem');
    
    /**
     * getSentence
     *
     * returns a random sentence from lorem ipsum
     * 
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    function getSentence (options) {

        var sentences = lorem.split('.');
        return sentences[_.random(sentences.length-1)];
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
            length  = options.len || 16,
            chars   = options.chars || '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ' ;

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
            blocks      = '';

        if (options) {

            if (options.blockSize) {
                defaults = options.blockSize;
            }

            if (options.delimiter) {
                delimiter = options.delimiter;
            }   
        }

        defaults.toString().split('').forEach(function(portion){
            blocks += [delimiter, getRandom({len: portion, chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'})].join('');
        });

        return blocks.replace(delimiter, '');
    }

    return {
        sentence:   getSentence,
        block:      getBlock,
        random:     getRandom
    };

})();

module.exports = sentences;