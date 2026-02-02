/**
 * random-world
 *
 * A Node.js module to generate random collections of data
 */

import { fileURLToPath } from 'url';
import { dirname, join, extname, resolve } from 'path';
import { readdirSync } from 'fs';

import RandomWorld from './lib/random-world-proxy.js';

// Get current directory in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create the random world instance
const world = new RandomWorld();

// Load method modules
const libFilter = '.js';
const libPath = resolve(join(__dirname, 'lib/methods'));
const libraries = readdirSync(libPath);

// Register each method module
for (const lib of libraries) {
    if (extname(lib) === libFilter) {
        try {
            const modulePath = join(libPath, lib);
            const { default: MethodClass } = await import(modulePath);

            if (MethodClass && typeof MethodClass === 'function') {
                world.register(new MethodClass());
            }
        } catch (e) {
            console.error(`Error loading module ${lib}:`, e);
        }
    }
}

export default world;

// Named exports for convenience
export { RandomWorld };
export { RandomWorldError, ValidationError, NotFoundError, ConfigurationError } from './lib/errors.js';
