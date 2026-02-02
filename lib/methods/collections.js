/**
 * Collections module - generates random arrays and picks from lists
 */

import { InterfaceResolver } from '../utils/interface-resolver.js';
import { random, pickRandom } from '../utils/utilities.js';
import { ValidationError } from '../errors.js';

export class Collections extends InterfaceResolver {
    static namespace = 'collections';
    static methods = ['array', 'pickone'];

    /**
     * Generate a random array of numbers
     * @param {Object} options - Options including limit
     * @returns {number[]} Array of random numbers
     */
    array(options = {}) {
        const limit = options.limit || Math.round(random() * 12);
        const arr = [];

        for (let i = 0; i < limit; i++) {
            arr.push(Math.ceil(random() * 200));
        }

        return arr;
    }

    /**
     * Pick one random item from a delimited string
     * @param {Object} options - Options including items, delimiter
     * @returns {*} Randomly picked item
     */
    pickone(options = {}) {
        let items = '';
        let delimiter = '|';

        if (options.delimiter) {
            delimiter = options.delimiter;

            if (![',', '|'].includes(delimiter.replace(/\s/g, ''))) {
                throw new ValidationError('pickone() delimiter is restricted to commas (,) or pipes (|)');
            }
        }

        if (options.items) {
            items = options.items;
        }

        const itemList = items.split(delimiter).filter(item => item);

        if (!itemList.length) {
            throw new ValidationError('No suitable items provided to pickone()');
        }

        return pickRandom(itemList);
    }
}

export default Collections;
