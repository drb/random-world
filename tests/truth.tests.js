import { expect } from 'chai';
import random from '../index.js';

/**
 * Truth tests
 *
 * @return {[type]}   [description]
 */
describe('Truth randomisation tests:', function() {

    describe('utils.boolean()', function () {
        it('should return a random true or false', function () {
            const bool = random.truth.boolean();
            expect(bool)
                .to.be.a('boolean');
        });
    });

});
