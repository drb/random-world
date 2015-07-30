var expect = require('chai').expect,
    random = require('../index');

/**
 * Address tests
 * 
 * @return {[type]}   [description]
 */
describe('Address tests:', function() {

    describe('Address methods', function () {

        it('city() should return a city name', function () {
            var city = random.city();
            expect(city)
                .to.be.a('string')
                .to.have.length.above(0);
        });

        it('city() should return a city name within the UK', function () {
            var city = random.city({country: 'United Kingdom'});
            expect(city)
                .to.be.a('string')
                .to.have.length.above(0);
        });

        it('should return a country', function () {
            var country = random.country();
            expect(country)
                .to.be.a('string')
                .to.have.length.above(0);
        });

        it('should return a country code', function () {
            var countryCode = random.countrycode();
            expect(countryCode)
                .to.be.a('string')
                .to.have.length(2);
        });
    });
});