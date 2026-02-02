/**
 * Custom error classes for random-world
 */

/**
 * Base error class for random-world errors
 */
export class RandomWorldError extends Error {
    constructor(message) {
        super(message);
        this.name = 'RandomWorldError';
        Error.captureStackTrace?.(this, this.constructor);
    }
}

/**
 * Error thrown when validation fails
 */
export class ValidationError extends RandomWorldError {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}

/**
 * Error thrown when a requested item is not found
 */
export class NotFoundError extends RandomWorldError {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
    }
}

/**
 * Error thrown when configuration/options are invalid
 */
export class ConfigurationError extends RandomWorldError {
    constructor(message) {
        super(message);
        this.name = 'ConfigurationError';
    }
}
