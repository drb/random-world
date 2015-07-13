var expect = require('chai').expect,
	random = require('../index');

/**
 * name tests
 * 
 * @return {[type]}   [description]
 */
describe('Name tests:', function() {
	describe('fullName()', function () {
		it('should return a full person\'s name', function () {
			expect(random.fullName()).to.be.a('string');
		});
	});

	describe('firstName()', function () {
		it('should return a person\'s first name', function () {
			expect(random.firstName()).to.be.a('string');
		});
	});

	describe('lastName()', function () {
		it('should return a person\'s last name', function () {
			expect(random.lastName()).to.be.a('string');
		});
	});	
});