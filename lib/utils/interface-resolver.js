/**
 * Base class for all method plugins
 * Provides registration methods for the core proxy
 */
export class InterfaceResolver {
    static namespace = '';
    static methods = [];

    constructor() {
        this.proxy = {};
        this.moduleName = this.constructor.namespace;
        this.methods = this.constructor.methods;
    }

    registerProxy(proxyInterface) {
        this.proxy = proxyInterface;
    }

    getInterface() {
        return {
            name: this.moduleName,
            methods: this.methods
        };
    }
}

export default InterfaceResolver;
