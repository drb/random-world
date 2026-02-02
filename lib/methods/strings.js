/**
 * Strings module - generates random strings, words, UUIDs
 */

import { InterfaceResolver } from '../utils/interface-resolver.js';
import { random, pickRandom, formatString } from '../utils/utilities.js';
import lorem from './data/lorem.js';
import dictionary from './data/dictionary.js';

export class Strings extends InterfaceResolver {
    static namespace = 'strings';
    static methods = ['word', 'sentence', 'random', 'block', 'uuid'];

    /**
     * Generate a random sentence from lorem ipsum
     * @param {Object} options - Options (reserved for future use)
     * @returns {string} Random sentence
     */
    sentence(options = {}) {
        const sentences = lorem.split('.').filter(s => s.trim());
        return pickRandom(sentences);
    }

    /**
     * Generate a random string
     * @param {Object} options - Options including len, chars
     * @returns {string} Random string
     */
    random(options = {}) {
        let result = '';
        const length = options.len || 16;
        const chars = options.chars || '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

        for (let i = length; i > 0; --i) {
            result += chars[Math.round(random() * (chars.length - 1))];
        }

        return result;
    }

    /**
     * Generate a block pattern like AAA-BBB-CCC
     * @param {Object} options - Options including blockSize, delimiter, chars
     * @returns {string} Block pattern
     */
    block(options = {}) {
        const blockSize = options.blockSize || 333;
        const delimiter = options.delimiter || '-';
        const chars = options.chars || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const blocks = [];

        String(blockSize).split('').forEach(portion => {
            blocks.push(this.proxy.strings.random({
                len: parseInt(portion),
                chars: chars
            }));
        });

        return blocks.join(delimiter);
    }

    /**
     * Generate random dictionary word(s)
     * @param {Object} options - Options including language, limit, delimiter, charCase/charcase
     * @returns {string} Random word(s)
     */
    word(options = {}) {
        const language = 'english';
        const delimiter = options.delimiter || '-';
        const limit = options.limit || 1;
        const words = [];

        if (options.language) {
            throw new Error('Only English is supported in this method');
        }

        const dict = dictionary[language];

        for (let i = 0; i < limit; i++) {
            words.push(pickRandom(dict));
        }

        const charCase = options.charCase || options.charcase;
        if (options.charcase && !options.charCase) {
            console.warn('[random-world] Deprecation warning: "charcase" option is deprecated, use "charCase" instead');
        }

        return formatString(words.join(delimiter), charCase);
    }

    /**
     * Generate a UUID v4
     * @param {Object} options - Options (reserved for future use)
     * @returns {string} UUID v4
     */
    uuid(options = {}) {
        return crypto.randomUUID();
    }
}

export default Strings;
