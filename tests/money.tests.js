var expect = require('chai').expect,
    random = require('../index');

/**
 * Money tests
 * 
 * @return {[type]}   [description]
 */
describe('Money tests:', function() {

    describe('Money methods', function () {

        it('ccnumber() should return a credit card number', function () {
            var ccnumber = random.ccnumber();
            console.log('ccnumber', ccnumber);
            expect(ccnumber)
                .to.be.a('string')
                .to.have.length.above(0);
        });

        it('ccnumber() should return a credit card number separated by hypens', function () {
            var ccnumber = random.ccnumber({hasHyphens: false});
            console.log('ccnumber', ccnumber);
            expect(ccnumber)
                .to.be.a('string')
                .to.have.length.above(0);
        });
    });
});