/**
 * Utility functions for random-world
 */

import seedrandom from 'seedrandom';
import { RANDOM_SEED } from './constants.js';

const rnd = seedrandom(RANDOM_SEED, { entropy: true });

/**
 * Get a random number using seeded randomization with entropy
 * @returns {number} Random number between 0 and 1
 */
export function random() {
    return rnd();
}

/**
 * Pad a number with leading zeroes to achieve the specified length
 * @param {number|string} number - The number to pad
 * @param {number} length - Target string length (default: 3)
 * @returns {string} Zero-padded number string
 */
export function padNumber(number, length = 3) {
    return String(number).padStart(length, '0');
}

/**
 * Convert a string to sentence case (capitalize first letter of each word)
 * @param {string} str - The string to convert
 * @returns {string} Sentence-cased string
 */
export function sentenceCase(str) {
    return str
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

/**
 * Format a string according to the specified case
 * @param {string} string - The string to format
 * @param {string} charCase - Case type: 'upper', 'lower', or 'sentence'
 * @returns {string} Formatted string
 */
export function formatString(string, charCase) {
    if (!charCase) {
        return string;
    }

    switch (charCase) {
        case 'upper':
            return (string || '').toUpperCase();
        case 'lower':
            return (string || '').toLowerCase();
        case 'sentence':
            return sentenceCase(string);
        default:
            return string;
    }
}

/**
 * Pick a random item from an array
 * @param {Array} array - The array to pick from
 * @returns {*} A random item from the array
 */
export function pickRandom(array) {
    const index = Math.floor(rnd() * array.length);
    return array[index];
}

/**
 * Validate a credit card number using the Luhn mod 10 algorithm
 * @param {string} str - The credit card number string
 * @returns {boolean} True if valid
 */
export function luhnModCheck(str) {
    return str.split('').reduceRight((prev, curr, idx) => {
        prev = parseInt(prev, 10);
        if ((idx + 1) % 2 !== 0) {
            curr = String(curr * 2)
                .split('')
                .reduce((p, c) => parseInt(p, 10) + parseInt(c, 10));
        }
        return prev + parseInt(curr, 10);
    }) % 10 === 0;
}

/**
 * Sign output with class name (legacy support)
 * @param {string} clsName - Class name
 * @param {Object} object - The object to sign
 * @returns {Object} Extended object with class name property
 */
export function signOutput(clsName, object) {
    const output = {};
    output[clsName] = object;
    return { ...output, ...object };
}

/**
 * Set checker utilities for computing combinations and permutations
 */
export const setChecker = (() => {
    function factorialPermutations(num, den) {
        if (den > num) {return 0;}
        let t = 1;
        while (num > den) {
            t *= num--;
        }
        return t;
    }

    function factorialCombinations(n, k1, k2) {
        if (k1 < k2) {
            [k1, k2] = [k2, k1];
        }

        if (k1 > n) {return 0;}

        let t = 1;
        while (k2 > 1) {
            t *= k2--;
        }

        let t2 = 1;
        while (n > k1) {
            t2 *= n--;
        }

        return t2 / t;
    }

    function permutations(n, r) {
        return factorialPermutations(n, n - r);
    }

    function combinations(n, r) {
        if (r === 0 || r === n) {return 1;}
        if (r > n || r < 0) {return 0;}
        return factorialCombinations(n, r, n - r);
    }

    return { combinations, permutations };
})();

export default {
    random,
    pickRandom,
    padNumber,
    formatString,
    luhnModCheck,
    signOutput,
    setChecker
};
