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

    describe('date() after 10/03/2015', function () {
        it('should return a random date after 10/03/2015 but before 20/03/2015', function () {
            expect(random.date({
                    start: '10/03/2015',
                    end: '20/03/2015'
                }))
                .to.be.a('date')
                .to.satisfy(function(date) {
                    return date >= new Date('10 Mar 2015') && date <= new Date('20 Mar 2015');
                });
        });
    });

    describe('unixtimestamp()', function () {
        it('should return a unixtimestamp', function () {
            expect(random.unixtimestamp())
                .to.be.a('number');
        });
    });

});