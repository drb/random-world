/*jslint node: true */
"use strict";

var _ = require('underscore'),
    util = require('util');

var RandomWorld = function () {

    this.methods = {};
};

//
_.extend(RandomWorld.prototype, {

    heoo: function () {

        return this.methods;
    },

    register: function (instance) {

        var publicInterface = instance.getInterface(),
            namespace       = publicInterface.name,
            methods         = publicInterface.methods;

        this.methods[namespace] = instance;

        this.__defineGetter__(namespace, function(){
            return instance;
        });

        _.each(methods, function(name) {
            var extend     = {};
            extend[name]   = function(args) {
                // console.warn("*** [depreciation warning] Direct method invocation will be depreciated in future releases. Use random.%s.%s() instead.", namespace, name);
                return instance[name](args);
            };

            _.extend(this, extend);

        }, this);

        instance.foo(this.heoo());
    }
});

/**
 * [description]
 * @param  {[type]} ) { var names [description]
 * @return {[type]}   [description]
 */
var randomWorldFactory = (function () {

    var _           = require('underscore'),
        fs          = require('fs'),
        path        = require('path'),
        util        = require('util'),
        cwd         = __dirname,

        // the return sig
        world = new RandomWorld(),
        // world   = new Proxy({}, {
        //     get: function (target, property) {
        //         console.log(target, property);
        //     }
        // }),

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

        var moduleName       = path.basename(lib, libFilter),
            methodContainer  = require(path.resolve(libPath, lib)),
            Instance         = methodContainer;

        //
        world.register(new Instance());
    }

    //
    // console.log('inline namepsace networkl', world.network.domain());
    // console.log('inline namepsace string', world.strings.word());
    // console.log('inline namepsace string', world.strings.sentence());
    //
    // console.log('inline networkl', world.domain());
    // console.log('inline string', world.word());

    return world;

})();

module.exports = randomWorldFactory;
