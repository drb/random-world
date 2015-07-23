var expect = require('chai').expect,
    random = require('../index');

/**
 * number tests
 * 
 * @return {[type]}   [description]
 */
describe('Number tests:', function() {
    describe('getInt()', function () {
        it('should return a number', function () {
            expect(random.integer())
            	.to.be.a('number');
        });
    });

    describe('getFloat()', function () {
        it('should return a floating point number', function () {
            expect(random.float())
            	.to.satisfy(function(fl) {
                    return fl % 1 !== 0;
                });
        });
    });
});