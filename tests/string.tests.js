var expect = require('chai').expect,
    random = require('../index');

/**
 * name tests
 * 
 * @return {[type]}   [description]
 */
describe('Name tests:', function() {
    describe('fullname()', function () {
        it('should return a full person\'s name', function () {
            expect(random.fullname()).to.be.a('string');
        });
    });

    describe('firstname()', function () {
        it('should return a person\'s first name', function () {
            expect(random.firstname()).to.be.a('string');
        });
    });

    describe('lastname()', function () {
        it('should return a person\'s last name', function () {
            expect(random.lastname()).to.be.a('string');
        });
    }); 
});