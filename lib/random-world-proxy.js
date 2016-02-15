/**
 * [require description]
 * @param  {[type]} 'underscore' [description]
 * @return {[type]}              [description]
 */

var _       = require('underscore'),
    util    = require('util');

var RandomWorld = function () {
    this.methods = {};
};

//
_.extend(RandomWorld.prototype, {

    /**
     * [getProxyInterface description]
     *
     * @return {[type]} [description]
     */
    getProxyInterface: function () {

        return this.methods;
    },


    /**
     * [register description]
     *
     * @param  {[type]} instance [description]
     * @return {[type]}          [description]
     */
    register: function (instance) {

        var publicInterface = instance.getInterface(),
            namespace       = publicInterface.name,
            methods         = publicInterface.methods;

        // cache the methods - used as a bin for the proxy interface method
        this.methods[namespace] = instance;

        // create a getter for the namespace
        this.__defineGetter__(namespace, function(){
            return instance;
        });

        // loop each method and append to the prototype of the returned interface
        // this will be depreciated at some point...
        //
        // ... but the point is that all methods are available globally
        //
        // i.e. random.network.ip(); can be accessed by random.ip();
        _.each(methods, function(name) {

            var extend     = {};
            extend[name]   = function() {

                // warning
                // console.warn("*** [random-world][depreciation warning] Direct method invocation will be depreciated in future releases. Use random.%s.%s() instead.", namespace, name);

                // pass all arguments straight into the method
                return instance[name].apply(instance, arguments);
            };

            // prototype extend
            _.extend(this, extend);

        }, this);

        instance.registerProxy(this.getProxyInterface());
    }
});

module.exports = RandomWorld;
