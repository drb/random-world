"use strict";

/**
 * [description]
 * @param  {[type]} ) { var        names [description]
 * @return {[type]}   [description]
 */
var randomWorldFactory = (function () {

    var _           = require('underscore'), 
        fs          = require('fs'), 
        path        = require('path'),
        cwd         = __dirname, 

        // the return sig
        signature   = {},

        // various load configs
        libFilter   = '.js', 
        libPath     = path.resolve(path.join(cwd, 'lib/methods')),
        libraries   = fs.readdirSync(path.normalize(libPath));
    
    /**
     * collate the libs and add them to the factory output
     * 
     * @param  {[type]} lib){       if (path.extname(lib) [description]
     * @return {[type]}            [description]
     */
    libraries.forEach(function(lib) {

        if (path.extname(lib) === libFilter) {
            try {
                register(lib);    
            } catch (e) {
                console.error(e);
            }
        }
    });

    /**
     * registers the methods in the library in the sig of this factory
     * 
     * @param  {[type]} lib [description]
     * @return {[type]}     [description]
     */
    function register(lib) {

        var moduleName  = path.basename(lib, libFilter),
            instance    = require(path.resolve(libPath, lib));

        _.extend(signature, instance);
    }

    return signature;

})();

module.exports = randomWorldFactory;