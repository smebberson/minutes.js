'use strict';

import { default as Minutes, HOUR } from '../dist/minutes';

describe('Minutes', () => {
    it('will throw if not passed an integer', function() {
        const fn = function() {
            new Minutes('asdf');
        };

        expect(fn).toThrow(Error, /accepts an integer/);
    });

    it('will throw if executed without new', function() {
        const fn = function() {
            Minutes(23); // eslint-disable-line new-cap
        };

        expect(fn).toThrow(Error, /cannot/i);
    });

    describe('will format', function() {
        describe('single time units', function() {
            const minute = new Minutes(1);
            const minutes = new Minutes(10);
            const hour = new Minutes(1 * 60);
            const hours = new Minutes(2 * 60);
            const day = new Minutes(24 * 60);
            const days = new Minutes(2 * 24 * 60);
            const week = new Minutes(7 * 24 * 60);
            const weeks = new Minutes(2 * 7 * 24 * 60);

            it('a minute', function() {
                expect(minute.toString()).toEqual('1 minute');
            });

            it('minutes', function() {
                expect(minutes.toString()).toEqual('10 minutes');
            });

            it('an hour', function() {
                expect(hour.toString()).toEqual('1 hour');
            });

            it('hours', function() {
                expect(hours.toString()).toEqual('2 hours');
            });

            it('a day', function() {
                expect(day.toString()).toEqual('1 day');
            });

            it('days', function() {
                expect(days.toString()).toEqual('2 days');
            });

            it('a week', function() {
                expect(week.toString()).toEqual('1 week');
            });

            it('weeks', function() {
                expect(weeks.toString()).toEqual('2 weeks');
            });
        });

        describe('multiple time units', function() {
            it('hours and minutes', function() {
                const hours = new Minutes(2 * HOUR + 10);

                expect(hours.toString()).toEqual('2 hours and 10 minutes');
            });

            it('days, hours and minutes', function() {
                const hours = new Minutes(3 * 24 * 60 + 2 * 60 + 10);

                expect(hours.toString()).toEqual(
                    '3 days, 2 hours and 10 minutes'
                );
            });

            it('weeks, days, hours and minutes', function() {
                const hours = new Minutes(
                    2 * 7 * 24 * 60 + 3 * 24 * 60 + 2 * 60 + 10
                );

                expect(hours.toString()).toEqual(
                    '2 weeks, 3 days, 2 hours and 10 minutes'
                );
            });
        });

        describe('using custom time unit strings', function() {
            describe('with plurals (default)', function() {
                const opts = {
                    units: {
                        m: 'min',
                        h: 'hr',
                        d: 'day',
                        w: 'wk'
                    }
                };
                const minutes = new Minutes(10, opts);
                const hours = new Minutes(2 * 60 + 50, opts);
                const days = new Minutes(2 * 24 * 60 + 9 * 60 + 30, opts);
                const weeks = new Minutes(
                    2 * 7 * 24 * 60 + 6 * 24 * 60 + 7 * 60 + 40,
                    opts
                );

                it('for minutes', function() {
                    expect(minutes.toString()).toEqual('10 mins');
                });

                it('for hours', function() {
                    expect(hours.toString()).toEqual('2 hrs and 50 mins');
                });

                it('for days', function() {
                    expect(days.toString()).toEqual(
                        '2 days, 9 hrs and 30 mins'
                    );
                });

                it('for weeks', function() {
                    expect(weeks.toString()).toEqual(
                        '2 wks, 6 days, 7 hrs and 40 mins'
                    );
                });
            });

            describe('without plurals', function() {
                const opts = {
                    units: {
                        m: 'm',
                        h: 'h',
                        d: 'd',
                        w: 'w'
                    },
                    pluralize: false
                };
                const minutes = new Minutes(10, opts);
                const hours = new Minutes(2 * 60 + 50, opts);
                const days = new Minutes(2 * 24 * 60 + 9 * 60 + 30, opts);
                const weeks = new Minutes(
                    2 * 7 * 24 * 60 + 6 * 24 * 60 + 7 * 60 + 40,
                    opts
                );

                it('for minutes', function() {
                    expect(minutes.toString()).toEqual('10 m');
                });

                it('for hours', function() {
                    expect(hours.toString()).toEqual('2 h and 50 m');
                });

                it('for days', function() {
                    expect(days.toString()).toEqual('2 d, 9 h and 30 m');
                });

                it('for weeks', function() {
                    expect(weeks.toString()).toEqual('2 w, 6 d, 7 h and 40 m');
                });
            });
        });

        describe('using custom tokens', function() {
            const opts = {
                units: {
                    m: 'm',
                    h: 'h',
                    d: 'd',
                    w: 'w'
                },
                pluralize: false,
                tokens: {
                    space: '',
                    comma: ' ',
                    and: ' '
                }
            };
            const minutes = new Minutes(9, opts);
            const hours = new Minutes(5 * 60 + 23, opts);
            const days = new Minutes(6 * 24 * 60 + 3 * 60 + 12, opts);
            const weeks = new Minutes(
                6 * 7 * 24 * 60 + 3 * 24 * 60 + 2 * 60 + 55,
                opts
            );

            it('for minutes', function() {
                expect(minutes.toString()).toEqual('9m');
            });

            it('for hours', function() {
                expect(hours.toString()).toEqual('5h 23m');
            });

            it('for days', function() {
                expect(days.toString()).toEqual('6d 3h 12m');
            });

            it('for weeks', function() {
                expect(weeks.toString()).toEqual('6w 3d 2h 55m');
            });

            it('with regex sensitive characters', function() {
                const opts = {
                    units: {
                        m: 'm',
                        h: 'h',
                        d: 'd',
                        w: 'w'
                    },
                    pluralize: false,
                    tokens: {
                        space: '',
                        comma: '^(?:=\\.*).+|$&$`$',
                        and: '^(?:=\\.*).+|$&$`$'
                    }
                };
                const weeks = new Minutes(
                    6 * 7 * 24 * 60 + 3 * 24 * 60 + 2 * 60 + 55,
                    opts
                );

                expect(weeks.toString()).toEqual(
                    '6w^(?:=\\.*).+|$&$`$3d^(?:=\\.*).+|$&$`$2h^(?:=\\.*).+|$&$`$55m'
                );
            });
        });

        describe('using custom display options', function() {
            const opts = {
                units: {
                    m: 'm',
                    h: 'h',
                    d: 'd',
                    w: 'w'
                },
                pluralize: false,
                tokens: {
                    space: '',
                    comma: ' ',
                    and: ' '
                }
            };
            const timespan = 6 * 7 * 24 * 60 + 3 * 24 * 60 + 2 * 60 + 55;
            const minutes = new Minutes(timespan, {
                ...opts,
                display: {
                    h: false,
                    d: false,
                    w: false
                }
            });
            const hours = new Minutes(timespan, {
                ...opts,
                display: {
                    d: false,
                    w: false
                }
            });
            const asTime = new Minutes(timespan, {
                ...opts,
                display: {
                    d: false,
                    w: false
                },
                pluralize: false,
                tokens: {
                    space: '',
                    comma: '',
                    and: ''
                },
                units: {
                    m: '',
                    h: ':',
                    d: '',
                    w: ''
                }
            });
            const hoursOnly = new Minutes(timespan, {
                ...opts,
                display: {
                    m: false,
                    d: false,
                    w: false
                }
            });
            const days = new Minutes(timespan, {
                ...opts,
                display: {
                    w: false
                }
            });
            const daysOnly = new Minutes(timespan, {
                ...opts,
                display: {
                    m: false,
                    h: false,
                    w: false
                }
            });
            const weeks = new Minutes(timespan, opts);
            const weeksOnly = new Minutes(timespan, {
                ...opts,
                display: {
                    m: false,
                    h: false,
                    d: false
                }
            });

            it('minutes only', function() {
                expect(minutes.toString()).toEqual('64975m');
            });

            it('hours only', function() {
                expect(hoursOnly.toString()).toEqual('1082h');
            });

            it('days only', function() {
                expect(daysOnly.toString()).toEqual('45d');
            });

            it('weeks only', function() {
                expect(weeksOnly.toString()).toEqual('6w');
            });

            it('hours and minutes only', function() {
                expect(hours.toString()).toEqual('1082h 55m');
            });

            it('days, hours and minutes only', function() {
                expect(days.toString()).toEqual('45d 2h 55m');
            });

            it('weeks, days, hours and minutes', function() {
                expect(weeks.toString()).toEqual('6w 3d 2h 55m');
            });

            it('expressed as time', function() {
                expect(asTime.toString()).toEqual('1082:55');
            });
        });
    });
});
