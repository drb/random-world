var expect = require('chai').expect,
    random = require('../index');

/**
 * Utils tests
 * 
 * @return {[type]}   [description]
 */
describe('Util randomisation tests:', function() {

    describe('utils.random()', function () {
        it('should return a random number between 0-1', function () {
            var rng = random.utils.random(1);
            expect(rng)
                .to.be.a('number')
                .to.be.below(1);
        });
    });

    describe('utils.random()', function () {
        it('should return a random number between 0-100', function () {
            var rng = random.utils.random(100);
            expect(rng)
                .to.be.a('number')
                .to.be.below(100);
        });
    });

});