/**
 * Colors module - generates random color data
 */

import { InterfaceResolver } from '../utils/interface-resolver.js';
import { pickRandom } from '../utils/utilities.js';
import cssColors from './data/colors.js';

export class Colors extends InterfaceResolver {
    static namespace = 'colors';
    static methods = ['hex', 'rgb', 'hsl', 'name'];

    /**
     * Generate a random hex color
     * @param {Object} options - Options including includeHash
     * @returns {string} Hex color (e.g., #FF5733 or FF5733)
     */
    hex(options = {}) {
        const includeHash = options.includeHash !== false;

        const r = this.proxy.numbers.integer({ min: 0, max: 255 });
        const g = this.proxy.numbers.integer({ min: 0, max: 255 });
        const b = this.proxy.numbers.integer({ min: 0, max: 255 });

        const hex = [r, g, b]
            .map(c => c.toString(16).padStart(2, '0').toUpperCase())
            .join('');

        return includeHash ? `#${hex}` : hex;
    }

    /**
     * Generate a random RGB color
     * @param {Object} options - Options including format ('object' or 'string')
     * @returns {Object|string} RGB color as object {r, g, b} or string "rgb(r,g,b)"
     */
    rgb(options = {}) {
        const format = options.format || 'object';

        const r = this.proxy.numbers.integer({ min: 0, max: 255 });
        const g = this.proxy.numbers.integer({ min: 0, max: 255 });
        const b = this.proxy.numbers.integer({ min: 0, max: 255 });

        if (format === 'string') {
            return `rgb(${r}, ${g}, ${b})`;
        }

        return { r, g, b };
    }

    /**
     * Generate a random HSL color
     * @param {Object} options - Options including format ('object' or 'string')
     * @returns {Object|string} HSL color as object {h, s, l} or string "hsl(h, s%, l%)"
     */
    hsl(options = {}) {
        const format = options.format || 'object';

        const h = this.proxy.numbers.integer({ min: 0, max: 360 });
        const s = this.proxy.numbers.integer({ min: 0, max: 100 });
        const l = this.proxy.numbers.integer({ min: 0, max: 100 });

        if (format === 'string') {
            return `hsl(${h}, ${s}%, ${l}%)`;
        }

        return { h, s, l };
    }

    /**
     * Generate a random CSS color name
     * @param {Object} options - Options including includeHex
     * @returns {string|Object} Color name or {name, hex} if includeHex is true
     */
    name(options = {}) {
        const color = pickRandom(cssColors);

        if (options.includeHex) {
            return {
                name: color.name,
                hex: color.hex
            };
        }

        return color.name;
    }
}

export default Colors;
