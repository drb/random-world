/**
 * Network module - generates random network-related data
 * Focuses on lower-level networking concepts (OSI layers 1-4)
 */

import { InterfaceResolver } from '../utils/interface-resolver.js';
import { pickRandom } from '../utils/utilities.js';
import { commonPorts } from './data/internet.js';

export class Network extends InterfaceResolver {
    static namespace = 'network';
    static methods = ['ip', 'ipv6', 'mac', 'port'];

    /**
     * Generate a random IPv4 address
     * @param {Object} options - Options including mask
     * @returns {string} IPv4 address
     */
    ip(options = {}) {
        const octets = [];

        for (let i = 0; i < 4; i++) {
            octets.push(this.proxy.numbers.integer({ max: 255 }));
        }

        let ip = octets.join('.');

        if (options.mask) {
            ip += '/' + this.proxy.numbers.integer({ max: 32 });
        }

        return ip;
    }

    /**
     * Generate a random IPv6 address
     * @param {Object} options - Options (reserved for future use)
     * @returns {string} IPv6 address
     */
    ipv6(_options = {}) {
        const groups = [];

        for (let i = 0; i < 8; i++) {
            // Use seeded random via proxy for reproducibility
            const value = this.proxy.numbers.integer({ min: 0, max: 65535 });
            groups.push(value.toString(16).padStart(4, '0'));
        }

        return groups.join(':');
    }

    /**
     * Generate a random MAC address
     * @param {Object} options - Options including separator (':' or '-'), uppercase
     * @returns {string} MAC address
     */
    mac(options = {}) {
        const separator = options.separator || ':';
        const uppercase = options.uppercase || false;

        const octets = [];
        for (let i = 0; i < 6; i++) {
            const octet = this.proxy.numbers.integer({ min: 0, max: 255 })
                .toString(16)
                .padStart(2, '0');
            octets.push(uppercase ? octet.toUpperCase() : octet);
        }

        return octets.join(separator);
    }

    /**
     * Generate a random port number
     * @param {Object} options - Options including type ('common', 'random', 'registered', 'dynamic')
     * @returns {number|Object} Port number or {port, service} if type is 'common' and includeService is true
     */
    port(options = {}) {
        const type = options.type || 'random';

        switch (type) {
            case 'common': {
                const portInfo = pickRandom(commonPorts);
                if (options.includeService) {
                    return { port: portInfo.port, service: portInfo.service };
                }
                return portInfo.port;
            }
            case 'registered':
                // Registered ports: 1024-49151
                return this.proxy.numbers.integer({ min: 1024, max: 49151 });
            case 'dynamic':
                // Dynamic/private ports: 49152-65535
                return this.proxy.numbers.integer({ min: 49152, max: 65535 });
            case 'random':
            default:
                // Any valid port: 1-65535
                return this.proxy.numbers.integer({ min: 1, max: 65535 });
        }
    }
}

export default Network;
