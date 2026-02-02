/**
 * Bulk generation utilities for random-world
 */

/**
 * Generate multiple items using a generator function
 * @param {Function} generator - Function that generates a single item
 * @param {number} count - Number of items to generate
 * @param {Object} options - Options including unique, maxAttempts, onProgress
 * @returns {Array} Array of generated items
 */
export function generateBulk(generator, count, options = {}) {
    const items = [];
    const unique = options.unique || false;
    const maxAttempts = options.maxAttempts || count * 10;
    const onProgress = options.onProgress || null;
    const seen = new Set();
    let attempts = 0;

    while (items.length < count && attempts < maxAttempts) {
        attempts++;

        const item = generator();

        if (unique) {
            const key = typeof item === 'object' ? JSON.stringify(item) : String(item);

            if (!seen.has(key)) {
                seen.add(key);
                items.push(item);

                if (onProgress) {
                    onProgress(items.length, count);
                }
            }
        } else {
            items.push(item);

            if (onProgress) {
                onProgress(items.length, count);
            }
        }
    }

    if (items.length < count) {
        console.warn(`[random-world] Could only generate ${items.length} unique items out of ${count} requested after ${maxAttempts} attempts`);
    }

    return items;
}

/**
 * Generate bulk data with multiple fields
 * @param {Object} schema - Object mapping field names to generator functions
 * @param {number} count - Number of records to generate
 * @param {Object} options - Options including unique
 * @returns {Array} Array of generated objects
 */
export function generateRecords(schema, count, options = {}) {
    const generator = () => {
        const record = {};
        for (const [field, gen] of Object.entries(schema)) {
            record[field] = typeof gen === 'function' ? gen() : gen;
        }
        return record;
    };

    return generateBulk(generator, count, options);
}

export default {
    generateBulk,
    generateRecords
};
