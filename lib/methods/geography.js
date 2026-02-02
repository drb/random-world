/**
 * Geography module - generates random geographical coordinates
 */

import { InterfaceResolver } from '../utils/interface-resolver.js';
import { random } from '../utils/utilities.js';

export class Geography extends InterfaceResolver {
    static namespace = 'geo';
    static methods = ['latlong', 'lat', 'long'];

    /**
     * Generate a random latitude or longitude
     * @param {Object} options - Options (reserved for future use)
     * @returns {number} Coordinate value
     */
    generateLatLong(_options = {}) {
        let num = random() * 180;
        const posOrNeg = Math.floor(random() * 2);

        if (posOrNeg === 0) {
            num = num * -1;
        }

        return parseFloat(num.toFixed(6));
    }

    /**
     * Generate a random lat/long pair
     * @param {Object} options - Options (reserved for future use)
     * @returns {Object} Object with lat and long properties
     */
    latlong(options = {}) {
        return {
            lat: this.generateLatLong(options),
            long: this.generateLatLong(options)
        };
    }

    /**
     * Generate a random longitude
     * @param {Object} options - Options (reserved for future use)
     * @returns {number} Longitude
     */
    long(options = {}) {
        return this.latlong(options).long;
    }

    /**
     * Generate a random latitude
     * @param {Object} options - Options (reserved for future use)
     * @returns {number} Latitude
     */
    lat(options = {}) {
        return this.latlong(options).lat;
    }
}

export default Geography;
