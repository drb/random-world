/**
 * Places module - generates random places data
 */

import { InterfaceResolver } from '../utils/interface-resolver.js';
import { pickRandom } from '../utils/utilities.js';
import { NotFoundError } from '../errors.js';
import countries from './data/countries.js';
import cities from './data/cities.js';

export class Places extends InterfaceResolver {
    static namespace = 'places';
    static methods = ['street', 'city', 'country', 'countrycode'];

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
}

export default Places;
