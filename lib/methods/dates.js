/**
 * Dates module - generates random dates and times
 */

import { InterfaceResolver } from '../utils/interface-resolver.js';
import { random } from '../utils/utilities.js';

export class Dates extends InterfaceResolver {
    static namespace = 'dates';
    static methods = ['now', 'unixtimestamp', 'date', 'dayofweek', 'day', 'year', 'month'];

    /**
     * Get the current date/time
     * @param {Object} options - Options (reserved for future use)
     * @returns {Date} Current date
     */
    now(options = {}) {
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
}

export default Dates;
