import { expect } from 'chai';
import random from '../index.js';

/**
 * Network tests - lower-level networking (OSI layers 1-4)
 */
describe('Network tests:', function() {

    describe('ip()', function () {
        it('should return a random ip', function () {
            const ip = random.network.ip();
            expect(ip)
                .to.be.a('string')
                .to.match(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/);
        });
    });

    describe('ip({ mask: true })', function () {
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

    describe('mac()', function () {
        it('should return a MAC address', function () {
            const mac = random.network.mac();
            expect(mac).to.be.a('string');
            expect(mac).to.match(/^[0-9a-f]{2}(:[0-9a-f]{2}){5}$/);
        });
    });

    describe('mac({ separator: "-" })', function () {
        it('should return a MAC address with dash separator', function () {
            const mac = random.network.mac({ separator: '-' });
            expect(mac).to.be.a('string');
            expect(mac).to.match(/^[0-9a-f]{2}(-[0-9a-f]{2}){5}$/);
        });
    });

    describe('mac({ uppercase: true })', function () {
        it('should return an uppercase MAC address', function () {
            const mac = random.network.mac({ uppercase: true });
            expect(mac).to.be.a('string');
            expect(mac).to.match(/^[0-9A-F]{2}(:[0-9A-F]{2}){5}$/);
        });
    });

    describe('port()', function () {
        it('should return a port number', function () {
            const port = random.network.port();
            expect(port).to.be.a('number');
            expect(port).to.be.within(1, 65535);
        });
    });

    describe('port({ type: "common" })', function () {
        it('should return a common port number', function () {
            const port = random.network.port({ type: 'common' });
            expect(port).to.be.a('number');
        });
    });

    describe('port({ type: "common", includeService: true })', function () {
        it('should return a port object with service name', function () {
            const result = random.network.port({ type: 'common', includeService: true });
            expect(result).to.be.an('object');
            expect(result).to.have.property('port');
            expect(result).to.have.property('service');
        });
    });

    describe('port({ type: "registered" })', function () {
        it('should return a registered port (1024-49151)', function () {
            const port = random.network.port({ type: 'registered' });
            expect(port).to.be.a('number');
            expect(port).to.be.within(1024, 49151);
        });
    });

    describe('port({ type: "dynamic" })', function () {
        it('should return a dynamic port (49152-65535)', function () {
            const port = random.network.port({ type: 'dynamic' });
            expect(port).to.be.a('number');
            expect(port).to.be.within(49152, 65535);
        });
    });

});
