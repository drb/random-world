/**
 * Object Parser module - generates data from mock object templates
 */

import { InterfaceResolver } from '../utils/interface-resolver.js';
import { random } from '../utils/utilities.js';
import { ValidationError, ConfigurationError } from '../errors.js';

let methods;

export class ObjectParser extends InterfaceResolver {
    static namespace = 'object';
    static methods = ['fromMock', 'fromObject', 'tokenize', 'collection'];

    /**
     * Tokenize a value with random data
     * @param {string} key - The key being processed
     * @param {Object} struct - The structure containing the key
     * @param {Object} lockedRefs - Locked references for $$ tokens
     * @returns {Object} Tokenized value and refs
     */
    tokenize(key, struct, lockedRefs = {}) {
        const str = struct[key];
        let tokenizedValue = str;
        const re = /(\$+)([a-zA-Z0-9]+)(\{([a-zA-Z0-9\.\\<>\|\+\/\-\,\\\"\:\ ]+)\})?/g;
        const refs = { ...lockedRefs };
        let tag;
        let match;

        while ((match = re.exec(str)) !== null) {
            const refLocked = match[1].length > 1;
            tag = match[2] || false;
            let options = {};

            if (match[3]) {
                try {
                    options = JSON.parse(match[3]);
                } catch (e) {
                    console.log(e);
                }
            }

            try {
                let libOut;

                if (refLocked && Object.hasOwn(refs, tag)) {
                    libOut = refs[tag];
                } else {
                    libOut = methods[tag](options);
                    refs[tag] = libOut;
                }

                if (match) {
                    tokenizedValue = tokenizedValue.replace(match[0], libOut);
                }
            } catch (e) {
                try {
                    console.error('Error calling method %s with options %s [%s]', tag, JSON.stringify(options || {}), e);
                } catch {
                    // Ignore JSON stringify errors
                }
            }
        }

        try {
            if (tag === 'integer' && !Number.isNaN(+tokenizedValue)) {
                tokenizedValue = parseInt(tokenizedValue);
            }

            if (tag === 'array') {
                tokenizedValue = tokenizedValue.split(',').map(item => {
                    if (!Number.isNaN(+item)) {
                        return +item;
                    }
                    return item;
                });
            }
        } catch (e) {
            console.log('failed', e);
        }

        return {
            tokenizedValue,
            refs,
            tag
        };
    }

    /**
     * Process collections
     * @param {Object} output - Output object to populate
     * @param {Object} collections - Collection definitions
     */
    collection(output, collections) {
        const structCollections = Object.keys(collections);

        structCollections.forEach(collection => {
            let maxMembers = Math.ceil(random() * 12);
            let collectionMembers = [];
            const struct = { ...collections[collection].struct };
            const type = collections[collection].type;
            const pagination = collections[collection].pagination || false;
            let refs = {};

            if (pagination && pagination.limit) {
                maxMembers = pagination.limit;
            }

            if (!type || type === 'collection') {
                for (let i = 0; i < maxMembers; i++) {
                    refs = {};
                    const data = {};

                    Object.keys(struct).forEach(key => {
                        const token = this.tokenize(key, struct, refs);
                        data[key] = token.tokenizedValue;
                        refs = token.refs;
                    });

                    collectionMembers.push(data);
                }
            } else if (type === 'object') {
                collectionMembers = {};
                Object.keys(struct).forEach(key => {
                    const token = this.tokenize(key, struct, refs);
                    collectionMembers[key] = token.tokenizedValue;
                    refs = token.refs;
                });
            }

            output[collection] = collectionMembers;
        });
    }

    /**
     * Generate data from an object template
     * @param {Object} sig - Signature/methods object
     * @param {Object|string} mock - Mock template
     * @returns {Object|Array} Generated data
     */
    fromObject(sig, mock) {
        let output;
        let refs = {};

        methods = sig;

        if (!mock) {
            throw new ConfigurationError('The mock object is undefined. Cannot continue.');
        }

        if (typeof mock !== 'object') {
            try {
                mock = JSON.parse(mock);
            } catch (e) {
                throw new ValidationError(`The mock data provided was not parseable. Is it valid JSON? [${e}]`);
            }
        }

        switch (mock.type) {
            case 'object':
                output = {};
                Object.keys(mock.struct).forEach(key => {
                    const token = this.tokenize(key, mock.struct, refs);
                    output[key] = token.tokenizedValue;
                    refs = token.refs;
                });
                break;

            case 'collection':
                output = [];
                const pagination = mock.pagination;

                if (!pagination) {
                    throw new ConfigurationError('Cannot define a collection without a pagination object being set.');
                }

                for (let i = 0; i < pagination.limit; i++) {
                    const data = {};

                    Object.keys(mock.struct).forEach(key => {
                        const token = this.tokenize(key, mock.struct, refs);
                        data[key] = token.tokenizedValue;
                        refs = token.refs;
                    });
                    output.push(data);
                }
                break;
        }

        if (mock.collections && Object.keys(mock.collections).length > 0) {
            if (mock.type === 'object') {
                this.collection(output, mock.collections);
            }

            if (mock.type === 'collection') {
                output.forEach(out => {
                    this.collection(out, mock.collections);
                });
            }
        }

        return output;
    }

    /**
     * Alias for fromObject
     * @param {Object} sig - Signature/methods object
     * @param {Object|string} mock - Mock template
     * @returns {Object|Array} Generated data
     */
    fromMock(sig, mock) {
        return this.fromObject(sig, mock);
    }
}

export default ObjectParser;
