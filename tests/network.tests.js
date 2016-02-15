var expect = require('chai').expect,
    random = require('../index');

/**
 * name tests
 *
 * @return {[type]}   [description]
 */
describe('Network tests:', function() {

    console.log(random.methods.network.domain());

    describe('domain()', function () {
        it('should return a fully qualified domain', function () {
            var domain = random.network.domain();
            // console.log('DOMAIN', domain);
            expect(domain).to.be.a('string');
        });
    });

    describe('tld()', function () {
        it('should return a top level domain', function () {
            expect(random.tld()).to.be.a('string');
        });
    });

    describe('ip()', function () {
        it('should return a random ip', function () {
            var ip = random.ip();
            expect(ip).to.be.a('string');
        });
    });

    describe('ip()', function () {
        it('should return a random ip with a mask', function () {
            var ip = random.ip({mask: true});
            expect(ip)
                .to.be.a('string')
                .to.have.string('/');
        });
    });

});
