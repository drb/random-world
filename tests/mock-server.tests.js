var expect = require('chai').expect,
    random = require('../index');

/**
 * name tests
 * 
 * @return {[type]}   [description]
 */
describe('Mocking server tests:', function() {
    describe('fromMock()', function () {
        it('should return a number', function () {
            expect(random.fromMock()).to.be.a('string');
        });
    });
});