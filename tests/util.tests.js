var expect = require('chai').expect,
    random = require('../index'),
    utils  = require('../lib/utils/utilities'); 

/**
 * Utils tests
 * 
 * @return {[type]}   [description]
 */
describe('Utilities method - randomisation tests:', function() {

    describe('utils.random() 0-1 range', function () {
        it('should return a random number between 0-1', function () {
            var rng = utils.random();
            expect(rng)
                .to.be.a('number')
                .to.be.below(1)
                .to.be.above(0);
        });
    });

});