import { expect } from 'chai';
import random from '../index.js';

/**
 * Internet tests
 */
describe('Internet tests:', function() {

    describe('username()', function () {
        it('should return a username', function () {
            const username = random.internet.username();
            expect(username).to.be.a('string');
            expect(username.length).to.be.greaterThan(0);
        });
    });

    describe('username({ style: "adjective_noun" })', function () {
        it('should return an adjective_noun style username', function () {
            const username = random.internet.username({ style: 'adjective_noun' });
            expect(username).to.be.a('string');
            expect(username.length).to.be.greaterThan(0);
        });
    });

    describe('username({ style: "name_number" })', function () {
        it('should return a name_number style username', function () {
            const username = random.internet.username({ style: 'name_number' });
            expect(username).to.be.a('string');
            expect(username).to.match(/\d+$/);
        });
    });

    describe('password()', function () {
        it('should return a password', function () {
            const password = random.internet.password();
            expect(password).to.be.a('string');
            expect(password.length).to.equal(16);
        });
    });

    describe('password({ length: 32 })', function () {
        it('should return a password of specified length', function () {
            const password = random.internet.password({ length: 32 });
            expect(password).to.be.a('string');
            expect(password.length).to.equal(32);
        });
    });

    describe('password({ symbols: false })', function () {
        it('should return a password without symbols', function () {
            const password = random.internet.password({ symbols: false });
            expect(password).to.be.a('string');
            expect(password).to.match(/^[a-zA-Z0-9]+$/);
        });
    });

    describe('userAgent()', function () {
        it('should return a user agent string', function () {
            const ua = random.internet.userAgent();
            expect(ua).to.be.a('string');
            expect(ua).to.include('Mozilla');
        });
    });

    describe('mac()', function () {
        it('should return a MAC address', function () {
            const mac = random.internet.mac();
            expect(mac).to.be.a('string');
            expect(mac).to.match(/^[0-9a-f]{2}(:[0-9a-f]{2}){5}$/);
        });
    });

    describe('mac({ separator: "-" })', function () {
        it('should return a MAC address with dash separator', function () {
            const mac = random.internet.mac({ separator: '-' });
            expect(mac).to.be.a('string');
            expect(mac).to.match(/^[0-9a-f]{2}(-[0-9a-f]{2}){5}$/);
        });
    });

    describe('mac({ uppercase: true })', function () {
        it('should return an uppercase MAC address', function () {
            const mac = random.internet.mac({ uppercase: true });
            expect(mac).to.be.a('string');
            expect(mac).to.match(/^[0-9A-F]{2}(:[0-9A-F]{2}){5}$/);
        });
    });

    describe('port()', function () {
        it('should return a port number', function () {
            const port = random.internet.port();
            expect(port).to.be.a('number');
            expect(port).to.be.within(1, 65535);
        });
    });

    describe('port({ type: "common" })', function () {
        it('should return a common port number', function () {
            const port = random.internet.port({ type: 'common' });
            expect(port).to.be.a('number');
        });
    });

    describe('port({ type: "common", includeService: true })', function () {
        it('should return a port object with service name', function () {
            const result = random.internet.port({ type: 'common', includeService: true });
            expect(result).to.be.an('object');
            expect(result).to.have.property('port');
            expect(result).to.have.property('service');
        });
    });

    describe('httpMethod()', function () {
        it('should return an HTTP method', function () {
            const method = random.internet.httpMethod();
            expect(method).to.be.a('string');
            expect(['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS', 'TRACE', 'CONNECT']).to.include(method);
        });
    });

    describe('httpStatusCode()', function () {
        it('should return an HTTP status code', function () {
            const code = random.internet.httpStatusCode();
            expect(code).to.be.a('number');
            expect(code).to.be.within(100, 599);
        });
    });

    describe('httpStatusCode({ type: "success" })', function () {
        it('should return a success status code (2xx)', function () {
            const code = random.internet.httpStatusCode({ type: 'success' });
            expect(code).to.be.a('number');
            expect(code).to.be.within(200, 299);
        });
    });

    describe('httpStatusCode({ includeMessage: true })', function () {
        it('should return a status code with message', function () {
            const result = random.internet.httpStatusCode({ includeMessage: true });
            expect(result).to.be.an('object');
            expect(result).to.have.property('code');
            expect(result).to.have.property('message');
        });
    });

    describe('mimeType()', function () {
        it('should return a MIME type', function () {
            const mime = random.internet.mimeType();
            expect(mime).to.be.a('string');
            expect(mime).to.include('/');
        });
    });
});
