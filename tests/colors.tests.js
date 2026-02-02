import { expect } from 'chai';
import random from '../index.js';

/**
 * Colors tests
 */
describe('Colors tests:', function() {

    describe('hex()', function () {
        it('should return a hex color with hash', function () {
            const color = random.colors.hex();
            expect(color).to.be.a('string');
            expect(color).to.match(/^#[0-9A-F]{6}$/);
        });
    });

    describe('hex({ includeHash: false })', function () {
        it('should return a hex color without hash', function () {
            const color = random.colors.hex({ includeHash: false });
            expect(color).to.be.a('string');
            expect(color).to.match(/^[0-9A-F]{6}$/);
        });
    });

    describe('rgb()', function () {
        it('should return an RGB color object', function () {
            const color = random.colors.rgb();
            expect(color).to.be.an('object');
            expect(color).to.have.property('r');
            expect(color).to.have.property('g');
            expect(color).to.have.property('b');
            expect(color.r).to.be.within(0, 255);
            expect(color.g).to.be.within(0, 255);
            expect(color.b).to.be.within(0, 255);
        });
    });

    describe('rgb({ format: "string" })', function () {
        it('should return an RGB color string', function () {
            const color = random.colors.rgb({ format: 'string' });
            expect(color).to.be.a('string');
            expect(color).to.match(/^rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)$/);
        });
    });

    describe('hsl()', function () {
        it('should return an HSL color object', function () {
            const color = random.colors.hsl();
            expect(color).to.be.an('object');
            expect(color).to.have.property('h');
            expect(color).to.have.property('s');
            expect(color).to.have.property('l');
            expect(color.h).to.be.within(0, 360);
            expect(color.s).to.be.within(0, 100);
            expect(color.l).to.be.within(0, 100);
        });
    });

    describe('hsl({ format: "string" })', function () {
        it('should return an HSL color string', function () {
            const color = random.colors.hsl({ format: 'string' });
            expect(color).to.be.a('string');
            expect(color).to.match(/^hsl\(\d{1,3}, \d{1,3}%, \d{1,3}%\)$/);
        });
    });

    describe('name()', function () {
        it('should return a CSS color name', function () {
            const color = random.colors.name();
            expect(color).to.be.a('string');
            expect(color.length).to.be.greaterThan(0);
        });
    });

    describe('name({ includeHex: true })', function () {
        it('should return an object with name and hex', function () {
            const color = random.colors.name({ includeHex: true });
            expect(color).to.be.an('object');
            expect(color).to.have.property('name');
            expect(color).to.have.property('hex');
            expect(color.name).to.be.a('string');
            expect(color.hex).to.match(/^#[0-9A-F]{6}$/i);
        });
    });
});
