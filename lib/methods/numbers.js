/**
 * Numbers module - generates random numbers
 */

import { InterfaceResolver } from '../utils/interface-resolver.js';
import { random, padNumber } from '../utils/utilities.js';
import { ValidationError } from '../errors.js';

export class Numbers extends InterfaceResolver {
    static namespace = 'numbers';
    static methods = ['integer', 'number', 'float', 'sum'];

    /**
     * Generate a random integer
     * @param {Object} options - Options including min, max, padding, round, asString
     * @returns {number|string} Random integer (string if padding or asString)
     */
    integer(options = {}) {
        let max = 10000000;
        let min = 0;
        let padding = false;
        let round = true;
        let asString = false;

        if (Object.hasOwn(options, 'max') && !Number.isNaN(+options.max)) {
            max = +options.max;
        }

        if (Object.hasOwn(options, 'min') && !Number.isNaN(+options.min)) {
            min = +options.min;
        }

        if (Object.hasOwn(options, 'round')) {
            round = options.round;
        }

        if (Object.hasOwn(options, 'padding')) {
            padding = options.padding;
        }

        if (Object.hasOwn(options, 'asString')) {
            asString = options.asString;
        }

        if (max === min) {
            throw new ValidationError('Maximum and minimum values are identical (default min = 0).');
        }

        let integer = (random() * (max - min)) + min;

        if (round) {
            integer = Math.ceil(integer);
        }

        // Return string if padding specified or asString is true
        if (padding) {
            return padNumber(integer, padding);
        }

        // Always return number unless asString is explicitly true
        if (asString) {
            return String(integer);
        }

        return integer;
    }

    /**
     * Alias for integer
     * @param {Object} options - Same as integer()
     * @returns {number|string} Random number
     */
    number(options = {}) {
        return this.integer(options);
    }

    /**
     * Generate a random float
     * @param {Object} options - Same as integer() but round defaults to false
     * @returns {number} Random float
     */
    float(options = {}) {
        return this.integer({ ...options, round: false });
    }

    /**
     * Generate a set of numbers that sum to a defined total
     * @param {Object} options - Options including count, max
     * @returns {number[]} Array of numbers
     */
    sum(options = {}) {
        const n = options.count;
        const t = options.max;
        const maxPossible = n * (n + 1) / 2;
        const list = [];
        let sum = 0;

        if (t < maxPossible) {
            throw new ValidationError('Range error');
        }

        for (let i = 0; i < n; i++) {
            const r = random();
            list.push(r);
            sum += r;
        }

        const factor = t / sum;
        sum = 0;

        for (let i = 1; i < n; i++) {
            list[i] = parseInt(factor * list[i]);
            sum += list[i];
        }

        list[0] = t - sum;

        return list;
    }
}

export default Numbers;
