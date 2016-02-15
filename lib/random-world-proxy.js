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

        this.methods[namespace] = instance;

        this.__defineGetter__(namespace, function(){
            return instance;
        });

        // loop each method and append to the prototype of the returned interface
        // this will be depreciated at some point...
        _.each(methods, function(name) {

            var extend     = {};
            extend[name]   = function() {

                // console.warn("*** [depreciation warning] Direct method invocation will be depreciated in future releases. Use random.%s.%s() instead.", namespace, name);

                // pass all arguments straight into the method
                return instance[name].apply(instance, arguments);
            };

            _.extend(this, extend);

        }, this);

        instance.registerProxy(this.getProxyInterface());
    }
});

module.exports = RandomWorld;
