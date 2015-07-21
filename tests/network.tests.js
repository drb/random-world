var expect = require('chai').expect,
    random = require('../index');

/**
 * name tests
 * 
 * @return {[type]}   [description]
 */
describe('Network tests:', function() {

    describe('domain()', function () {
        it('should return a fully qualified domain', function () {
            // console.log(random.domain());
            expect(random.domain()).to.be.a('string');
        });
    });

    describe('tld()', function () {
        it('should return a top level domain', function () {
            expect(random.tld()).to.be.a('string');
        });
    });

});