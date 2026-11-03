/**
 * Names module - generates random names, titles, and emails
 */

import { InterfaceResolver } from '../utils/interface-resolver.js';
import { formatString, pickRandom, pickRanked, random } from '../utils/utilities.js';
import { ValidationError } from '../errors.js';
import namesDict from './data/names/index.js';
import enGB from './data/names/en-GB.js';

// Locale name sets, each list ordered most-common-first and picked by frequency
const LOCALES = { 'en-GB': enGB };

/** The locale's name set, or undefined for the default (unweighted) data */
function localeNames(locale) {
    if (locale === undefined) {return undefined;}
    const names = LOCALES[locale];
    if (!names) {
        throw new ValidationError(`Unknown locale "${locale}". Supported: ${Object.keys(LOCALES).join(', ')}`);
    }
    return names;
}

/**
 * A ranked locale list minus its `skipTop` most common entries, e.g. to keep
 * generated people off the names real ones most often have
 */
function skipCommon(names, skipTop) {
    if (skipTop === undefined) {return names;}
    if (!Number.isInteger(skipTop) || skipTop < 0 || skipTop >= names.length) {
        throw new ValidationError(`skipTop must be an integer from 0 to ${names.length - 1}`);
    }
    return names.slice(skipTop);
}

/** Names starting with a prefix, case-insensitively (order preserved) */
function filterStartsWith(names, prefix) {
    if (!prefix) {return names;}
    return names.filter(name => name.substring(0, prefix.length).toLowerCase() === prefix.toLowerCase());
}

export class Names extends InterfaceResolver {
    static namespace = 'names';
    static methods = ['firstname', 'lastname', 'fullname', 'title', 'suffix', 'middleName', 'email'];

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
     * @param {Object} options - Options including gender ('male', 'female', 'nonbinary'), startsWith, charCase/charcase,
     *   locale ('en-GB': frequency-weighted British names), skipTop (with locale: drop the N most common)
     * @returns {string} First name
     */
    firstname(options = {}) {
        const locale = localeNames(options.locale);
        if (locale) {
            // No separate non-binary list: anything but male/female picks either at even odds
            const gender = options.gender === 'male' || options.gender === 'female'
                ? options.gender
                : (random() < 0.5 ? 'male' : 'female');
            return formatString(pickRanked(filterStartsWith(skipCommon(locale[gender], options.skipTop), options.startsWith)), options.charCase || options.charcase);
        }

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
     * @param {Object} options - Options including startsWith, charCase/charcase, locale ('en-GB'), skipTop
     * @returns {string} Last name
     */
    lastname(options = {}) {
        const locale = localeNames(options.locale);
        if (locale) {
            return formatString(pickRanked(filterStartsWith(skipCommon(locale.surnames, options.skipTop), options.startsWith)), options.charCase || options.charcase);
        }

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
     * Generate a random post-nominal suffix (PhD, MBA, etc.)
     * @param {Object} options - Options including type ('doctorate', 'masters', 'bachelors')
     * @returns {string} Post-nominal suffix
     */
    suffix(options = {}) {
        const postNominal = namesDict.postNominal;
        let suffixes;

        if (options.type && postNominal[options.type]) {
            suffixes = postNominal[options.type];
        } else {
            // Combine all suffix types
            suffixes = [
                ...postNominal.doctorate,
                ...postNominal.masters,
                ...postNominal.bachelors
            ];
        }

        return pickRandom(suffixes);
    }

    /**
     * Generate a random middle name (uses firstname logic)
     * @param {Object} options - Options including gender, startsWith, charCase
     * @returns {string} Middle name
     */
    middleName(options = {}) {
        return this.firstname(options);
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
                this.proxy.internet.tld(opts)
            ].join(''),
            charCase
        );
    }
}

export default Names;
