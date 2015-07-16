var expect = require('chai').expect,
    random = require('../index');

/**
 * String tests
 * 
 * @return {[type]}   [description]
 */
describe('String tests:', function() {

    describe('sentence()', function () {
        it('should return a sentence from lorem ipsum', function () {
            expect(random.sentence()).to.be.a('string');
        });
    }); 

    describe('random()', function () {
        it('should return a random string that is 20 chars long', function () {
            expect(random.random({len: 20}))
                .to.be.a('string')
                .to.have.length(20);
        });
    }); 
});