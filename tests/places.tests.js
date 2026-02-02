import { expect } from 'chai';
import random from '../index.js';

/**
 * Places tests
 *
 * @return {[type]}   [description]
 */
describe('Places tests:', function() {

    describe('Places (address) methods', function () {

        it('city() should return a city name', function () {
            const city = random.places.city();
            expect(city)
                .to.be.a('string')
                .to.have.length.above(0);
        });

        it('city() should return a city name within the UK', function () {
            const city = random.places.city({country: 'United Kingdom'});
            expect(city)
                .to.be.a('string')
                .to.have.length.above(0);
        });

        it('country() should return a country', function () {
            const country = random.places.country();
            expect(country)
                .to.be.a('string')
                .to.have.length.above(0);
        });

        it('countrycode() should return a country code', function () {
            const countryCode = random.places.countrycode();
            expect(countryCode)
                .to.be.a('string')
                .to.have.length(2);
        });

        it('state() should return a US state name', function () {
            const state = random.places.state();
            expect(state)
                .to.be.a('string')
                .to.have.length.above(0);
        });

        it('state({ abbreviated: true }) should return a state abbreviation', function () {
            const abbr = random.places.state({ abbreviated: true });
            expect(abbr)
                .to.be.a('string')
                .to.have.length(2);
        });

        it('state({ country: "CA" }) should return a Canadian province', function () {
            const province = random.places.state({ country: 'CA' });
            expect(province)
                .to.be.a('string')
                .to.have.length.above(0);
        });

        it('postalCode() should return a US ZIP code', function () {
            const zip = random.places.postalCode();
            expect(zip)
                .to.be.a('string')
                .to.match(/^\d{5}$/);
        });

        it('postalCode({ country: "CA" }) should return a Canadian postal code', function () {
            const postal = random.places.postalCode({ country: 'CA' });
            expect(postal)
                .to.be.a('string')
                .to.match(/^[A-Z]\d[A-Z] \d[A-Z]\d$/);
        });

        it('fullAddress() should return a complete address string', function () {
            const address = random.places.fullAddress();
            expect(address)
                .to.be.a('string')
                .to.have.length.above(10);
        });
    });
});
