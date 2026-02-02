/**
 * Files module - generates random file-related data
 */

import { InterfaceResolver } from '../utils/interface-resolver.js';
import { pickRandom } from '../utils/utilities.js';
import extensions from './data/extensions.js';

export class Files extends InterfaceResolver {
    static namespace = 'files';
    static methods = ['extension'];

    /**
     * Generate a random file extension
     * @param {Object} options - Options including includeDot
     * @returns {string} File extension
     */
    extension(options = {}) {
        let ext = pickRandom(extensions);

        if (options.includeDot) {
            ext = '.' + ext;
        }

        return ext;
    }
}

export default Files;
