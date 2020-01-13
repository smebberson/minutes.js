'use strict';

import { default as minutes, HOUR } from '../dist/minutes';

describe('Minutes', () => {
    it('will throw if not passed an integer', function() {
        const fn = function() {
            minutes('asdf');
        };

        expect(fn).toThrow(Error, /accepts an integer/);
    });

    describe('will format', function() {
        describe('single time units', function() {
            it('a minute', function() {
                expect(minutes(1)).toEqual('1 minute');
            });

            it('minutes', function() {
                expect(minutes(10)).toEqual('10 minutes');
            });

            it('an hour', function() {
                expect(minutes(60)).toEqual('1 hour');
            });

            it('hours', function() {
                expect(minutes(2 * 60)).toEqual('2 hours');
            });

            it('a day', function() {
                expect(minutes(24 * 60)).toEqual('1 day');
            });

            it('days', function() {
                expect(minutes(2 * 24 * 60)).toEqual('2 days');
            });

            it('a week', function() {
                expect(minutes(7 * 24 * 60)).toEqual('1 week');
            });

            it('weeks', function() {
                expect(minutes(2 * 7 * 24 * 60)).toEqual('2 weeks');
            });
        });

        describe('multiple time units', function() {
            it('hours and minutes', function() {
                expect(minutes(2 * HOUR + 10)).toEqual(
                    '2 hours and 10 minutes'
                );
            });

            it('days, hours and minutes', function() {
                expect(minutes(3 * 24 * 60 + 2 * 60 + 10)).toEqual(
                    '3 days, 2 hours and 10 minutes'
                );
            });

            it('weeks, days, hours and minutes', function() {
                expect(
                    minutes(2 * 7 * 24 * 60 + 3 * 24 * 60 + 2 * 60 + 10)
                ).toEqual('2 weeks, 3 days, 2 hours and 10 minutes');
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

                it('for minutes', function() {
                    expect(minutes(10, opts)).toEqual('10 mins');
                });

                it('for hours', function() {
                    expect(minutes(2 * 60 + 50, opts)).toEqual(
                        '2 hrs and 50 mins'
                    );
                });

                it('for days', function() {
                    expect(minutes(2 * 24 * 60 + 9 * 60 + 30, opts)).toEqual(
                        '2 days, 9 hrs and 30 mins'
                    );
                });

                it('for weeks', function() {
                    expect(
                        minutes(
                            2 * 7 * 24 * 60 + 6 * 24 * 60 + 7 * 60 + 40,
                            opts
                        )
                    ).toEqual('2 wks, 6 days, 7 hrs and 40 mins');
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

                it('for minutes', function() {
                    expect(minutes(10, opts)).toEqual('10 m');
                });

                it('for hours', function() {
                    expect(minutes(2 * 60 + 50, opts)).toEqual('2 h and 50 m');
                });

                it('for days', function() {
                    expect(minutes(2 * 24 * 60 + 9 * 60 + 30, opts)).toEqual(
                        '2 d, 9 h and 30 m'
                    );
                });

                it('for weeks', function() {
                    expect(
                        minutes(
                            2 * 7 * 24 * 60 + 6 * 24 * 60 + 7 * 60 + 40,
                            opts
                        )
                    ).toEqual('2 w, 6 d, 7 h and 40 m');
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

            it('for minutes', function() {
                expect(minutes(9, opts)).toEqual('9m');
            });

            it('for hours', function() {
                expect(minutes(5 * 60 + 23, opts)).toEqual('5h 23m');
            });

            it('for days', function() {
                expect(minutes(6 * 24 * 60 + 3 * 60 + 12, opts)).toEqual(
                    '6d 3h 12m'
                );
            });

            it('for weeks', function() {
                expect(
                    minutes(6 * 7 * 24 * 60 + 3 * 24 * 60 + 2 * 60 + 55, opts)
                ).toEqual('6w 3d 2h 55m');
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

                expect(
                    minutes(6 * 7 * 24 * 60 + 3 * 24 * 60 + 2 * 60 + 55, opts)
                ).toEqual(
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

            it('minutes only', function() {
                expect(
                    minutes(timespan, {
                        ...opts,
                        display: {
                            h: false,
                            d: false,
                            w: false
                        }
                    })
                ).toEqual('64975m');
            });

            it('hours only', function() {
                expect(
                    minutes(timespan, {
                        ...opts,
                        display: {
                            m: false,
                            d: false,
                            w: false
                        }
                    })
                ).toEqual('1082h');
            });

            it('days only', function() {
                expect(
                    minutes(timespan, {
                        ...opts,
                        display: {
                            m: false,
                            h: false,
                            w: false
                        }
                    })
                ).toEqual('45d');
            });

            it('weeks only', function() {
                expect(
                    minutes(timespan, {
                        ...opts,
                        display: {
                            m: false,
                            h: false,
                            d: false
                        }
                    })
                ).toEqual('6w');
            });

            it('hours and minutes only', function() {
                expect(
                    minutes(timespan, {
                        ...opts,
                        display: {
                            d: false,
                            w: false
                        }
                    })
                ).toEqual('1082h 55m');
            });

            it('days, hours and minutes only', function() {
                expect(
                    minutes(timespan, {
                        ...opts,
                        display: {
                            w: false
                        }
                    })
                ).toEqual('45d 2h 55m');
            });

            it('weeks, days, hours and minutes', function() {
                expect(minutes(timespan, opts)).toEqual('6w 3d 2h 55m');
            });

            it('expressed as time', function() {
                expect(
                    minutes(timespan, {
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
                    })
                ).toEqual('1082:55');
            });
        });
    });
});
