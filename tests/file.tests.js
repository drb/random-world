var expect = require('chai').expect,
    random = require('../index');

/**
 * String tests
 *
 * @return {[type]}   [description]
 */
describe('File tests:', function() {

    describe('extension()', function () {
        it('should return a random file extension with a length between 1 and 4', function () {
            expect(random.files.extension())
                .to.be.a('string')
                .to.have.length.within(1, 4);
        });


        it('should return a random file extension with a length between 1 and 4, including a dot prefix', function () {
            expect(random.files.extension({includeDot: true}))
                .to.be.a('string')
                .to.have.string('.')
                .to.have.length.within(2, 5);
        });
    });

});
