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

    describe('lastname(startsWith: Bu)', function () {
        it('should return a last name that starts with Bu', function () {
            expect(random.lastname({startsWith: 'Bu'}))
                .to.be.a('string')
                .to.have.string('Bu');
        });
    }); 

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