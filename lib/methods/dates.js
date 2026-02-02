/**
 * Dates module - generates random dates and times
 */

import { InterfaceResolver } from '../utils/interface-resolver.js';
import { random, pickRandom } from '../utils/utilities.js';
import { timezones } from './data/places.js';

export class Dates extends InterfaceResolver {
    static namespace = 'dates';
    static methods = ['now', 'unixtimestamp', 'date', 'dayofweek', 'day', 'year', 'month', 'time', 'hour', 'minute', 'second', 'isoDate', 'timezone'];

    /**
     * Get the current date/time
     * @param {Object} options - Options (reserved for future use)
     * @returns {Date} Current date
     */
    now(_options = {}) {
        return new Date();
    }

    /**
     * Generate a random date
     * @param {Object} options - Options including start, end, format
     * @returns {Date} Random date
     */
    date(options = {}) {
        let start = new Date();
        let end = new Date();
        let format = 'UK';

        start.setTime(start.getTime() * random());

        if (options.format) {
            format = options.format;
        }

        if (options.start) {
            let startInput = options.start;
            if (format === 'UK') {
                startInput = this.convertToUkDate(startInput);
            }
            start = new Date(startInput);
        }

        if (options.end) {
            let endInput = options.end;
            if (format === 'UK') {
                endInput = this.convertToUkDate(endInput);
            }
            end = new Date(endInput);
        }

        return new Date(start.getTime() + random() * (end.getTime() - start.getTime()));
    }

    /**
     * Get a Unix timestamp
     * @param {Object} options - Options (reserved for future use)
     * @returns {number} Unix timestamp
     */
    unixtimestamp(options = {}) {
        return Math.round(+this.now(options) / 1000);
    }

    /**
     * Get a random day of the month
     * @param {Object} options - Options for date()
     * @returns {number} Day of month (1-31)
     */
    day(options = {}) {
        return this.date(options).getDate();
    }

    /**
     * Get a random year
     * @param {Object} options - Options for date()
     * @returns {number} Year
     */
    year(options = {}) {
        return this.date(options).getFullYear();
    }

    /**
     * Get a random month name
     * @param {Object} options - Options including short
     * @returns {string} Month name
     */
    month(options = {}) {
        const months = [
            'January', 'February', 'March', 'April',
            'May', 'June', 'July', 'August', 'September',
            'October', 'November', 'December'
        ];

        let month = months[this.date(options).getMonth()];

        if (options && options.short) {
            month = month.substring(0, 3);
        }

        return month;
    }

    /**
     * Get a random day of the week name
     * @param {Object} options - Options including short
     * @returns {string} Day name
     */
    dayofweek(options = {}) {
        const days = [
            'Sunday', 'Monday', 'Tuesday', 'Wednesday',
            'Thursday', 'Friday', 'Saturday'
        ];

        const date = this.date(options);
        let day = days[date.getDay()];

        if (options && options.short) {
            day = day.substring(0, 3);
        }

        return day;
    }

    /**
     * Convert UK date format (DD/MM/YYYY) to US format
     * @param {string} dateStr - Date string in UK format
     * @returns {string} Date string in US format
     */
    convertToUkDate(dateStr) {
        const ukDate = dateStr.split('/');
        return [ukDate[1], ukDate[0], ukDate[2]].join('/');
    }

    /**
     * Generate a random time string
     * @param {Object} options - Options including format24 (boolean)
     * @returns {string} Time in HH:MM:SS format
     */
    time(options = {}) {
        const h = this.hour(options);
        const m = this.minute();
        const s = this.second();

        const hStr = String(h).padStart(2, '0');
        const mStr = String(m).padStart(2, '0');
        const sStr = String(s).padStart(2, '0');

        return `${hStr}:${mStr}:${sStr}`;
    }

    /**
     * Generate a random hour
     * @param {Object} options - Options including format24 (boolean, default true)
     * @returns {number} Hour (0-23 or 1-12)
     */
    hour(options = {}) {
        const format24 = options.format24 !== false;

        if (format24) {
            return this.proxy.numbers.integer({ min: 0, max: 23 });
        }

        return this.proxy.numbers.integer({ min: 1, max: 12 });
    }

    /**
     * Generate a random minute
     * @param {Object} options - Options (reserved for future use)
     * @returns {number} Minute (0-59)
     */
    minute(_options = {}) {
        return this.proxy.numbers.integer({ min: 0, max: 59 });
    }

    /**
     * Generate a random second
     * @param {Object} options - Options (reserved for future use)
     * @returns {number} Second (0-59)
     */
    second(_options = {}) {
        return this.proxy.numbers.integer({ min: 0, max: 59 });
    }

    /**
     * Generate a random date in ISO 8601 format
     * @param {Object} options - Options including includeTime
     * @returns {string} ISO 8601 date string
     */
    isoDate(options = {}) {
        const date = this.date(options);
        const includeTime = options.includeTime !== false;

        if (includeTime) {
            return date.toISOString();
        }

        return date.toISOString().split('T')[0];
    }

    /**
     * Generate a random timezone identifier
     * @param {Object} options - Options (reserved for future use)
     * @returns {string} Timezone identifier
     */
    timezone(_options = {}) {
        return pickRandom(timezones);
    }
}

export default Dates;
