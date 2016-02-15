var expect = require('chai').expect,
    random = require('../index');

/**
 * Geography tests
 *
 * @return {[type]}   [description]
 */
describe('Geography tests:', function() {

    describe('latlong()', function () {

        it('should return an object with a two keys, lat and long', function () {
            var latlong = random.geo.latlong();
            expect(latlong)
                .to.be.a('object')
                .to.have.keys('lat', 'long');
        });

        it('should return a longitude', function () {
            expect(random.geo.long())
                .to.be.within(-180, 180)
                .to.be.a('number');
        });

        it('should return a latitude', function () {
            expect(random.geo.lat())
                .to.be.within(-180, 180)
                .to.be.a('number');
        });
    });
});
