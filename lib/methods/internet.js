/**
 * Internet module - generates random internet-related data
 * Focuses on higher-level application concepts (OSI layer 7)
 */

import { InterfaceResolver } from '../utils/interface-resolver.js';
import { pickRandom } from '../utils/utilities.js';
import { NotFoundError } from '../errors.js';
import {
    userAgentTemplates,
    mimeTypes,
    httpMethods,
    httpStatusCodes,
    usernameAdjectives,
    usernameNouns,
    passwordCharsets
} from './data/internet.js';
import tlds from './data/tlds.js';

export class Internet extends InterfaceResolver {
    static namespace = 'internet';
    static methods = ['url', 'domain', 'tld', 'username', 'password', 'userAgent', 'port', 'httpMethod', 'httpStatusCode', 'mimeType'];

    /**
     * Generate a random URL
     * @param {Object} options - Options including protocol, port ('common', 'random', or a specific number)
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
            if (options.port === 'common') {
                port = ':' + this.proxy.network.port({ type: 'common' });
            } else if (options.port === 'random') {
                port = ':' + this.proxy.network.port({ type: 'random' });
            } else {
                port = ':' + options.port;
            }
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
     * Generate a random username
     * @param {Object} options - Options including style ('adjective_noun', 'name_number', 'random')
     * @returns {string} Username
     */
    username(options = {}) {
        const style = options.style || 'mixed';

        switch (style) {
            case 'adjective_noun': {
                const adj = pickRandom(usernameAdjectives);
                const noun = pickRandom(usernameNouns);
                const separator = pickRandom(['_', '', '.', '-']);
                return `${adj}${separator}${noun}`;
            }
            case 'name_number': {
                const name = this.proxy.names.firstname({ charCase: 'lower' });
                const number = this.proxy.numbers.integer({ min: 1, max: 9999 });
                return `${name}${number}`;
            }
            case 'random': {
                return this.proxy.strings.random({ len: options.length || 12 });
            }
            case 'mixed':
            default: {
                const patterns = ['adjective_noun', 'name_number'];
                return this.username({ ...options, style: pickRandom(patterns) });
            }
        }
    }

    /**
     * Generate a random password
     * @param {Object} options - Options including length, uppercase, lowercase, numbers, symbols
     * @returns {string} Password
     */
    password(options = {}) {
        const length = options.length || 16;
        const useLowercase = options.lowercase !== false;
        const useUppercase = options.uppercase !== false;
        const useNumbers = options.numbers !== false;
        const useSymbols = options.symbols !== false;

        let charset = '';
        if (useLowercase) {charset += passwordCharsets.lowercase;}
        if (useUppercase) {charset += passwordCharsets.uppercase;}
        if (useNumbers) {charset += passwordCharsets.numbers;}
        if (useSymbols) {charset += passwordCharsets.symbols;}

        if (!charset) {
            charset = passwordCharsets.lowercase + passwordCharsets.numbers;
        }

        let password = '';
        for (let i = 0; i < length; i++) {
            const index = this.proxy.numbers.integer({ min: 0, max: charset.length - 1 });
            password += charset[index];
        }

        return password;
    }

    /**
     * Generate a random browser user agent string
     * @param {Object} options - Options (reserved for future use)
     * @returns {string} User agent string
     */
    userAgent(_options = {}) {
        const template = pickRandom(userAgentTemplates);

        // Generate version numbers
        const majorVersion = this.proxy.numbers.integer({ min: 90, max: 130 });
        const minorVersion = this.proxy.numbers.integer({ min: 0, max: 99 });
        const version = `${majorVersion}.${minorVersion}`;

        return template.replace(/\{version\}/g, version);
    }

    /**
     * Generate a random port number (alias for network.port)
     * @param {Object} options - Options including type ('common', 'random', 'registered', 'dynamic')
     * @returns {number|Object} Port number or {port, service} if type is 'common' and includeService is true
     */
    port(options = {}) {
        return this.proxy.network.port(options);
    }

    /**
     * Generate a random HTTP method
     * @param {Object} options - Options (reserved for future use)
     * @returns {string} HTTP method
     */
    httpMethod(_options = {}) {
        return pickRandom(httpMethods);
    }

    /**
     * Generate a random HTTP status code
     * @param {Object} options - Options including type ('informational', 'success', 'redirection', 'clientError', 'serverError')
     * @returns {number|Object} Status code or {code, message} if includeMessage is true
     */
    httpStatusCode(options = {}) {
        let codes = httpStatusCodes;

        if (options.type) {
            codes = httpStatusCodes.filter(c => c.type === options.type);
        }

        const status = pickRandom(codes);

        if (options.includeMessage) {
            return { code: status.code, message: status.message };
        }

        return status.code;
    }

    /**
     * Generate a random MIME type
     * @param {Object} options - Options (reserved for future use)
     * @returns {string} MIME type
     */
    mimeType(_options = {}) {
        return pickRandom(mimeTypes);
    }
}

export default Internet;
