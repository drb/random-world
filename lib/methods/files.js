/**
 * Files module - generates random file-related data
 */

import { InterfaceResolver } from '../utils/interface-resolver.js';
import { pickRandom } from '../utils/utilities.js';
import extensions from './data/extensions.js';

export class Files extends InterfaceResolver {
    static namespace = 'files';
    static methods = ['extension', 'filename', 'filepath'];

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

    /**
     * Generate a random filename
     * @param {Object} options - Options including extension, includeExtension
     * @returns {string} Filename
     */
    filename(options = {}) {
        const includeExtension = options.includeExtension !== false;
        const ext = options.extension || this.extension();

        // Generate name using word(s)
        const wordCount = this.proxy.numbers.integer({ min: 1, max: 3 });
        const nameParts = [];

        for (let i = 0; i < wordCount; i++) {
            nameParts.push(this.proxy.strings.word({ charCase: 'lower' }));
        }

        // Choose separator style
        const separators = ['_', '-', ''];
        const separator = pickRandom(separators);
        let filename = nameParts.join(separator);

        // Optionally add a number
        if (this.proxy.truth.boolean()) {
            filename += this.proxy.numbers.integer({ min: 1, max: 999 });
        }

        if (includeExtension) {
            filename += '.' + ext;
        }

        return filename;
    }

    /**
     * Generate a random file path
     * @param {Object} options - Options including depth, platform ('unix', 'windows')
     * @returns {string} File path
     */
    filepath(options = {}) {
        const platform = options.platform || 'unix';
        const depth = options.depth || this.proxy.numbers.integer({ min: 1, max: 5 });

        const separator = platform === 'windows' ? '\\' : '/';
        const parts = [];

        // Root
        if (platform === 'windows') {
            const drives = ['C:', 'D:', 'E:'];
            parts.push(pickRandom(drives));
        }

        // Common directory names
        const dirNames = [
            'home', 'users', 'var', 'opt', 'tmp', 'etc', 'usr', 'lib',
            'data', 'documents', 'downloads', 'projects', 'src', 'app',
            'config', 'logs', 'backup', 'public', 'private', 'shared'
        ];

        for (let i = 0; i < depth; i++) {
            parts.push(pickRandom(dirNames));
        }

        // Add filename at the end
        parts.push(this.filename());

        return (platform === 'unix' ? '/' : '') + parts.join(separator);
    }
}

export default Files;
