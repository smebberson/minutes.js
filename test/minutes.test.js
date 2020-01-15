'use strict';

import { default as minutes, HOUR } from '../src/minutes';

describe('minutes', () => {
    test('will throw if not passed an integer', () => {
        const fn = () => {
            minutes('asdf');
        };

        expect(fn).toThrow(Error, /accepts an integer/);
    });
    describe('will use Number.isNan', () => {
        const originalNumberIsNan = Number.isNaN;

        beforeAll(() => {
            Number.isNaN = undefined;
        });

        afterAll(() => {
            Number.isNaN = originalNumberIsNan;
        });
        test('before defaulting to isNaN', () => {
            isNaN = Number.isNaN;
            Number.isNaN = undefined;

            const fn = () => {
                minutes('asdf');
            };

            expect(fn).toThrow(Error, /accepts an integer/);

            Number.isNaN = isNaN;
        });
    });
});

describe('minutes will format single time units', () => {
    test('a minute', () => {
        expect(minutes(1)).toEqual('1 minute');
    });

    test('minutes', () => {
        expect(minutes(10)).toEqual('10 minutes');
    });

    test('an hour', () => {
        expect(minutes(60)).toEqual('1 hour');
    });

    test('hours', () => {
        expect(minutes(2 * 60)).toEqual('2 hours');
    });

    test('a day', () => {
        expect(minutes(24 * 60)).toEqual('1 day');
    });

    test('days', () => {
        expect(minutes(2 * 24 * 60)).toEqual('2 days');
    });

    test('a week', () => {
        expect(minutes(7 * 24 * 60)).toEqual('1 week');
    });

    test('weeks', () => {
        expect(minutes(2 * 7 * 24 * 60)).toEqual('2 weeks');
    });
});

describe('minutes will format multiple time units', () => {
    test('hours and minutes', () => {
        expect(minutes(2 * HOUR + 10)).toEqual('2 hours and 10 minutes');
    });

    test('days, hours and minutes', () => {
        expect(minutes(3 * 24 * 60 + 2 * 60 + 10)).toEqual(
            '3 days, 2 hours and 10 minutes'
        );
    });

    test('weeks, days, hours and minutes', () => {
        expect(minutes(2 * 7 * 24 * 60 + 3 * 24 * 60 + 2 * 60 + 10)).toEqual(
            '2 weeks, 3 days, 2 hours and 10 minutes'
        );
    });
});

describe('minutes will format using custom time unit strings', () => {
    describe('with plurals (default)', () => {
        const opts = {
            units: {
                m: 'min',
                h: 'hr',
                d: 'day',
                w: 'wk'
            }
        };

        test('for minutes', () => {
            expect(minutes(10, opts)).toEqual('10 mins');
        });

        test('for hours', () => {
            expect(minutes(2 * 60 + 50, opts)).toEqual('2 hrs and 50 mins');
        });

        test('for hours and no minutes', () => {
            expect(
                minutes(2 * 60, {
                    ...opts,
                    display: { inclusive: true, d: false, w: false }
                })
            ).toEqual('2 hrs and 0 mins');
        });

        test('for days', () => {
            expect(minutes(2 * 24 * 60 + 9 * 60 + 30, opts)).toEqual(
                '2 days, 9 hrs and 30 mins'
            );
        });

        test('for weeks', () => {
            expect(
                minutes(2 * 7 * 24 * 60 + 6 * 24 * 60 + 7 * 60 + 40, opts)
            ).toEqual('2 wks, 6 days, 7 hrs and 40 mins');
        });
    });

    describe('without plurals', () => {
        const opts = {
            units: {
                m: 'm',
                h: 'h',
                d: 'd',
                w: 'w'
            },
            pluralize: false
        };

        test('for minutes', () => {
            expect(minutes(10, opts)).toEqual('10 m');
        });

        test('for hours', () => {
            expect(minutes(2 * 60 + 50, opts)).toEqual('2 h and 50 m');
        });

        test('for days', () => {
            expect(minutes(2 * 24 * 60 + 9 * 60 + 30, opts)).toEqual(
                '2 d, 9 h and 30 m'
            );
        });

        test('for weeks', () => {
            expect(
                minutes(2 * 7 * 24 * 60 + 6 * 24 * 60 + 7 * 60 + 40, opts)
            ).toEqual('2 w, 6 d, 7 h and 40 m');
        });
    });
});

describe('minutes will format using custom tokens', () => {
    const opts = {
        units: {
            m: 'm',
            h: 'h',
            d: 'd',
            w: 'w'
        },
        pluralize: false,
        tokens: {
            conjunction: ' ',
            delimiter: ' ',
            space: ''
        }
    };

    test('for minutes', () => {
        expect(minutes(9, opts)).toEqual('9m');
    });

    test('for hours', () => {
        expect(minutes(5 * 60 + 23, opts)).toEqual('5h 23m');
    });

    test('for days', () => {
        expect(minutes(6 * 24 * 60 + 3 * 60 + 12, opts)).toEqual('6d 3h 12m');
    });

    test('for weeks', () => {
        expect(
            minutes(6 * 7 * 24 * 60 + 3 * 24 * 60 + 2 * 60 + 55, opts)
        ).toEqual('6w 3d 2h 55m');
    });

    test('with regex sensitive characters', () => {
        const opts = {
            units: {
                m: 'm',
                h: 'h',
                d: 'd',
                w: 'w'
            },
            pluralize: false,
            tokens: {
                conjunction: '^(?:=\\.*).+|$&$`$',
                delimiter: '^(?:=\\.*).+|$&$`$',
                space: ''
            }
        };

        expect(
            minutes(6 * 7 * 24 * 60 + 3 * 24 * 60 + 2 * 60 + 55, opts)
        ).toEqual(
            '6w^(?:=\\.*).+|$&$`$3d^(?:=\\.*).+|$&$`$2h^(?:=\\.*).+|$&$`$55m'
        );
    });
});

describe('minutes will format using inclusive display options', () => {
    test('inclusive hours', () => {
        expect(
            minutes(50, {
                display: {
                    inclusive: true,
                    d: false,
                    w: false
                },
                pluralize: false,
                tokens: {
                    conjunction: ':',
                    delimiter: '',
                    space: ''
                },
                units: {
                    m: '',
                    h: '',
                    d: '',
                    w: ''
                }
            })
        ).toEqual('0:50');
    });
    test('inclusive days and hours', () => {
        expect(
            minutes(2 * 60 + 50, {
                display: {
                    inclusive: true,
                    w: false
                },
                pluralize: true,
                tokens: {
                    conjunction: ' ',
                    delimiter: ' ',
                    space: ''
                },
                units: {
                    m: 'min',
                    h: 'hr',
                    d: 'day'
                }
            })
        ).toEqual('0days 2hrs 50mins');
    });
    test('inclusive weeks, days and hours', () => {
        expect(
            minutes(2 * 60 + 50, {
                display: {
                    inclusive: true
                },
                pluralize: true,
                tokens: {
                    conjunction: ' ',
                    delimiter: ' ',
                    space: ''
                },
                units: {
                    m: 'min',
                    h: 'hr',
                    d: 'day',
                    w: 'wk'
                }
            })
        ).toEqual('0wks 0days 2hrs 50mins');
    });
});

describe('minutes will format using double-digit display options', () => {
    test('double digit minutes', () => {
        expect(minutes(9, { display: { mm: true } })).toEqual('09 minutes');
    });

    test('double digit hours and minutes', () => {
        expect(minutes(129, { display: { hh: true, mm: true } })).toEqual(
            '02 hours and 09 minutes'
        );
    });

    test('double digit days, hours and minutes', () => {
        expect(
            minutes(2 * 24 * 60 + 129, {
                display: { dd: true, hh: true, mm: true }
            })
        ).toEqual('02 days, 02 hours and 09 minutes');
    });

    test('double digit weeks, days, hours and minutes', () => {
        expect(
            minutes(4 * 7 * 24 * 60 + 6 * 24 * 60 + 7 * 60 + 7, {
                display: { dd: true, hh: true, mm: true, ww: true }
            })
        ).toEqual('04 weeks, 06 days, 07 hours and 07 minutes');
    });
});

describe('minutes will format using custom display options', () => {
    const opts = {
        units: {
            m: 'm',
            h: 'h',
            d: 'd',
            w: 'w'
        },
        pluralize: false,
        tokens: {
            conjunction: ' ',
            delimiter: ' ',
            space: ''
        }
    };
    const timespan = 6 * 7 * 24 * 60 + 3 * 24 * 60 + 2 * 60 + 55;

    test('minutes only', () => {
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

    test('hours only', () => {
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

    test('days only', () => {
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

    test('weeks only', () => {
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

    test('hours and minutes only', () => {
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

    test('days, hours and minutes only', () => {
        expect(
            minutes(timespan, {
                ...opts,
                display: {
                    w: false
                }
            })
        ).toEqual('45d 2h 55m');
    });

    test('weeks, days, hours and minutes', () => {
        expect(minutes(timespan, opts)).toEqual('6w 3d 2h 55m');
    });

    test('expressed as time', () => {
        expect(
            minutes(timespan, {
                ...opts,
                display: {
                    d: false,
                    w: false
                },
                pluralize: false,
                tokens: {
                    conjunction: '',
                    delimiter: '',
                    space: ''
                },
                units: {
                    m: '',
                    h: ':',
                    d: '',
                    w: ''
                }
            })
        ).toEqual('1082:55');
        expect(
            minutes(timespan + 2, {
                ...opts,
                display: {
                    d: false,
                    w: false
                },
                pluralize: false,
                tokens: {
                    conjunction: ':',
                    delimiter: '',
                    space: ''
                },
                units: {
                    m: '',
                    h: '',
                    d: '',
                    w: ''
                }
            })
        ).toEqual('1082:57');
    });
});

describe('minutes will automate options using presets', () => {
    test('the time preset', () => {
        expect(minutes(9, { preset: 'time' })).toEqual('00:09');
    });
    test('the time preset with overrides', () => {
        expect(
            minutes(9, { preset: 'time', units: { h: 'h', m: 'm' } })
        ).toEqual('00h:09m');
    });
});
