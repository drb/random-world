import { expect } from 'chai';
import random from '../index.js';

/**
 * Company tests
 */
describe('Company tests:', function() {

    describe('name()', function () {
        it('should return a company name', function () {
            const name = random.company.name();
            expect(name).to.be.a('string');
            expect(name.length).to.be.greaterThan(0);
        });
    });

    describe('name({ includeSuffix: false })', function () {
        it('should return a company name without suffix', function () {
            const name = random.company.name({ includeSuffix: false });
            expect(name).to.be.a('string');
            expect(name.length).to.be.greaterThan(0);
        });
    });

    describe('name({ style: "person" })', function () {
        it('should return a person-style company name', function () {
            const name = random.company.name({ style: 'person', includeSuffix: false });
            expect(name).to.be.a('string');
            expect(name).to.include('&');
        });
    });

    describe('suffix()', function () {
        it('should return a company suffix', function () {
            const suffix = random.company.suffix();
            expect(suffix).to.be.a('string');
            expect(['Inc', 'Inc.', 'LLC', 'Ltd', 'Ltd.', 'Corp', 'Corp.', 'Co', 'Co.',
                'Corporation', 'Incorporated', 'Limited', 'Company', 'PLC', 'LLP',
                'LP', 'GmbH', 'AG', 'SA', 'NV', 'BV', 'Pty Ltd', 'Pty']).to.include(suffix);
        });
    });

    describe('industry()', function () {
        it('should return an industry name', function () {
            const industry = random.company.industry();
            expect(industry).to.be.a('string');
            expect(industry.length).to.be.greaterThan(0);
        });
    });

    describe('department()', function () {
        it('should return a department name', function () {
            const department = random.company.department();
            expect(department).to.be.a('string');
            expect(department.length).to.be.greaterThan(0);
        });
    });

    describe('catchPhrase()', function () {
        it('should return a business catch phrase', function () {
            const phrase = random.company.catchPhrase();
            expect(phrase).to.be.a('string');
            expect(phrase.split(' ').length).to.be.greaterThanOrEqual(3);
        });
    });

    describe('jobTitle()', function () {
        it('should return a job title', function () {
            const title = random.company.jobTitle();
            expect(title).to.be.a('string');
            expect(title.length).to.be.greaterThan(0);
        });
    });

    describe('jobTitle({ level: "executive" })', function () {
        it('should return an executive-level job title', function () {
            const title = random.company.jobTitle({ level: 'executive' });
            expect(title).to.be.a('string');
        });
    });

    describe('jobTitle({ level: "management" })', function () {
        it('should return a management-level job title', function () {
            const title = random.company.jobTitle({ level: 'management' });
            expect(title).to.be.a('string');
        });
    });

    describe('jobTitle({ level: "individual" })', function () {
        it('should return an individual contributor job title', function () {
            const title = random.company.jobTitle({ level: 'individual' });
            expect(title).to.be.a('string');
        });
    });
});
