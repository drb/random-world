import { expect } from 'chai';
import random from '../index.js';

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
            const items = 'foo, bar, baz, one, two > one, three, a more complex string...';
            const item = random.collections.pickone({items: items, delimiter: ', '});

            expect(item)
                .to.be.a('string')
                .to.have.length.above(0).
                to.satisfy(function(i){
                    const seed = items.split(', ');
                    return seed.includes(i);
                });
        });
    });
});
