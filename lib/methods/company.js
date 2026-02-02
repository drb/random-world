/**
 * Company module - generates random company-related data
 */

import { InterfaceResolver } from '../utils/interface-resolver.js';
import { pickRandom } from '../utils/utilities.js';
import {
    namePrefix,
    nameRoot,
    suffixes,
    industries,
    departments,
    jobLevels,
    buzzwordVerbs,
    buzzwordAdjectives,
    buzzwordNouns
} from './data/company.js';

export class Company extends InterfaceResolver {
    static namespace = 'company';
    static methods = ['name', 'suffix', 'industry', 'department', 'catchPhrase', 'jobTitle'];

    /**
     * Generate a random company name
     * @param {Object} options - Options including includeSuffix
     * @returns {string} Company name
     */
    name(options = {}) {
        const includeSuffix = options.includeSuffix !== false;
        const style = options.style || 'combined';

        let companyName;

        switch (style) {
            case 'prefix':
                // e.g., "Global Systems"
                companyName = `${pickRandom(namePrefix)} ${pickRandom(nameRoot)}`;
                break;
            case 'root':
                // e.g., "Systems Technologies"
                companyName = `${pickRandom(nameRoot)} ${pickRandom(nameRoot)}`;
                break;
            case 'person':
                // e.g., "Smith & Associates"
                companyName = `${this.proxy.names.lastname()} & ${pickRandom(['Associates', 'Partners', 'Sons', 'Brothers', 'Company', 'Group'])}`;
                break;
            case 'combined':
            default:
                // e.g., "Global Tech Solutions" or "Smith Technologies"
                const usePersonName = this.proxy.truth.boolean();
                if (usePersonName) {
                    companyName = `${this.proxy.names.lastname()} ${pickRandom(nameRoot)}`;
                } else {
                    companyName = `${pickRandom(namePrefix)} ${pickRandom(nameRoot)}`;
                }
                break;
        }

        if (includeSuffix) {
            companyName += ` ${this.suffix()}`;
        }

        return companyName;
    }

    /**
     * Generate a random company suffix
     * @param {Object} options - Options (reserved for future use)
     * @returns {string} Company suffix (LLC, Inc, Corp, etc.)
     */
    suffix(_options = {}) {
        return pickRandom(suffixes);
    }

    /**
     * Generate a random industry/sector name
     * @param {Object} options - Options (reserved for future use)
     * @returns {string} Industry name
     */
    industry(_options = {}) {
        return pickRandom(industries);
    }

    /**
     * Generate a random department name
     * @param {Object} options - Options (reserved for future use)
     * @returns {string} Department name
     */
    department(_options = {}) {
        return pickRandom(departments);
    }

    /**
     * Generate a random business catch phrase
     * @param {Object} options - Options (reserved for future use)
     * @returns {string} Catch phrase
     */
    catchPhrase(_options = {}) {
        const verb = pickRandom(buzzwordVerbs);
        const adjective = pickRandom(buzzwordAdjectives);
        const noun = pickRandom(buzzwordNouns);

        // Capitalize verb
        const capitalizedVerb = verb.charAt(0).toUpperCase() + verb.slice(1);

        return `${capitalizedVerb} ${adjective} ${noun}`;
    }

    /**
     * Generate a random job title
     * @param {Object} options - Options including level ('executive', 'management', 'individual')
     * @returns {string} Job title
     */
    jobTitle(options = {}) {
        let titles;

        if (options.level && jobLevels[options.level]) {
            titles = jobLevels[options.level];
        } else {
            // Combine all levels
            titles = [
                ...jobLevels.executive,
                ...jobLevels.management,
                ...jobLevels.individual
            ];
        }

        const title = pickRandom(titles);

        // For individual/management titles, optionally add department context
        if (options.includeDepartment && (options.level === 'individual' || options.level === 'management' || !options.level)) {
            const dept = this.department();
            return `${title} of ${dept}`;
        }

        return title;
    }
}

export default Company;
