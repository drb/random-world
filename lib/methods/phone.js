/**
 * Phone module - generates random phone-related data
 */

import { InterfaceResolver } from '../utils/interface-resolver.js';
import { pickRandom } from '../utils/utilities.js';
import { countryCodes, usAreaCodes, tacPrefixes, phoneFormats } from './data/phone.js';

export class Phone extends InterfaceResolver {
    static namespace = 'phone';
    static methods = ['number', 'areaCode', 'countryCode', 'imei'];

    /**
     * Generate a random phone number
     * @param {Object} options - Options including country, formatted
     * @returns {string} Phone number
     */
    number(options = {}) {
        const country = options.country || 'US';
        const formatted = options.formatted !== false;
        const format = phoneFormats[country] || phoneFormats.default;

        let number = '';

        if (formatted) {
            // Generate number based on format pattern
            for (const char of format) {
                if (char === '#') {
                    number += this.proxy.numbers.integer({ min: 0, max: 9 });
                } else {
                    number += char;
                }
            }
        } else {
            // Generate raw digits
            const length = options.length || 10;
            for (let i = 0; i < length; i++) {
                number += this.proxy.numbers.integer({ min: 0, max: 9 });
            }
        }

        return number;
    }

    /**
     * Generate a random area code
     * @param {Object} options - Options including country
     * @returns {string} Area code
     */
    areaCode(options = {}) {
        const country = options.country || 'US';

        if (country === 'US' || country === 'CA') {
            return pickRandom(usAreaCodes);
        }

        // Generate a generic 3-digit area code for other countries
        return String(this.proxy.numbers.integer({ min: 100, max: 999 }));
    }

    /**
     * Generate a random country calling code
     * @param {Object} options - Options including country (ISO code)
     * @returns {string} Country code (e.g., +1, +44)
     */
    countryCode(options = {}) {
        if (options.country) {
            const found = countryCodes.find(c => c.country === options.country);
            if (found) {
                return found.code;
            }
        }

        return pickRandom(countryCodes).code;
    }

    /**
     * Generate a random IMEI number with valid Luhn checksum
     * @param {Object} options - Options (reserved for future use)
     * @returns {string} 15-digit IMEI number
     */
    imei(_options = {}) {
        // IMEI is 15 digits: 8-digit TAC + 6-digit serial + 1 check digit
        const tac = pickRandom(tacPrefixes);
        let imei = tac;

        // Generate remaining digits (excluding check digit)
        const remainingLength = 14 - tac.length;
        for (let i = 0; i < remainingLength; i++) {
            imei += this.proxy.numbers.integer({ min: 0, max: 9 });
        }

        // Calculate Luhn check digit
        const checkDigit = this.calculateLuhnCheckDigit(imei);
        imei += checkDigit;

        return imei;
    }

    /**
     * Calculate the Luhn check digit for a number string
     * @param {string} digits - The digits to calculate check digit for
     * @returns {number} The check digit (0-9)
     */
    calculateLuhnCheckDigit(digits) {
        let sum = 0;
        let isDouble = true; // Start with double since we're calculating for the last position

        for (let i = digits.length - 1; i >= 0; i--) {
            let digit = parseInt(digits[i], 10);

            if (isDouble) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }

            sum += digit;
            isDouble = !isDouble;
        }

        return (10 - (sum % 10)) % 10;
    }
}

export default Phone;
