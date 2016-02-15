var expect = require('chai').expect,
    random = require('../index'),
    utils  = require('../lib/utils/utilities');

/**
 * Money tests
 *
 * @return {[type]}   [description]
 */
describe('Money tests:', function() {

    describe('Money methods', function () {

        it('ccnumber() should return a credit card number (unvalidated)', function () {
            var ccnumber = random.money.ccnumber();
            expect(ccnumber)
                .to.be.a('string')
                .to.have.length.above(0);
        });

        it('ccnumber() should return a credit card number (unvalidated), separated by hypens every 4 digits', function () {
            var ccnumber = random.money.ccnumber({
                hasHyphens: false
            });
            expect(ccnumber)
                .to.be.a('string')
                .to.have.length.above(0)
                .to.match(/^(\d+-?)+\d+$/);
        });

        it('ccnumber() should create 1000 CC numbers and validate them all against utils\' MOD 10 check', function () {
            expect(function() {
                var ccnumber;
                for (var i = 0; i < 1000; i++) {
                    ccnumber = random.money.ccnumber();
                    if (!utils.luhnModCheck(ccnumber.toString())) {
                        throw new Error('Failed checksum check on ' + ccnumber);
                    }
                }
            }).to.not.throw(Error);
        });


        it('ccnumber() should return a MasterCard credit card number that passes strict checking', function () {
            expect(function() {
                var ccnumber = random.money.ccnumber({
                    shortName: 'MC'
                }),
                mcStartsWith = [51, 52, 53, 54, 55], // must start with one of these strings
                mcMatchesOne = false;

                // ensure one of the starting numbers matches
                mcStartsWith.forEach(function(starts) {
                    if (ccnumber.substr(0, 2) == starts) {
                        mcMatchesOne = true;
                    }
                });

                // error out, string doesn't match an allowed starting string
                if (!mcMatchesOne) {
                    throw new Error('Number does not start with allowed series.');
                }

                // error out, string doesn't match allowed length
                if (ccnumber.length != 16 && ccnumber.length != 19) {
                    throw new Error('Number does not start with allowed series.');
                }

                // error out, cc number fails mod check
                if (!utils.luhnModCheck(ccnumber.toString())) {
                    throw new Error('Failed checksum check');
                }
            }).to.not.throw(Error);
        });

        it('cctype() should return a credit card type', function () {
            var ccType = random.money.cctype();
            expect(ccType)
                .to.be.a('string')
                .to.have.length.above(0);
        });

        it('ccstart() should return a credit card start date', function () {
            var ccStartDate = random.money.ccstart();
            expect(ccStartDate)
                .to.be.a('string')
                .to.have.length.above(0)
                .to.match(/^([0-9\/]+)$/);
        });

        it('ccenddate() should return a credit card expiry date', function () {
            var ccEndDate = random.money.ccexpiry();
            expect(ccEndDate)
                .to.be.a('string')
                .to.have.length.above(0)
                .to.match(/^([0-9\/]+)$/);
        });

        it('cvv() should return a credit card CV2 value', function () {
            var cv2 = random.money.cvv();
            expect(cv2)
                .to.be.a('string')
                .to.have.length(3)
                .to.match(/[0-9]+$/);
        });
    });
});
