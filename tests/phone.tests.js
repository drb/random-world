import { expect } from 'chai';
import random from '../index.js';

/**
 * Phone tests
 */
describe('Phone tests:', function() {

    describe('number()', function () {
        it('should return a formatted phone number', function () {
            const number = random.phone.number();
            expect(number).to.be.a('string');
            expect(number.length).to.be.greaterThan(5);
        });
    });

    describe('number({ formatted: false })', function () {
        it('should return a raw phone number without formatting', function () {
            const number = random.phone.number({ formatted: false });
            expect(number).to.be.a('string');
            expect(number).to.match(/^\d+$/);
        });
    });

    describe('number({ country: "US" })', function () {
        it('should return a US-formatted phone number', function () {
            const number = random.phone.number({ country: 'US' });
            expect(number).to.be.a('string');
            expect(number).to.match(/^\(\d{3}\) \d{3}-\d{4}$/);
        });
    });

    describe('areaCode()', function () {
        it('should return an area code', function () {
            const areaCode = random.phone.areaCode();
            expect(areaCode).to.be.a('string');
            expect(areaCode).to.match(/^\d{3}$/);
        });
    });

    describe('areaCode({ country: "US" })', function () {
        it('should return a valid US area code', function () {
            const areaCode = random.phone.areaCode({ country: 'US' });
            expect(areaCode).to.be.a('string');
            expect(areaCode).to.match(/^\d{3}$/);
        });
    });

    describe('countryCode()', function () {
        it('should return a country calling code', function () {
            const code = random.phone.countryCode();
            expect(code).to.be.a('string');
            expect(code).to.match(/^\+\d+$/);
        });
    });

    describe('countryCode({ country: "US" })', function () {
        it('should return +1 for US', function () {
            const code = random.phone.countryCode({ country: 'US' });
            expect(code).to.equal('+1');
        });
    });

    describe('countryCode({ country: "GB" })', function () {
        it('should return +44 for GB', function () {
            const code = random.phone.countryCode({ country: 'GB' });
            expect(code).to.equal('+44');
        });
    });

    describe('imei()', function () {
        it('should return a 15-digit IMEI number', function () {
            const imei = random.phone.imei();
            expect(imei).to.be.a('string');
            expect(imei).to.match(/^\d{15}$/);
        });

        it('should return a valid IMEI with correct Luhn checksum', function () {
            const imei = random.phone.imei();
            // Verify Luhn checksum
            let sum = 0;
            for (let i = 0; i < imei.length; i++) {
                let digit = parseInt(imei[i], 10);
                if (i % 2 === 1) {
                    digit *= 2;
                    if (digit > 9) {digit -= 9;}
                }
                sum += digit;
            }
            expect(sum % 10).to.equal(0);
        });
    });
});
