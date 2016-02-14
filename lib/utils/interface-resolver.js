/**
 *
 */
var InterfaceResolver = function() {

    this.id     = Math.random();
    this.scope  = false;
    this.proxy = {};

    this.foo = function (f) {
        // console.log("cim", this.id, f);
        this.proxy = f;
    }


    this.setScope = function (scope) {

        this.scope = scope;
    };

    this.setInterface = function (moduleName, methods) {

        this.moduleName = moduleName;
        this.methods = methods;
    };

    this.getInterface = function () {

        return {
            name: this.moduleName,
            methods: this.methods
        };
    };

    return this;
};

module.exports = InterfaceResolver;
