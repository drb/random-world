var files = (function() {

    var _           = require('underscore'),
        extensions  = require('./data/extensions');

    getExtension = function (options) {

        var ext = extensions[_.random(extensions.length-1)];

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