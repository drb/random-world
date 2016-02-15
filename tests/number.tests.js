var expect = require('chai').expect,
    random = require('../index');

/**
 * number tests
 *
 * @return {[type]}   [description]
 */
describe('Number tests:', function() {

    describe('any integer()', function () {
        it('should return a number', function () {
            expect(random.numbers.integer())
            	.to.be.a('number');
        });
    });

    describe('positive integer()', function () {
        it('should return a number greater than 0', function () {
            expect(random.numbers.integer({min: 1}))
            	.to.be.a('number')
                .to.be.above(1);
        });
    });

    describe('integer()', function () {
        it('should return a number, padded with upto 3 zeroes', function () {
            expect(random.numbers.integer({padding: 5, max: 100}))
                .to.be.a('string');
        });
    });

    describe('number()', function () {
        it('alias to integer - should return a number, padded with upto 3 zeroes', function () {
            expect(random.numbers.number({padding: 5, max: 100}))
                .to.be.a('string');
        });
    });

    describe('float()', function () {
        it('should return a floating point number', function () {
            expect(random.numbers.float())
            	.to.satisfy(function(fl) {
                    return fl % 1 !== 0;
                });
        });
    });

    describe('sum()', function () {
        it('should return a random range of 9 numbers that sum to 101', function () {
            var options = {
                    max: 101,
                    count: 9
                },
                sum = random.numbers.sum(options);

            expect(sum)
                .to.be.a('array')
                .to.have.length(options.count)
                .to.satisfy(function(arr) {
                    var sum = 0;
                    for (var j = 0; j < arr.length; j++) {
                        sum += arr[j];
                    }
                    return sum === options.max;
                });
        });
    });

    describe('integer() with negative value', function () {
        it('should return a number less than 0', function () {
            var int = random.numbers.integer({min: -999999, max: 0, round: true});
            expect(int)
                .to.be.a('number')
                .to.be.below(0);
        });
    });

    describe('integer() with negative value between specific values', function () {
        it('should return a number between -1000 and -677', function () {
            var int = random.numbers.integer({min: -1000, max: -677, round: true});
            expect(int)
                .to.be.a('number')
                .to.be.within(-1000, -677);
        });
    });
});
