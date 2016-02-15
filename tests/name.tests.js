var expect = require('chai').expect,
    random = require('../index');

/**
 * name tests
 *
 * @return {[type]}   [description]
 */
describe('Name tests:', function() {

    describe('fullname()', function () {
        it('should return a full person\'s name', function () {
            expect(random.names.fullname()).to.be.a('string');
        });
    });

    describe('firstname()', function () {
        it('should return a person\'s first name', function () {
            expect(random.names.firstname()).to.be.a('string');
        });
    });

    describe('firstname()', function () {
        it('should return a person\'s first name [lowercased]', function () {
            expect(random.names.firstname({charcase: 'lower'}))
                .to.be.a('string')
                .to.match(/[a-z]+$/);
        });
    });

    describe('FIRSTNAME()', function () {
        it('should return a person\'s first name [UPPERCASED]', function () {
            expect(random.names.firstname({charcase: 'upper'}))
                .to.be.a('string')
                .to.match(/[A-Z]+$/);
        });
    });

    describe('lastname()', function () {
        it('should return a person\'s last name', function () {
            expect(random.names.lastname())
                .to.be.a('string');
        });
    });

    describe('lastname()', function () {
        it('should return a person\'s last name [lowercased]', function () {
            expect(random.names.lastname({charcase: 'lower'}))
                .to.be.a('string')
                .to.match(/[a-z]+$/);
        });
    });

    describe('LASTNAME()', function () {
        it('should return a person\'s last name [UPPERCASED]', function () {
            expect(random.names.lastname({charcase: 'upper'}))
                .to.be.a('string')
                .to.match(/[A-Z]+$/);
        });
    });

    describe('lastname(startsWith: Bu)', function () {
        it('should return a last name that starts with Bu', function () {
            expect(random.names.lastname({startsWith: 'Bu'}))
                .to.be.a('string')
                .to.have.string('Bu');
        });
    });


    describe('email', function () {
        it('should return an email address', function () {
            // console.log(random.names.email({hasDot: true, 'charcase': 'upper', 'startsWith': 'bu'}));
            expect(random.names.email())
                .to.be.a('string')
                .to.have.string('@');
        });
    });

    describe('email', function () {
        it('should return an email address with names starting Bu and uppercase', function () {
            expect(random.names.email({hasDot: true, 'charcase': 'upper', 'startsWith': 'bu'}))
                .to.be.a('string')
                .to.match(/[A-Z]+$/)
                .to.have.string('@');
        });
    });

    describe('email', function () {
        it('should return a lowercase email address with a plus address included', function () {
            var address = random.names.email({hasDot: true, 'charcase': 'lower', hasPlusAddress: true, standard: false});
            // console.log(address);
            expect(address)
                .to.be.a('string')
                .to.match(/[a-z]+$/)
                .to.have.string('@')
                .to.have.string('+');
        });
    });
});
