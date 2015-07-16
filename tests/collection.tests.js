var expect = require('chai').expect,
    random = require('../index');

/**
 * Array tests
 * 
 * @return {[type]}   [description]
 */
describe('Array tests:', function() {

    describe('array()', function () {

        it('should return an array with a random length between 1-12', function () {
            expect(random.array())
                .to.be.a('array');
        });

        it('should return an array 10 items long', function () {
            expect(random.array({limit: 10}))
                .to.be.a('array')
                .to.have.length(10);
        });
    });
});