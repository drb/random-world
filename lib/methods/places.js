/**
 * Places module - generates random places data
 */

import { InterfaceResolver } from '../utils/interface-resolver.js';
import { pickRandom } from '../utils/utilities.js';
import { NotFoundError } from '../errors.js';
import countries from './data/countries.js';
import cities from './data/cities.js';
import { usStates, canadianProvinces, postalCodeFormats } from './data/places.js';

export class Places extends InterfaceResolver {
    static namespace = 'places';
    static methods = ['street', 'city', 'country', 'countrycode', 'state', 'postalCode', 'fullAddress'];

    /**
     * Generate a random street address
     * @returns {string} Street address
     */
    street() {
        const number = this.proxy.numbers.integer({ min: 1, max: 200 });
        const name = this.proxy.strings.word({ charCase: 'sentence' });
        const types = [
            'Street', 'Avenue', 'Boulevard', 'Crescent', 'Place',
            'Close', 'Grange', 'Road', 'Mews', 'Court', 'Way', 'Lane',
            'Heights', 'Walk', 'Vale', 'Plaza', 'Quay', 'Parade', 'Hill',
            'Square', 'Parkway', 'Park', 'Promenade'
        ];

        return [number, name, pickRandom(types)].join(' ');
    }

    /**
     * Generate a random city name
     * @param {Object} options - Options including country
     * @returns {string} City name
     */
    city(options = {}) {
        const countryKeys = Object.keys(cities);
        let country;

        if (options && options.country) {
            country = options.country;
        } else {
            country = pickRandom(countryKeys);
        }

        if (country && cities[country]) {
            const cityList = cities[country].filter(c => c);
            return pickRandom(cityList);
        } else {
            throw new NotFoundError('No such city');
        }
    }

    /**
     * Generate a random country name
     * @param {Object} options - Options (reserved for future use)
     * @returns {string} Country name
     */
    country(options = {}) {
        return pickRandom(countries).name;
    }

    /**
     * Generate a random country code
     * @param {Object} options - Options (reserved for future use)
     * @returns {string} Country code (ISO 2-letter)
     */
    countrycode(options = {}) {
        return pickRandom(countries).code;
    }

    /**
     * Generate a random state or province
     * @param {Object} options - Options including country ('US', 'CA'), abbreviated
     * @returns {string|Object} State name or {name, abbr} if full is true
     */
    state(options = {}) {
        const country = options.country || 'US';
        let states;

        if (country === 'CA') {
            states = canadianProvinces;
        } else {
            states = usStates;
        }

        const state = pickRandom(states);

        if (options.abbreviated) {
            return state.abbr;
        }

        if (options.full) {
            return { name: state.name, abbr: state.abbr };
        }

        return state.name;
    }

    /**
     * Generate a random postal/ZIP code
     * @param {Object} options - Options including country
     * @returns {string} Postal code
     */
    postalCode(options = {}) {
        const country = options.country || 'US';
        const format = postalCodeFormats[country] || postalCodeFormats.default;

        let result = '';
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        for (const char of format) {
            if (char === '#') {
                result += this.proxy.numbers.integer({ min: 0, max: 9 });
            } else if (char === 'A') {
                result += letters[this.proxy.numbers.integer({ min: 0, max: 25 })];
            } else if (char === '?') {
                // Alphanumeric
                const useNumber = this.proxy.truth.boolean();
                if (useNumber) {
                    result += this.proxy.numbers.integer({ min: 0, max: 9 });
                } else {
                    result += letters[this.proxy.numbers.integer({ min: 0, max: 25 })];
                }
            } else {
                result += char;
            }
        }

        return result;
    }

    /**
     * Generate a full address string
     * @param {Object} options - Options including country
     * @returns {string} Full address
     */
    fullAddress(options = {}) {
        const country = options.country || 'US';

        const street = this.street();
        let cityName;

        try {
            cityName = this.city({ country });
        } catch {
            cityName = this.city();
        }

        const parts = [street, cityName];

        // Add state for US/CA
        if (country === 'US' || country === 'CA') {
            parts.push(this.state({ country, abbreviated: true }));
        }

        parts.push(this.postalCode({ country }));

        return parts.join(', ');
    }
}

export default Places;
