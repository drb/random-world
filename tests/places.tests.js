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
    });
});
