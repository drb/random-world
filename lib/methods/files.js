var files = (function() {

    var _           = require('underscore'),
        utils       = require('../utils/utilities'),
        extensions  = require('./data/extensions');

    getExtension = function (options) {

        var ext = utils.pickRandom(extensions);

        if (options) {
            if (options.includeDot) {
                ext = '.' + ext;
            }
        }

        return ext;
    };

    return {
        extension: getExtension
    };

})();

module.exports = files;