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
});