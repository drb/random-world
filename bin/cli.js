#!/usr/bin/env node

/**
 * random-world CLI
 *
 * Generate random data from the command line
 *
 * Usage:
 *   random-world <method> [options]
 *   random-world names.fullname -r 10 -f csv
 *   random-world network.ip -r 5 -f json
 */

import { parseArgs } from 'node:util';
import random from '../index.js';
import { generateBulk } from '../lib/bulk.js';
import formatters from '../lib/formatters/index.js';

const options = {
    repeat: {
        type: 'string',
        short: 'r',
        default: '1'
    },
    format: {
        type: 'string',
        short: 'f',
        default: 'text'
    },
    unique: {
        type: 'boolean',
        short: 'u',
        default: false
    },
    help: {
        type: 'boolean',
        short: 'h',
        default: false
    },
    version: {
        type: 'boolean',
        short: 'v',
        default: false
    },
    options: {
        type: 'string',
        short: 'o',
        default: '{}'
    }
};

function showHelp() {
    console.log(`
random-world CLI - Generate random data

Usage:
  random-world <method> [options]

Methods:
  names.firstname      Generate a random first name
  names.lastname       Generate a random last name
  names.fullname       Generate a random full name
  names.email          Generate a random email address
  network.ip           Generate a random IP address
  network.ipv6         Generate a random IPv6 address
  network.domain       Generate a random domain
  numbers.integer      Generate a random integer
  strings.uuid         Generate a UUID
  places.city          Generate a random city
  places.country       Generate a random country
  ... and many more

Options:
  -r, --repeat <n>     Number of items to generate (default: 1)
  -f, --format <fmt>   Output format: text, json, csv, sql (default: text)
  -u, --unique         Generate unique values only
  -o, --options <json> JSON options to pass to the method
  -h, --help           Show this help message
  -v, --version        Show version number

Examples:
  random-world names.fullname -r 10 -f csv
  random-world network.ip -r 5 -f json
  random-world numbers.integer -o '{"min":1,"max":100}' -r 10
`);
}

function showVersion() {
    console.log('random-world v2.0.0');
}

function getMethod(path) {
    const parts = path.split('.');

    if (parts.length === 1) {
        // Direct method access (deprecated)
        if (typeof random[parts[0]] === 'function') {
            return random[parts[0]].bind(random);
        }
    } else if (parts.length === 2) {
        const [namespace, method] = parts;
        if (random[namespace] && typeof random[namespace][method] === 'function') {
            return random[namespace][method].bind(random[namespace]);
        }
    }

    return null;
}

function main() {
    let args;

    try {
        args = parseArgs({
            options,
            allowPositionals: true
        });
    } catch (e) {
        console.error('Error parsing arguments:', e.message);
        process.exit(1);
    }

    const { values, positionals } = args;

    if (values.help) {
        showHelp();
        process.exit(0);
    }

    if (values.version) {
        showVersion();
        process.exit(0);
    }

    if (positionals.length === 0) {
        console.error('Error: No method specified');
        showHelp();
        process.exit(1);
    }

    const methodPath = positionals[0];
    const method = getMethod(methodPath);

    if (!method) {
        console.error(`Error: Unknown method "${methodPath}"`);
        process.exit(1);
    }

    let methodOptions = {};
    try {
        methodOptions = JSON.parse(values.options);
    } catch (e) {
        console.error('Error parsing options JSON:', e.message);
        process.exit(1);
    }

    const count = parseInt(values.repeat, 10);
    const format = values.format.toLowerCase();
    const unique = values.unique;

    // Generate data
    const data = generateBulk(
        () => method(methodOptions),
        count,
        { unique }
    );

    // Format output
    let output;

    switch (format) {
        case 'json':
            output = formatters.json(data);
            break;
        case 'csv':
            // For CSV, wrap simple values in objects
            const csvData = data.map((item, index) => {
                if (typeof item === 'object' && item !== null) {
                    return item;
                }
                return { value: item };
            });
            output = formatters.csv(csvData);
            break;
        case 'sql':
            const sqlData = data.map((item, index) => {
                if (typeof item === 'object' && item !== null) {
                    return item;
                }
                return { value: item };
            });
            output = formatters.sql(sqlData, methodPath.replace('.', '_'));
            break;
        case 'text':
        default:
            output = formatters.text(data);
            break;
    }

    console.log(output);
}

main();
