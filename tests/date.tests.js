var expect = require('chai').expect,
    random = require('../index');

/**
 * date tests
 * 
 * @return {[type]}   [description]
 */
describe('Date tests:', function() {

    describe('now()', function () {
        it('should return the time and date now', function () {
            expect(random.now()).to.be.a('date');
        });
    });

    describe('now() after 10/03/2015', function () {
        it('should return the time and date after 10/03/2015', function () {
            expect(random.now({startDate: '10/03/2015'})).to.be.a('date');
        });
    });

    describe('unixtimestamp()', function () {
        it('should return a unixtimestamp', function () {
            expect(random.unixtimestamp()).to.be.a('number');
        });
    });

    describe('date()', function () {
        it('should return a person\'s last name', function () {
            expect(random.lastname()).to.be.a('string');
        });
    }); 

    describe('datetime(startsWith: Bu)', function () {
        it('should return a last name that starts with Bu', function () {
            expect(random.lastname({startsWith: 'Bu'}))
                .to.be.a('string')
                .to.have.string('Bu');
        });
    }); 
});