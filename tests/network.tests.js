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
            var domain = random.network.domain();
            expect(domain).to.be.a('string');
        });
    });

    describe('tld()', function () {
        it('should return a top level domain', function () {
            expect(random.network.tld()).to.be.a('string');
        });
    });

    describe('ip()', function () {
        it('should return a random ip', function () {

            var ip = random.network.ip();

            expect(ip)
                .to.be.a('string')
                .to.match(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/)
        });
    });

    describe('ip()', function () {
        it('should return a random ip with a mask', function () {
            var ip = random.network.ip({mask: true});
            expect(ip)
                .to.be.a('string')
                .to.have.string('/');
        });
    });

});
