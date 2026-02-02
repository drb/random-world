import { expect } from 'chai';
import random from '../index.js';

/**
 * name tests
 *
 * @return {[type]}   [description]
 */
describe('Network tests:', function() {

    describe('domain()', function () {
        it('should return a fully qualified domain', function () {
            const domain = random.network.domain();
            expect(domain).to.be.a('string');
        });
    });

    describe('domain() with none standard TLD', function () {
        it('should return a fully qualified domain with a TLD that may or may not look common', function () {
            const domain = random.network.domain({standard: false});
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

            const ip = random.network.ip();

            expect(ip)
                .to.be.a('string')
                .to.match(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/);
        });
    });

    describe('ip()', function () {
        it('should return a random ip with a mask', function () {
            const ip = random.network.ip({mask: true});
            expect(ip)
                .to.be.a('string')
                .to.have.string('/');
        });
    });

    describe('ipv6()', function () {
        it('should return a random IPv6 address', function () {
            const ipv6 = random.network.ipv6();
            expect(ipv6)
                .to.be.a('string')
                .to.match(/^[0-9a-f]{4}(:[0-9a-f]{4}){7}$/);
        });
    });

});
