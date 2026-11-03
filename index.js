/**
 * random-world
 *
 * A Node.js module to generate random collections of data
 *
 * Method modules are imported statically (no top-level await), so CommonJS
 * code can require() this package on Node versions with require(esm).
 */

import RandomWorld from './lib/random-world-proxy.js';
import { setRandom } from './lib/utils/utilities.js';

import Collections from './lib/methods/collections.js';
import Colors from './lib/methods/colors.js';
import Company from './lib/methods/company.js';
import Dates from './lib/methods/dates.js';
import Files from './lib/methods/files.js';
import Geography from './lib/methods/geography.js';
import Internet from './lib/methods/internet.js';
import Money from './lib/methods/money.js';
import Names from './lib/methods/names.js';
import Network from './lib/methods/network.js';
import Numbers from './lib/methods/numbers.js';
import ObjectParser from './lib/methods/object-parser.js';
import Phone from './lib/methods/phone.js';
import Places from './lib/methods/places.js';
import Strings from './lib/methods/strings.js';
import Truth from './lib/methods/truth.js';

const METHOD_CLASSES = [
    Collections, Colors, Company, Dates, Files, Geography, Internet, Money,
    Names, Network, Numbers, ObjectParser, Phone, Places, Strings, Truth
];

// Create the random world instance and register each method module
const world = new RandomWorld();
for (const MethodClass of METHOD_CLASSES) {
    world.register(new MethodClass());
}

/** Replace the random source for every generator; see lib/utils/utilities.js */
world.setRandom = setRandom;

export default world;

// Named exports for convenience
export { RandomWorld, setRandom };
export { RandomWorldError, ValidationError, NotFoundError, ConfigurationError } from './lib/errors.js';
