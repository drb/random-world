/**
 * Output formatters for random-world data
 */

/**
 * Format data as CSV
 * @param {Array} data - Array of objects
 * @param {Object} options - Options including delimiter, includeHeader
 * @returns {string} CSV formatted string
 */
export function csv(data, options = {}) {
    if (!Array.isArray(data) || data.length === 0) {
        return '';
    }

    const delimiter = options.delimiter || ',';
    const includeHeader = options.includeHeader !== false;

    const headers = Object.keys(data[0]);
    const rows = [];

    if (includeHeader) {
        rows.push(headers.join(delimiter));
    }

    for (const item of data) {
        const values = headers.map(header => {
            const value = item[header];
            // Escape values containing delimiter, quotes, or newlines
            if (typeof value === 'string' && (value.includes(delimiter) || value.includes('"') || value.includes('\n'))) {
                return `"${value.replace(/"/g, '""')}"`;
            }
            return value;
        });
        rows.push(values.join(delimiter));
    }

    return rows.join('\n');
}

/**
 * Format data as SQL INSERT statements
 * @param {Array} data - Array of objects
 * @param {string} tableName - Name of the table
 * @param {Object} options - Options including dialect
 * @returns {string} SQL formatted string
 */
export function sql(data, tableName = 'data', options = {}) {
    if (!Array.isArray(data) || data.length === 0) {
        return '';
    }

    const statements = [];
    const columns = Object.keys(data[0]);
    const columnList = columns.join(', ');

    for (const item of data) {
        const values = columns.map(col => {
            const value = item[col];
            if (value === null || value === undefined) {
                return 'NULL';
            }
            if (typeof value === 'number') {
                return value;
            }
            if (typeof value === 'boolean') {
                return value ? 1 : 0;
            }
            // Escape single quotes for SQL
            return `'${String(value).replace(/'/g, "''")}'`;
        });

        statements.push(`INSERT INTO ${tableName} (${columnList}) VALUES (${values.join(', ')});`);
    }

    return statements.join('\n');
}

/**
 * Format data as JSON
 * @param {*} data - Data to format
 * @param {Object} options - Options including pretty, indent
 * @returns {string} JSON formatted string
 */
export function json(data, options = {}) {
    const pretty = options.pretty !== false;
    const indent = options.indent || 2;

    if (pretty) {
        return JSON.stringify(data, null, indent);
    }

    return JSON.stringify(data);
}

/**
 * Format data as plain text
 * @param {Array} data - Array of objects
 * @param {Object} options - Options including separator
 * @returns {string} Text formatted string
 */
export function text(data, options = {}) {
    if (!Array.isArray(data)) {
        return String(data);
    }

    const separator = options.separator || '\n';

    return data.map(item => {
        if (typeof item === 'object') {
            return Object.values(item).join('\t');
        }
        return String(item);
    }).join(separator);
}

export const formatters = {
    csv,
    sql,
    json,
    text
};

export default formatters;
