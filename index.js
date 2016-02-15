/*jslint node: true */
"use strict";

/**
 * randomWorldFactory
 *
 * @todo ROADMAP support plugins - users can specify a directory of plugins that
 * provide random world methods, or overwrite existing features
 *
 * @param  {[type]} ) { var names [description]
 * @return {[type]}   [description]
 */
var // proxy class
    Proxy = require('./lib/random-world-proxy'),

    // factory
    randomWorldFactory  = (function () {

    var _           = require('underscore'),
        fs          = require('fs'),
        path        = require('path'),
        util        = require('util'),
        cwd         = __dirname,

        // the return sig
        world = new Proxy(),

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
     * registers the method plugin in the sig of this factory
     *
     * @param  {[type]} lib [description]
     * @return {[type]}     [description]
     */
    function register(lib) {

        var moduleName       = path.basename(lib, libFilter),
            methodContainer  = require(path.resolve(libPath, lib)),
            Instance         = methodContainer;

        // register the preset plugin
        world.register(new Instance());
    }

    return world;

})();

module.exports = randomWorldFactory;
