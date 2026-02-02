/**
 * Network module - generates random network-related data
 */

import { InterfaceResolver } from '../utils/interface-resolver.js';
import { pickRandom } from '../utils/utilities.js';
import { NotFoundError } from '../errors.js';
import tlds from './data/tlds.js';

export class Network extends InterfaceResolver {
    static namespace = 'network';
    static methods = ['url', 'domain', 'tld', 'ip', 'ipv6'];

    /**
     * Generate a random URL
     * @param {Object} options - Options including protocol, port
     * @returns {string} URL
     */
    url(options = {}) {
        const domain = this.domain(options);
        let protocol = 'http';
        let port = '';
        const path = '';

        if (Object.hasOwn(options, 'protocol')) {
            protocol = options.protocol;
        }

        if (Object.hasOwn(options, 'port')) {
            port = ':' + options.port;
        }

        return [protocol, '://www.', domain, port, path].join('');
    }

    /**
     * Generate a random domain name
     * @param {Object} options - Options including includeDot, standard
     * @returns {string} Domain name
     */
    domain(options = {}) {
        const opts = {
            includeDot: true,
            standard: true,
            ...options
        };

        return [
            this.proxy.strings.word().replace(/\W+/g, ''),
            this.tld(opts)
        ].join('');
    }

    /**
     * Generate a random TLD
     * @param {Object} options - Options including standard, includeDot
     * @returns {string} TLD
     */
    tld(options = {}) {
        const opts = {
            standard: true,
            ...options
        };

        let sample;
        let tld;

        if (Object.hasOwn(opts, 'standard')) {
            sample = tlds.filter(t => t.standard === opts.standard);
            if (sample && sample.length) {
                tld = pickRandom(sample).tld;
            } else {
                throw new NotFoundError('No TLD with supplied options');
            }
        } else {
            const picked = pickRandom(tlds);
            if (picked) {
                tld = picked.tld;
            } else {
                throw new NotFoundError('No TLD with supplied options');
            }
        }

        if (opts.includeDot) {
            tld = '.' + tld;
        }

        return tld;
    }

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
    ipv6(options = {}) {
        const groups = [];

        for (let i = 0; i < 8; i++) {
            // Use seeded random via proxy for reproducibility
            const value = this.proxy.numbers.integer({ min: 0, max: 65535 });
            groups.push(value.toString(16).padStart(4, '0'));
        }

        return groups.join(':');
    }
}

export default Network;
