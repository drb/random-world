var _ = require('underscore'),
    expect = require('chai').expect,
    random = require('../index');

/**
 * Array tests
 *
 * @return {[type]}   [description]
 */
describe('Array tests:', function() {

    describe('array()', function () {

        it('should return an array with a random length between 1-12', function () {
            expect(random.collections.array())
                .to.be.a('array');
        });

        it('should return an array 10 items long', function () {
            expect(random.collections.array({limit: 10}))
                .to.be.a('array')
                .to.have.length(10);
        });

        it('should return a random item from a known set of items', function () {
            var items = "foo, bar, baz, one, two > one, three, a more complex string...",
                item = random.collections.pickone({items: items, delimiter: ", "});

            expect(item)
                .to.be.a('string')
                .to.have.length.above(0).
                to.satisfy(function(i){
                    var seed = items.split(', ');
                    return _.contains(seed, i);
                });
        });
    });
});
