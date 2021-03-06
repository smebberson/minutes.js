'use strict';

let expect = require('chai').expect,
    clone = require('clone'),
    Minutes = require('../dist/minutes');

describe('Minutes', () => {

    //
    // Constants
    //

    const HOUR = 60;

    it('will throw if not passed an integer', function () {

        var fn = function () {
            new Minutes('asdf');
        }

        expect(fn).to.throw(Error, /accepts an integer/);

    });

    it('will throw if executed without new', function () {

        var fn = function () {
            Minutes(23); // eslint-disable-line new-cap
        }

        expect(fn).to.throw(Error, /cannot/i);

    });

    describe('will format', function () {

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

                var hours = new Minutes(2*HOUR+10);

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

        describe('using custom time unit strings', function () {

            describe('with plurals (default)', function () {

                var opts = {
                        units: {
                            'm': 'min',
                            'h': 'hr',
                            'd': 'day',
                            'w': 'wk'
                        }
                    },
                    minutes = new Minutes(10, opts),
                    hours = new Minutes(2*60+50, opts),
                    days = new Minutes(2*24*60+9*60+30, opts),
                    weeks = new Minutes(2*7*24*60+6*24*60+7*60+40, opts);

                it('for minutes', function () {

                    expect(minutes.toString()).to.equal('10 mins');

                });

                it('for hours', function () {

                    expect(hours.toString()).to.equal('2 hrs and 50 mins');

                });

                it('for days', function () {

                    expect(days.toString()).to.equal('2 days, 9 hrs and 30 mins');

                });

                it('for weeks', function () {

                    expect(weeks.toString()).to.equal('2 wks, 6 days, 7 hrs and 40 mins');

                });

            });

            describe('without plurals', function () {

                var opts = {
                        units: {
                            'm': 'm',
                            'h': 'h',
                            'd': 'd',
                            'w': 'w'
                        },
                        pluralize: false
                    },
                    minutes = new Minutes(10, opts),
                    hours = new Minutes(2*60+50, opts),
                    days = new Minutes(2*24*60+9*60+30, opts),
                    weeks = new Minutes(2*7*24*60+6*24*60+7*60+40, opts);

                it('for minutes', function () {

                    expect(minutes.toString()).to.equal('10 m');

                });

                it('for hours', function () {

                    expect(hours.toString()).to.equal('2 h and 50 m');

                });

                it('for days', function () {

                    expect(days.toString()).to.equal('2 d, 9 h and 30 m');

                });

                it('for weeks', function () {

                    expect(weeks.toString()).to.equal('2 w, 6 d, 7 h and 40 m');

                });

            });

        });

        describe('using custom tokens', function () {

            var opts = {
                    units: {
                        'm': 'm',
                        'h': 'h',
                        'd': 'd',
                        'w': 'w'
                    },
                    pluralize: false,
                    tokens: {
                        space: '',
                        comma: ' ',
                        and: ' '
                    }
                },
                minutes = new Minutes(9, opts),
                hours = new Minutes(5*60+23, opts),
                days = new Minutes(6*24*60+3*60+12, opts),
                weeks = new Minutes(6*7*24*60+3*24*60+2*60+55, opts);

            it('for minutes', function () {

                expect(minutes.toString()).to.equal('9m');

            });

            it('for hours', function () {

                expect(hours.toString()).to.equal('5h 23m');

            });

            it('for days', function () {

                expect(days.toString()).to.equal('6d 3h 12m');

            });

            it('for weeks', function () {

                expect(weeks.toString()).to.equal('6w 3d 2h 55m');

            });

            it('with regex sensitive characters', function () {

                opts = {
                    units: {
                        'm': 'm',
                        'h': 'h',
                        'd': 'd',
                        'w': 'w'
                    },
                    pluralize: false,
                    tokens: {
                        space: '',
                        comma: '^(?:=\\.*).+|$&$`$',
                        and: '^(?:=\\.*).+|$&$`$'
                    }
                };
                minutes = new Minutes(9, opts);
                hours = new Minutes(5*60+23, opts);
                days = new Minutes(6*24*60+3*60+12, opts);
                weeks = new Minutes(6*7*24*60+3*24*60+2*60+55, opts);

                expect(weeks.toString()).to.equal('6w^(?:=\\.*).+|$&$`$3d^(?:=\\.*).+|$&$`$2h^(?:=\\.*).+|$&$`$55m');

            });

        });

        describe('using custom display options', function () {

            var opts = {
                    units: {
                        'm': 'm',
                        'h': 'h',
                        'd': 'd',
                        'w': 'w'
                    },
                    pluralize: false,
                    tokens: {
                        space: '',
                        comma: ' ',
                        and: ' '
                    }
                },
                timespan = 6*7*24*60+3*24*60+2*60+55,
                minutes = new Minutes(timespan, Object.assign(clone(opts), {
                    display: {
                        'h': false,
                        'd': false,
                        'w': false
                    }
                })),
                hours = new Minutes(timespan, Object.assign(clone(opts), {
                    display: {
                        'd': false,
                        'w': false
                    }
                })),
                hoursOnly = new Minutes(timespan, Object.assign(clone(opts), {
                    display: {
                        'm': false,
                        'd': false,
                        'w': false
                    }
                })),
                days = new Minutes(timespan, Object.assign(clone(opts), {
                    display: {
                        'w': false
                    }
                })),
                daysOnly = new Minutes(timespan, Object.assign(clone(opts), {
                    display: {
                        'm': false,
                        'h': false,
                        'w': false
                    }
                })),
                weeks = new Minutes(timespan, opts),
                weeksOnly = new Minutes(timespan, Object.assign(clone(opts), {
                    display: {
                        'm': false,
                        'h': false,
                        'd': false
                    }
                }));

            it('minutes only', function () {

                expect(minutes.toString()).to.equal('64975m');

            });

            it('hours only', function () {

                expect(hoursOnly.toString()).to.equal('1082h');

            });

            it('days only', function () {

                expect(daysOnly.toString()).to.equal('45d');

            });

            it('weeks only', function () {

                expect(weeksOnly.toString()).to.equal('6w');

            });

            it('hours and minutes only', function () {

                expect(hours.toString()).to.equal('1082h 55m');

            });

            it('days, hours and minutes only', function () {

                expect(days.toString()).to.equal('45d 2h 55m');

            });

            it('weeks, days, hours and minutes', function () {

                expect(weeks.toString()).to.equal('6w 3d 2h 55m');

            });

        });

    });

});
