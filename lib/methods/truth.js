/**
 * Truth module - generates random boolean values
 */

import { InterfaceResolver } from '../utils/interface-resolver.js';
import { random } from '../utils/utilities.js';

export class Truth extends InterfaceResolver {
    static namespace = 'truth';
    static methods = ['boolean'];

    /**
     * Generate a random boolean
     * @returns {boolean} Random true or false
     */
    boolean() {
        return parseInt(random() * 2) ? true : false;
    }
}

export default Truth;
