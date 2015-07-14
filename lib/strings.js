var sentences = (function(){

    var _           = require('underscore');
    
    function getSentence (options) {

        return "I am a teapot";
    }

    return {
        sentence: getSentence
    };

})();

module.exports = sentences;