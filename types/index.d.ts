/**
 * Type definitions for random-world
 */

declare module 'random-world' {
    // Error classes
    export class RandomWorldError extends Error {
        constructor(message: string);
    }

    export class ValidationError extends RandomWorldError {
        constructor(message: string);
    }

    export class NotFoundError extends RandomWorldError {
        constructor(message: string);
    }

    export class ConfigurationError extends RandomWorldError {
        constructor(message: string);
    }

    // Options interfaces
    export interface CharCaseOptions {
        charCase?: 'upper' | 'lower' | 'sentence';
        /** @deprecated Use charCase instead */
        charcase?: 'upper' | 'lower' | 'sentence';
    }

    export interface NameOptions extends CharCaseOptions {
        gender?: 'male' | 'female' | 'nonbinary';
        startsWith?: string;
    }

    export interface TitleOptions {
        gender?: 'male' | 'female' | 'nonbinary';
    }

    export interface EmailOptions extends NameOptions {
        hasDot?: boolean;
        hasPlusAddress?: boolean;
        standard?: boolean;
    }

    export interface IntegerOptions {
        min?: number;
        max?: number;
        round?: boolean;
        padding?: number;
        asString?: boolean;
    }

    export interface StringOptions extends CharCaseOptions {
        len?: number;
        chars?: string;
    }

    export interface WordOptions extends CharCaseOptions {
        language?: string;
        limit?: number;
        delimiter?: string;
    }

    export interface BlockOptions {
        blockSize?: number;
        delimiter?: string;
        chars?: string;
    }

    export interface UrlOptions {
        protocol?: string;
        port?: number;
    }

    export interface DomainOptions {
        includeDot?: boolean;
        standard?: boolean;
    }

    export interface TldOptions {
        standard?: boolean;
        includeDot?: boolean;
    }

    export interface IpOptions {
        mask?: boolean;
    }

    export interface DateOptions {
        start?: string;
        end?: string;
        format?: 'UK' | 'US';
        short?: boolean;
    }

    export interface CityOptions {
        country?: string;
    }

    export interface PickoneOptions {
        items?: string;
        delimiter?: ',' | '|';
    }

    export interface ArrayOptions {
        limit?: number;
    }

    export interface CcnumberOptions {
        shortName?: string;
        hasHyphens?: boolean;
    }

    export interface ExtensionOptions {
        includeDot?: boolean;
    }

    // Module interfaces
    export interface Names {
        firstname(options?: NameOptions): string;
        lastname(options?: NameOptions): string;
        fullname(options?: NameOptions): string;
        title(options?: TitleOptions): string;
        email(options?: EmailOptions): string;
    }

    export interface Numbers {
        integer(options?: IntegerOptions): number | string;
        number(options?: IntegerOptions): number | string;
        float(options?: Omit<IntegerOptions, 'round'>): number;
        sum(options: { count: number; max: number }): number[];
    }

    export interface Strings {
        word(options?: WordOptions): string;
        sentence(options?: Record<string, unknown>): string;
        random(options?: StringOptions): string;
        block(options?: BlockOptions): string;
        uuid(options?: Record<string, unknown>): string;
    }

    export interface Network {
        url(options?: UrlOptions): string;
        domain(options?: DomainOptions): string;
        tld(options?: TldOptions): string;
        ip(options?: IpOptions): string;
        ipv6(options?: Record<string, unknown>): string;
    }

    export interface Dates {
        now(options?: Record<string, unknown>): Date;
        date(options?: DateOptions): Date;
        unixtimestamp(options?: Record<string, unknown>): number;
        day(options?: DateOptions): number;
        year(options?: DateOptions): number;
        month(options?: DateOptions): string;
        dayofweek(options?: DateOptions): string;
    }

    export interface Places {
        street(): string;
        city(options?: CityOptions): string;
        country(options?: Record<string, unknown>): string;
        countrycode(options?: Record<string, unknown>): string;
    }

    export interface Money {
        ccnumber(options?: CcnumberOptions): string;
        ccstart(options?: Record<string, unknown>): string;
        ccexpiry(options?: Record<string, unknown>): string;
        cctype(): string;
        cvv(): string;
        cv2(): string;
    }

    export interface Geography {
        latlong(options?: Record<string, unknown>): { lat: number; long: number };
        lat(options?: Record<string, unknown>): number;
        long(options?: Record<string, unknown>): number;
    }

    export interface Collections {
        array(options?: ArrayOptions): number[];
        pickone(options?: PickoneOptions): string;
    }

    export interface Files {
        extension(options?: ExtensionOptions): string;
    }

    export interface Truth {
        boolean(): boolean;
    }

    export interface ObjectParser {
        fromMock(sig: Record<string, Function>, mock: object | string): object | object[];
        fromObject(sig: Record<string, Function>, mock: object | string): object | object[];
        tokenize(key: string, struct: object, lockedRefs?: object): { tokenizedValue: unknown; refs: object; tag: string };
        collection(output: object, collections: object): void;
    }

    // Main interface
    export interface RandomWorld {
        names: Names;
        numbers: Numbers;
        strings: Strings;
        network: Network;
        dates: Dates;
        places: Places;
        money: Money;
        geo: Geography;
        collections: Collections;
        files: Files;
        truth: Truth;
        object: ObjectParser;

        // Deprecated direct method access
        /** @deprecated Use random.names.firstname() instead */
        firstname(options?: NameOptions): string;
        /** @deprecated Use random.names.lastname() instead */
        lastname(options?: NameOptions): string;
        /** @deprecated Use random.names.fullname() instead */
        fullname(options?: NameOptions): string;
        /** @deprecated Use random.names.title() instead */
        title(options?: TitleOptions): string;
        /** @deprecated Use random.names.email() instead */
        email(options?: EmailOptions): string;
        /** @deprecated Use random.numbers.integer() instead */
        integer(options?: IntegerOptions): number | string;
        /** @deprecated Use random.numbers.number() instead */
        number(options?: IntegerOptions): number | string;
        /** @deprecated Use random.numbers.float() instead */
        float(options?: Omit<IntegerOptions, 'round'>): number;
        /** @deprecated Use random.strings.word() instead */
        word(options?: WordOptions): string;
        /** @deprecated Use random.strings.sentence() instead */
        sentence(options?: Record<string, unknown>): string;
        /** @deprecated Use random.strings.random() instead */
        random(options?: StringOptions): string;
        /** @deprecated Use random.strings.uuid() instead */
        uuid(options?: Record<string, unknown>): string;
        /** @deprecated Use random.network.ip() instead */
        ip(options?: IpOptions): string;
        /** @deprecated Use random.network.ipv6() instead */
        ipv6(options?: Record<string, unknown>): string;
        /** @deprecated Use random.network.domain() instead */
        domain(options?: DomainOptions): string;
        /** @deprecated Use random.network.tld() instead */
        tld(options?: TldOptions): string;
        /** @deprecated Use random.network.url() instead */
        url(options?: UrlOptions): string;
        /** @deprecated Use random.dates.date() instead */
        date(options?: DateOptions): Date;
        /** @deprecated Use random.dates.now() instead */
        now(options?: Record<string, unknown>): Date;
        /** @deprecated Use random.places.city() instead */
        city(options?: CityOptions): string;
        /** @deprecated Use random.places.country() instead */
        country(options?: Record<string, unknown>): string;
        /** @deprecated Use random.truth.boolean() instead */
        boolean(): boolean;
    }

    // Formatters
    export interface Formatters {
        csv(data: object[], options?: { delimiter?: string; includeHeader?: boolean }): string;
        sql(data: object[], tableName?: string, options?: { dialect?: string }): string;
        json(data: unknown, options?: { pretty?: boolean; indent?: number }): string;
        text(data: unknown[], options?: { separator?: string }): string;
    }

    // Bulk generation
    export interface BulkOptions {
        unique?: boolean;
        maxAttempts?: number;
        onProgress?: (current: number, total: number) => void;
    }

    export function generateBulk<T>(generator: () => T, count: number, options?: BulkOptions): T[];
    export function generateRecords(schema: Record<string, (() => unknown) | unknown>, count: number, options?: BulkOptions): object[];

    const random: RandomWorld;
    export default random;
}
