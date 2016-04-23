# minutes.js

[![Travis](https://img.shields.io/travis/smebberson/minutes.js.svg)](smebberson/minutes.js)
[![npm](https://img.shields.io/npm/v/minutes.js.svg)](smebberson/minutes.js)
[![Bower](https://img.shields.io/bower/v/minutes.js.svg)](smebberson/minutes.js)
[![codecov.io](https://codecov.io/github/smebberson/minutes.js/coverage.svg?branch=master)](https://codecov.io/github/smebberson/minutes.js?branch=master)

Minutes.js is a JavaScript library for working with minutes. Put minutes in, and get a string representing those minutes in weeks, days, hours and minutes.

## Install

```
$ npm install minutes.js
$ bower install minutes.js
```

Supports browser, Node.js and AMD (and ES6 packages via `src/minutes.js`).

## API

```
var minutes = new Minutes(10),
    hours = new Minutes(2*60+50),
    days = new Minutes(2*24*60+9*60+30),
    weeks = new Minutes(2*7*24*60+6*24*60+7*60+40);

minutes.toString(); // 10 minutes
hours.toString(); // 2 hours and 50 minutes
days.toString(); // 2 days, 6 hours and 30 minutes
weeks.toString(); // 2 weeks, 6 days, 7 hours and 40 minutes
```

To alter the verbosity of the output:

```
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

minutes.toString(); // 10 mins
hours.toString(); // 2 hrs and 50 mins
days.toString(); // 2 days, 6 hrs and 30 mins
weeks.toString(); // 2 wks, 6 days, 7 hrs and 40 mins
```

Or even shorter:

```
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
    minutes = new Minutes(10, opts),
    hours = new Minutes(2*60+50, opts),
    days = new Minutes(2*24*60+9*60+30, opts),
    weeks = new Minutes(2*7*24*60+6*24*60+7*60+40, opts);

minutes.toString(); // 10m
hours.toString(); // 2h 50m
days.toString(); // 2d 6h 30m
weeks.toString(); // 2w 6d 7h 40m
```

Or something else:

```
var opts = {
        units: {
            'm': '',
            'h': '',
            'd': '',
            'w': ''
        },
        pluralize: false,
        tokens: {
            space: '',
            comma: '.',
            and: '.'
        }
    },
    minutes = new Minutes(10, opts),
    hours = new Minutes(2*60+50, opts),
    days = new Minutes(2*24*60+9*60+30, opts),
    weeks = new Minutes(2*7*24*60+6*24*60+7*60+40, opts);

minutes.toString(); // 10m
hours.toString(); // 2h:50m
days.toString(); // 2d:6h:30m
weeks.toString(); // 2w:6h:7h:40m
```

## Change log

[Review the change log for all changes.](CHANGELOG.md)

## License

[MIT](LICENSE.md)
