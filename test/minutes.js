'use strict';

let expect = require('chai').expect,
    Minutes = require('../src/minutes');

describe('Minutes will', () => {

    it('throw if not passed an integer', function () {

        var fn = function () {
            new Minutes('23.3');
        }

        expect(fn).to.throw;

    });

    describe('format', function () {

        describe('single time units', function () {

            var minute = new Minutes(1),
                minutes = new Minutes(10),
                hour = new Minutes(1*60),
                hours = new Minutes(2*60),
                day = new Minutes(24*60),
                days = new Minutes(2*24*60),
                week = new Minutes(7*24*60),
                weeks = new Minutes(2*7*24*60);

            it('a minute', function () {

                expect(minute.toString()).to.equal('1 minute');

            });

            it('minutes', function () {

                expect(minutes.toString()).to.equal('10 minutes');

            });

            it('an hour', function () {

                expect(hour.toString()).to.equal('1 hour');

            });

            it('hours', function () {

                expect(hours.toString()).to.equal('2 hours');

            });

            it('a day', function () {

                expect(day.toString()).to.equal('1 day');

            });

            it('days', function () {

                expect(days.toString()).to.equal('2 days');

            });

            it('a week', function () {

                expect(week.toString()).to.equal('1 week');

            });

            it('weeks', function () {

                expect(weeks.toString()).to.equal('2 weeks');

            });

        });

        describe('multiple time units', function () {

           it('hours and minutes', function () {

                var hours = new Minutes(2*Minutes.hour()+10);

                expect(hours.toString()).to.equal('2 hours and 10 minutes');

            });

            it('days, hours and minutes', function () {

                var hours = new Minutes((3*24*60)+(2*60)+10);

                expect(hours.toString()).to.equal('3 days, 2 hours and 10 minutes');

            });

            it('weeks, days, hours and minutes', function () {

                var hours = new Minutes((2*7*24*60)+(3*24*60)+(2*60)+10);

                expect(hours.toString()).to.equal('2 weeks, 3 days, 2 hours and 10 minutes');

            });

        });

    });

});