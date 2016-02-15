/**
 * Super class for all method plugins
 *
 * Supplies registration methods for the core proxy.
 */
var InterfaceResolver = function() {

    this.scope  = false;
    this.proxy  = {};

    this.registerProxy = function (f) {
        this.proxy = f;
    };


    this.setScope = function (scope) {

        this.scope = scope;
    };

    this.setInterface = function (moduleName, methods) {

        this.moduleName = moduleName;
        this.methods    = methods;
    };

    this.getInterface = function () {

        return {
            name:       this.moduleName,
            methods:    this.methods
        };
    };

    return this;
};

module.exports = InterfaceResolver;
