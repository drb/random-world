import { expect } from 'chai';
import random from '../index.js';

/**
 * date tests
 *
 * @return {[type]}   [description]
 */
describe('Date tests:', function() {

    describe('now()', function () {
        it('should return the time and date now', function () {
            expect(random.dates.now()).to.be.a('date');
        });
    });

    describe('date() after 10/03/2015', function () {
        it('should return a random date after 10/03/2015 but before 20/03/2015', function () {
            expect(random.dates.date({
                    start: '10/03/2015',
                    end: '20/03/2015'
                }))
                .to.be.a('date')
                .to.satisfy(function(date) {
                    return date >= new Date('10 Mar 2015') && date <= new Date('20 Mar 2015');
                });
        });
    });

    describe('unixtimestamp()', function () {
        it('should return a unixtimestamp', function () {
            expect(random.dates.unixtimestamp())
                .to.be.a('number');
        });
    });

    describe('dayofweek()', function () {
        it('should return a day of the week', function () {
            const dayOfWeek = random.dates.dayofweek();
            expect(dayOfWeek)
                .to.be.a('string');
        });
    });

    describe('dayofweek()', function () {
        it('should return a day of the week, in short form', function () {
            const dayOfWeek = random.dates.dayofweek({short: true});
            expect(dayOfWeek)
                .to.be.a('string')
                .to.have.length(3);
        });
    });


    describe('month()', function () {
        it('should return a month', function () {
            const month = random.dates.month();
            expect(month)
                .to.be.a('string');
        });
    });

    describe('month()', function () {
        it('should return a month, in short form', function () {
            const month = random.dates.month({short: true});
            expect(month)
                .to.be.a('string')
                .to.have.length(3);
        });
    });

     describe('year()', function () {
        it('should return a year', function () {
            const year = random.dates.year();
            expect(year)
                .to.be.a('number');
        });
    });

    describe('time()', function () {
        it('should return a time string', function () {
            const time = random.dates.time();
            expect(time)
                .to.be.a('string')
                .to.match(/^\d{2}:\d{2}:\d{2}$/);
        });
    });

    describe('hour()', function () {
        it('should return an hour (0-23)', function () {
            const hour = random.dates.hour();
            expect(hour)
                .to.be.a('number')
                .to.be.within(0, 23);
        });
    });

    describe('hour({ format24: false })', function () {
        it('should return an hour in 12-hour format (1-12)', function () {
            const hour = random.dates.hour({ format24: false });
            expect(hour)
                .to.be.a('number')
                .to.be.within(1, 12);
        });
    });

    describe('minute()', function () {
        it('should return a minute (0-59)', function () {
            const minute = random.dates.minute();
            expect(minute)
                .to.be.a('number')
                .to.be.within(0, 59);
        });
    });

    describe('second()', function () {
        it('should return a second (0-59)', function () {
            const second = random.dates.second();
            expect(second)
                .to.be.a('number')
                .to.be.within(0, 59);
        });
    });

    describe('isoDate()', function () {
        it('should return an ISO 8601 date string', function () {
            const isoDate = random.dates.isoDate();
            expect(isoDate)
                .to.be.a('string')
                .to.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
        });
    });

    describe('isoDate({ includeTime: false })', function () {
        it('should return a date-only ISO string', function () {
            const isoDate = random.dates.isoDate({ includeTime: false });
            expect(isoDate)
                .to.be.a('string')
                .to.match(/^\d{4}-\d{2}-\d{2}$/);
        });
    });

    describe('timezone()', function () {
        it('should return a timezone identifier', function () {
            const tz = random.dates.timezone();
            expect(tz)
                .to.be.a('string')
                .to.have.length.above(0);
        });
    });

});
