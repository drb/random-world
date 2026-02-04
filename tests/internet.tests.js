import { expect } from 'chai';
import random from '../index.js';

/**
 * Internet tests - higher-level application concepts (OSI layer 7)
 */
describe('Internet tests:', function() {

    describe('url()', function () {
        it('should return a URL', function () {
            const url = random.internet.url();
            expect(url).to.be.a('string');
            expect(url).to.match(/^https?:\/\/www\.\w+\.\w+(\.\w+)?$/);
        });
    });

    describe('url({ protocol: "https" })', function () {
        it('should return an HTTPS URL', function () {
            const url = random.internet.url({ protocol: 'https' });
            expect(url).to.be.a('string');
            expect(url).to.match(/^https:\/\//);
        });
    });

    describe('url({ port: 8080 })', function () {
        it('should return a URL with specific port', function () {
            const url = random.internet.url({ port: 8080 });
            expect(url).to.be.a('string');
            expect(url).to.include(':8080');
        });
    });

    describe('url({ port: "common" })', function () {
        it('should return a URL with a common service port', function () {
            const url = random.internet.url({ port: 'common' });
            expect(url).to.be.a('string');
            expect(url).to.match(/:\d+$/);
        });
    });

    describe('url({ port: "random" })', function () {
        it('should return a URL with a random port', function () {
            const url = random.internet.url({ port: 'random' });
            expect(url).to.be.a('string');
            expect(url).to.match(/:\d+$/);
        });
    });

    describe('domain()', function () {
        it('should return a fully qualified domain', function () {
            const domain = random.internet.domain();
            expect(domain).to.be.a('string');
        });
    });

    describe('domain({ standard: false })', function () {
        it('should return a domain with a non-standard TLD', function () {
            const domain = random.internet.domain({ standard: false });
            expect(domain).to.be.a('string');
        });
    });

    describe('tld()', function () {
        it('should return a top level domain', function () {
            expect(random.internet.tld()).to.be.a('string');
        });
    });

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

    describe('port() (alias)', function () {
        it('should return a port number via alias to network.port', function () {
            const port = random.internet.port();
            expect(port).to.be.a('number');
            expect(port).to.be.within(1, 65535);
        });
    });

    describe('port({ type: "common" }) (alias)', function () {
        it('should return a common port number via alias', function () {
            const port = random.internet.port({ type: 'common' });
            expect(port).to.be.a('number');
        });
    });

    describe('port({ type: "common", includeService: true }) (alias)', function () {
        it('should return a port object with service name via alias', function () {
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
