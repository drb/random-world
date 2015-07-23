var expect = require('chai').expect,
    random = require('../index');

/**
 * number tests
 * 
 * @return {[type]}   [description]
 */
describe('Number tests:', function() {
    describe('getInt()', function () {
        it('should return a number', function () {
            expect(random.integer())
            	.to.be.a('number');
        });
    });

    describe('getFloat()', function () {
        it('should return a floating point number', function () {
            expect(random.float())
            	.to.satisfy(function(fl) {
                    return fl % 1 !== 0;
                });
        });
    });

    describe('getRange()', function () {
        it('should return a random range of 9 numbers that sum to 101', function () {
            var options = {
                    max: 101,
                    count: 9
                },
                sum = random.sum(options);

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
});