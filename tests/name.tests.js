import { expect } from 'chai';
import random from '../index.js';

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

    describe('firstname({ gender: "male" })', function () {
        it('should return a male first name', function () {
            expect(random.names.firstname({ gender: 'male' }))
                .to.be.a('string');
        });
    });

    describe('firstname({ gender: "female" })', function () {
        it('should return a female first name', function () {
            expect(random.names.firstname({ gender: 'female' }))
                .to.be.a('string');
        });
    });

    describe('firstname({ gender: "nonbinary" })', function () {
        it('should return a nonbinary/gender-neutral first name', function () {
            expect(random.names.firstname({ gender: 'nonbinary' }))
                .to.be.a('string');
        });
    });

    describe('title()', function () {
        it('should return a title', function () {
            expect(random.names.title())
                .to.be.a('string');
        });
    });

    describe('title({ gender: "male" })', function () {
        it('should return a male-appropriate title (Mr, Master, Dr, Professor)', function () {
            const title = random.names.title({ gender: 'male' });
            expect(title).to.be.a('string');
            expect(['Mr', 'Master', 'Dr', 'Professor']).to.include(title);
        });
    });

    describe('title({ gender: "female" })', function () {
        it('should return a female-appropriate title (Miss, Mrs, Ms, Dr, Professor)', function () {
            const title = random.names.title({ gender: 'female' });
            expect(title).to.be.a('string');
            expect(['Miss', 'Mrs', 'Ms', 'Dr', 'Professor']).to.include(title);
        });
    });

    describe('title({ gender: "nonbinary" })', function () {
        it('should return a nonbinary-appropriate title (Mx, Dr, Professor)', function () {
            const title = random.names.title({ gender: 'nonbinary' });
            expect(title).to.be.a('string');
            expect(['Mx', 'Dr', 'Professor']).to.include(title);
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
                // .to.match(/[A-Z]+$/)
                .to.have.string('@');
        });
    });

    describe('email', function () {
        it('should return a lowercase email address with a plus address included', function () {
            const address = random.names.email({hasDot: true, 'charcase': 'lower', hasPlusAddress: true, standard: false});
            // console.log(address);
            expect(address)
                .to.be.a('string')
                // .to.match(/[a-z]+$/)
                .to.have.string('@')
                .to.have.string('+');
        });
    });
});
