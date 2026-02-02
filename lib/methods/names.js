/**
 * Names module - generates random names, titles, and emails
 */

import { InterfaceResolver } from '../utils/interface-resolver.js';
import { formatString, pickRandom } from '../utils/utilities.js';
import namesDict from './data/names/index.js';

export class Names extends InterfaceResolver {
    static namespace = 'names';
    static methods = ['firstname', 'lastname', 'fullname', 'title', 'email'];

    /**
     * Generate a full name (first + last)
     * @param {Object} options - Options for name generation
     * @returns {string} Full name
     */
    fullname(options = {}) {
        return [
            this.firstname(options),
            this.lastname(options)
        ].join(' ');
    }

    /**
     * Generate a first name
     * @param {Object} options - Options including gender ('male', 'female', 'nonbinary'), startsWith, charCase/charcase
     * @returns {string} First name
     */
    firstname(options = {}) {
        let foreNames;

        if (options.gender) {
            foreNames = namesDict[options.gender];
        } else {
            foreNames = namesDict.female.concat(namesDict.male).concat(namesDict.nonbinary);
        }

        if (options.startsWith) {
            foreNames = foreNames.filter(foreName =>
                foreName.substring(0, options.startsWith.length).toLowerCase() ===
                options.startsWith.toLowerCase()
            );
        }

        const charCase = options.charCase || options.charcase;
        if (options.charcase && !options.charCase) {
            console.warn('[random-world] Deprecation warning: "charcase" option is deprecated, use "charCase" instead');
        }

        return formatString(pickRandom(foreNames), charCase);
    }

    /**
     * Generate a last name
     * @param {Object} options - Options including startsWith, charCase/charcase
     * @returns {string} Last name
     */
    lastname(options = {}) {
        let surnames = namesDict.surnames;

        if (options.startsWith) {
            surnames = surnames.filter(surname =>
                surname.substring(0, options.startsWith.length).toLowerCase() ===
                options.startsWith.toLowerCase()
            );
        }

        const charCase = options.charCase || options.charcase;
        if (options.charcase && !options.charCase) {
            console.warn('[random-world] Deprecation warning: "charcase" option is deprecated, use "charCase" instead');
        }

        return formatString(pickRandom(surnames), charCase);
    }

    /**
     * Generate a random title (Mr, Mrs, Mx, Dr, etc.)
     * @param {Object} options - Options including gender ('male', 'female', 'nonbinary')
     * @returns {string} Title
     */
    title(options = {}) {
        let titles = namesDict.titles;

        if (options.gender) {
            // Map gender option to title gender codes
            // M = male, F = female, N = non-binary, U = unisex (always included)
            const genderMap = {
                male: 'M',
                female: 'F',
                nonbinary: 'N'
            };
            const genderCode = genderMap[options.gender];

            if (genderCode) {
                titles = titles.filter(t => t.gender === genderCode || t.gender === 'U');
            }
        }

        const title = pickRandom(titles);
        return title.name;
    }

    /**
     * Generate a random email address
     * @param {Object} options - Options including hasDot, hasPlusAddress, charCase/charcase
     * @returns {string} Email address
     */
    email(options = {}) {
        const opts = {
            charCase: 'lower',
            charcase: 'lower',
            ...options
        };

        const charCase = opts.charCase || opts.charcase;

        return formatString(
            [
                this.firstname(opts),
                (opts.hasDot ? '.' : ''),
                this.lastname(opts),
                (opts.hasPlusAddress ? '+' + this.proxy.strings.word() : ''),
                '@',
                this.proxy.strings.word(),
                '.',
                this.proxy.network.tld(opts)
            ].join(''),
            charCase
        );
    }
}

export default Names;
