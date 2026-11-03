/**
 * Utility functions for random-world
 */

import seedrandom from 'seedrandom';
import { RANDOM_SEED } from './constants.js';

const defaultRandom = () => seedrandom(RANDOM_SEED, { entropy: true });

let rnd = defaultRandom();

/**
 * Get a random number in [0, 1) from the active source (seeded by default, see setRandom)
 * @returns {number} Random number between 0 (inclusive) and 1 (exclusive)
 */
export function random() {
    return rnd();
}

/**
 * Replace the random source every generator draws from, e.g. a CSPRNG:
 *   setRandom(() => crypto.randomBytes(6).readUIntBE(0, 6) / 2 ** 48)
 * Call with no argument to restore the default seeded source.
 * @param {() => number} [fn] - Returns a number in [0, 1)
 */
export function setRandom(fn) {
    if (fn === undefined) {
        rnd = defaultRandom();
        return;
    }
    if (typeof fn !== 'function') {
        throw new TypeError('setRandom expects a function returning a number in [0, 1)');
    }
    rnd = fn;
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

// Cumulative Zipf weights per ranked array, so repeat picks are a binary search
const rankedWeights = new WeakMap();

/**
 * Pick from an array ordered most-common-first, weighting item i by 1 / (i + 1)
 * (Zipf's law, a close fit for name frequencies). Common items come up often,
 * rare ones still appear.
 * @param {Array} array - Items ordered by descending frequency
 * @returns {*} A frequency-weighted item from the array
 */
export function pickRanked(array) {
    if (array.length === 0) {return undefined;}
    let cumulative = rankedWeights.get(array);
    if (!cumulative) {
        cumulative = [];
        let total = 0;
        for (let i = 0; i < array.length; i++) {
            total += 1 / (i + 1);
            cumulative.push(total);
        }
        rankedWeights.set(array, cumulative);
    }
    const target = rnd() * cumulative[cumulative.length - 1];
    let lo = 0;
    let hi = cumulative.length - 1;
    while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (cumulative[mid] > target) {hi = mid;} else {lo = mid + 1;}
    }
    return array[lo];
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
