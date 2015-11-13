var expect = require('chai').expect,
    random = require('../index'),
    utils  = require('../lib/utils/utilities'); 

/**
 * Utils tests
 * 
 * @return {[type]}   [description]
 */
describe('Utilities method', function() {

    // 
    describe('randomisation tests:', function() {

        describe('utils.random() 0-1 range', function () {
            it('should return a random number between 0-1', function () {
                var rng = utils.random();
                expect(rng)
                    .to.be.a('number')
                    .to.be.below(1)
                    .to.be.above(0);
            });

        });
    });

    describe('credit card utility method tests:', function() {

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

    
    describe('utils check nested methods work the same', function() {

        describe('nested methods', function() {

            it('places.city() should return a city name', function () {
                var city = random.places.city();
                expect(city)
                    .to.be.a('string')
                    .to.have.length.above(0);
            });

            it('files.extension() should return a random file extension with a length between 1 and 4', function () {
                expect(random.files.extension())
                    .to.be.a('string')
                    .to.have.length.within(1, 4);
            });

            it('dates.dayofweek() should return a day of the week', function () {
                var dayOfWeek = random.dates.dayofweek();
                expect(dayOfWeek)
                    .to.be.a('string');
            });

            it('truth.boolean() should return a random true or false', function () {
                var bool = random.truth.boolean();
                expect(bool)
                    .to.be.a('boolean');
            });
        });

    });

});