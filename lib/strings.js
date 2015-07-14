var sentences = (function(){

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

        var sentences = lorem.split('. ');
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
     * generates a block of the type AAA-BBB-CCC
     * 
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    function getBlock (options) {

        var defaults = 333,
            blocks;

        if (options && options.blockSize) {
            defaults = options.blockSize;
        }

        defaults.toString().split().forEach(function(portion){
            blocks += getRandom({len: portion}).toUpperCase();
        });

        return blocks;
    }

    return {
        sentence:   getSentence,
        block:      getBlock,
        random:     getRandom
    };

})();

module.exports = sentences;