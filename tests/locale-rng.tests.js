import { expect } from 'chai';
import { execFileSync } from 'child_process';
import { readdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import random, { setRandom, ValidationError } from '../index.js';
import enGB from '../lib/methods/data/names/en-GB.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DRAWS = 5000;

describe('en-GB locale names:', function () {
    it('picks first names and surnames from the en-GB lists', function () {
        for (let i = 0; i < 200; i++) {
            expect(enGB.male.concat(enGB.female)).to.include(random.names.firstname({ locale: 'en-GB' }));
            expect(enGB.surnames).to.include(random.names.lastname({ locale: 'en-GB' }));
        }
    });

    it('weights by rank: the most common surname beats the rarest by far', function () {
        const counts = { first: 0, last: 0 };
        for (let i = 0; i < DRAWS; i++) {
            const name = random.names.lastname({ locale: 'en-GB' });
            if (name === enGB.surnames[0]) {counts.first++;}
            if (name === enGB.surnames[enGB.surnames.length - 1]) {counts.last++;}
        }
        expect(counts.first).to.be.greaterThan(counts.last * 20);
    });

    it('honours gender, startsWith and charCase', function () {
        expect(enGB.female).to.include(random.names.firstname({ locale: 'en-GB', gender: 'female' }));
        expect(enGB.male).to.include(random.names.firstname({ locale: 'en-GB', gender: 'male' }));
        expect(random.names.lastname({ locale: 'en-GB', startsWith: 'wa' })).to.match(/^Wa/);
        expect(random.names.fullname({ locale: 'en-GB', charCase: 'lower' })).to.match(/^[a-z']+ [a-z']+$/);
    });

    it('skipTop leaves out the most common names', function () {
        const commonFirst = enGB.male.slice(0, 20).concat(enGB.female.slice(0, 20));
        const commonLast = enGB.surnames.slice(0, 20);
        for (let i = 0; i < 1000; i++) {
            expect(commonFirst).to.not.include(random.names.firstname({ locale: 'en-GB', skipTop: 20 }));
            expect(commonLast).to.not.include(random.names.lastname({ locale: 'en-GB', skipTop: 20 }));
        }
        expect(() => random.names.lastname({ locale: 'en-GB', skipTop: -1 })).to.throw(ValidationError);
        expect(() => random.names.lastname({ locale: 'en-GB', skipTop: enGB.surnames.length })).to.throw(ValidationError);
    });

    it('rejects an unknown locale', function () {
        expect(() => random.names.firstname({ locale: 'xx-XX' })).to.throw(ValidationError);
    });
});

describe('setRandom():', function () {
    afterEach(() => setRandom());

    it('routes every pick through the supplied source', function () {
        setRandom(() => 0);
        expect(random.names.lastname({ locale: 'en-GB' })).to.equal(enGB.surnames[0]);
        expect(random.numbers.integer({ min: 5, max: 9 })).to.equal(5);
        random.setRandom(() => 0.999999);
        expect(random.names.lastname({ locale: 'en-GB' })).to.equal(enGB.surnames[enGB.surnames.length - 1]);
    });

    it('rejects a non-function and restores the default with no argument', function () {
        expect(() => setRandom(42)).to.throw(TypeError);
        setRandom(() => 0);
        setRandom();
        const seen = new Set(Array.from({ length: 50 }, () => random.names.lastname({ locale: 'en-GB' })));
        expect(seen.size).to.be.greaterThan(1);
    });
});

describe('entry point:', function () {
    it('registers every module in lib/methods', function () {
        const files = readdirSync(join(ROOT, 'lib/methods')).filter(f => f.endsWith('.js'));
        const registered = Object.keys(random.getProxyInterface());
        expect(registered.length).to.equal(files.length);
    });

    it('can be require()d from CommonJS', function () {
        const out = execFileSync(process.execPath, ['-e', "console.log(typeof require('random-world').default.names.fullname({ locale: 'en-GB' }))"], { cwd: ROOT, encoding: 'utf8' });
        expect(out.trim()).to.equal('string');
    });
});
