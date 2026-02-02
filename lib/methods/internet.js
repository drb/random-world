/**
 * Internet module - generates random internet-related data
 */

import { InterfaceResolver } from '../utils/interface-resolver.js';
import { pickRandom, random } from '../utils/utilities.js';
import {
    userAgentTemplates,
    mimeTypes,
    commonPorts,
    httpMethods,
    httpStatusCodes,
    usernameAdjectives,
    usernameNouns,
    passwordCharsets
} from './data/internet.js';

export class Internet extends InterfaceResolver {
    static namespace = 'internet';
    static methods = ['username', 'password', 'userAgent', 'mac', 'port', 'httpMethod', 'httpStatusCode', 'mimeType'];

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
    userAgent(options = {}) {
        const template = pickRandom(userAgentTemplates);

        // Generate version numbers
        const majorVersion = this.proxy.numbers.integer({ min: 90, max: 130 });
        const minorVersion = this.proxy.numbers.integer({ min: 0, max: 99 });
        const version = `${majorVersion}.${minorVersion}`;

        return template.replace(/\{version\}/g, version);
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
     * @returns {number|Object} Port number or {port, service} if type is 'common'
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

    /**
     * Generate a random HTTP method
     * @param {Object} options - Options (reserved for future use)
     * @returns {string} HTTP method
     */
    httpMethod(options = {}) {
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
    mimeType(options = {}) {
        return pickRandom(mimeTypes);
    }
}

export default Internet;
