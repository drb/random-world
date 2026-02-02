/**
 * RandomWorld Proxy
 * Provides namespace-based access to random data generators
 * with deprecated direct method access
 */

export class RandomWorld {
    constructor() {
        this.methods = {};
    }

    /**
     * Get the proxy interface containing all registered methods
     * @returns {Object} Methods object
     */
    getProxyInterface() {
        return this.methods;
    }

    /**
     * Register a method plugin
     * @param {Object} instance - Plugin instance
     */
    register(instance) {
        const publicInterface = instance.getInterface();
        const namespace = publicInterface.name;
        const methods = publicInterface.methods;

        // Cache the methods
        this.methods[namespace] = instance;

        // Create a getter for the namespace using Object.defineProperty
        Object.defineProperty(this, namespace, {
            get: () => instance,
            enumerable: true,
            configurable: true
        });

        // Create direct method access (deprecated but maintained for backwards compatibility)
        methods.forEach(name => {
            this[name] = (...args) => {
                // Deprecation warning - commented out to avoid noise
                // console.warn(`[random-world] Deprecation warning: Direct method invocation will be removed in future releases. Use random.${namespace}.${name}() instead.`);
                return instance[name].apply(instance, args);
            };
        });

        instance.registerProxy(this.getProxyInterface());
    }
}

export default RandomWorld;
