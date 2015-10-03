var expect = require('chai').expect,
    random = require('../index'),
    utils  = require('../lib/utils/utilities'); 

/**
 * Utils tests
 * 
 * @return {[type]}   [description]
 */
describe('Utilities method - randomisation tests:', function() {

    describe('utils.random() 0-1 range', function () {
        it('should return a random number between 0-1', function () {
            var rng = utils.random();
            expect(rng)
                .to.be.a('number')
                .to.be.below(1)
                .to.be.above(0);
        });
    });

    /**
     * [description]
     * 
     * @return {[type]}   [description]
     */
    describe('utils.luhnModCheck() all valid', function () {
        it('checks 10 known to be valid cc numbers. should not raise an exception', function () {
            var cards = [
                '4716300100405316',
                '4048089364723931',
                '4539786958616217',
                '6011077929621219',
                '6011687402838468',
                '6011295950091934',
                '5496365969435178',
                '5588806904043709',
                '379320072806131',
                '0604604879605953',
                '4844078890375122'
            ];
            expect(function() {
                for (var i = 0; i < cards.length; i++) {
                    if (!utils.luhnModCheck(cards[i])) {
                        throw Error('Failed modulo 10 check');
                    }
                }
            }).to.not.throw(Error);
        });
    });


    /**
     * [description]
     * 
     * @return {[type]}   [description]
     */
    describe('utils.luhnModCheck() with known invalid', function () {
        it('checks 2 cc numbers, the 2nd is invalid. should raise an exception', function () {
            var cards = [
                '0604604879605953', // good one
                '0604604879605952'  // bad one
            ];
            expect(function() {
                for (var i = 0; i < cards.length; i++) {
                    if (!utils.luhnModCheck(cards[i])) {
                        throw Error('Failed modulo 10 check');
                    }
                }
            }).to.throw(Error);
        });
    });


});