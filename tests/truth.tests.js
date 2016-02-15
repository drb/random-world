var expect = require('chai').expect,
    random = require('../index');

/**
 * Truth tests
 *
 * @return {[type]}   [description]
 */
describe('Truth randomisation tests:', function() {

    describe('utils.boolean()', function () {
        it('should return a random true or false', function () {
            var bool = random.truth.boolean();
            expect(bool)
                .to.be.a('boolean');
        });
    });

});
