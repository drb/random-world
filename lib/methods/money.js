/**
 * Money module - generates random credit card and financial data
 */

import { InterfaceResolver } from '../utils/interface-resolver.js';
import { random, pickRandom } from '../utils/utilities.js';
import { NotFoundError } from '../errors.js';
import cards from './data/ccards.js';

export class Money extends InterfaceResolver {
    static namespace = 'money';
    static methods = ['ccnumber', 'ccstart', 'ccexpiry', 'cctype', 'cvv', 'cv2'];

    /**
     * Generate a valid credit card number using Luhn algorithm
     * @param {Object} options - Options including shortName, hasHyphens
     * @returns {string} Credit card number
     */
    ccnumber(options = {}) {
        let cardDefaults = pickRandom(cards);
        let hasHyphens = false;

        if (options.shortName) {
            cardDefaults = cards.find(card => card.shortName === options.shortName);
        }

        if (Object.hasOwn(options, 'hasHyphens')) {
            hasHyphens = options.hasHyphens;
        }

        if (!cardDefaults) {
            throw new NotFoundError('No card found with supplied shortName');
        }

        const startsWith = pickRandom(cardDefaults.startsWith);
        const len = pickRandom(cardDefaults.len);

        let number = startsWith.toString();

        while (number.length < (len - 1)) {
            number += Math.floor(random() * 10).toString();
        }

        const check = this.calculateCheckDigit(number);
        number += check;

        if (hasHyphens) {
            number = number.match(/.{1,4}/g).join('-');
        }

        return number;
    }

    /**
     * Calculate Luhn check digit
     * @param {string} string - Card number without check digit
     * @returns {string} Check digit
     */
    calculateCheckDigit(string) {
        let checksum = 0;
        const isOdd = (string.length % 2) === 0;

        string.split('').reverse().forEach((val, idx) => {
            let digit = +val;

            if ((idx + (isOdd ? 0 : 1)) % 2) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }
            checksum += digit;
        });

        if (checksum !== 0) {
            checksum = 10 - (checksum % 10);
            if (checksum === 10) {
                checksum = 0;
            }
        }

        return checksum.toString();
    }

    /**
     * Generate a random card expiry date
     * @param {Object} options - Options (reserved for future use)
     * @returns {string} Expiry date (MM/YY)
     */
    ccexpiry(options = {}) {
        return this.getRandomDate(options);
    }

    /**
     * Generate a random card start date
     * @param {Object} options - Options (reserved for future use)
     * @returns {string} Start date (MM/YY)
     */
    ccstart(options = {}) {
        return this.getRandomDate(options);
    }

    /**
     * Generate a random MM/YY date
     * @param {Object} options - Options (reserved for future use)
     * @returns {string} Date (MM/YY)
     */
    getRandomDate(options = {}) {
        const defaults = {
            padding: 2,
            round: true,
            min: 1,
            max: 12,
            separator: '/'
        };

        const month = this.proxy.numbers.integer(defaults);
        const year = this.proxy.numbers.integer(defaults);

        return [month, year].join(defaults.separator);
    }

    /**
     * Get a random card type name
     * @returns {string} Card type name
     */
    cctype() {
        return pickRandom(cards).name;
    }

    /**
     * Generate a random CVV
     * @returns {string} 3-digit CVV
     */
    cvv() {
        return this.proxy.numbers.integer({
            min: 0,
            max: 999,
            padding: 3,
            round: true
        });
    }

    /**
     * Alias for cvv
     * @returns {string} 3-digit CV2
     */
    cv2() {
        return this.cvv();
    }
}

export default Money;
