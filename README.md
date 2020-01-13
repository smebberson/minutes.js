# minutes.js

[![Travis](https://img.shields.io/travis/smebberson/minutes.js.svg)](smebberson/minutes.js)
[![npm](https://img.shields.io/npm/v/minutes.js.svg)](smebberson/minutes.js)
[![codecov.io](https://codecov.io/github/smebberson/minutes.js/coverage.svg?branch=master)](https://codecov.io/github/smebberson/minutes.js?branch=master)

Minutes.js is a JavaScript library for working with minutes. Put minutes in, and get a string representing those minutes in weeks, days, hours and minutes.

## Install

```
$ npm install minutes.js
```

Supports browser, Node.js and AMD (and ES6 packages via `src/minutes.js`).

## API

```
minutes(10);                        // 10 minutes
minutes(2*60+50);                   // 2 hours and 50 minutes
minutes(2*24*60+9*60+30);           // 2 days, 6 hours and 30 minutes
minutes(2*7*24*60+6*24*60+7*60+40); // 2 weeks, 6 days, 7 hours and 40 minutes
```

### Minutes

Minutes takes a `minutes` number. It should be an integer representing minutes.

### Options

Minutes takes an `options` Object. They're all optional.

#### Units

`units` is an `Object` that will define the strings used to represent the units. By default, these strings are verbose:

```
units: {
    'm': 'minute',
    'h': 'hour',
    'd': 'day',
    'w': 'week'
}
```

You can customise these to anything you like:

```
const opts = {
    units: {
        'm': 'min',
        'h': 'hr',
        'd': 'day',
        'w': 'wk'
    }
};

minutes(10, opts);                          // 10 mins
minutes(2*60+50, opts);                     // 2 hrs and 50 mins
minutes(2*24*60+9*60+30, opts);             // 2 days, 6 hrs and 30 mins
minutes(2*7*24*60+6*24*60+7*60+40, opts);   // 2 wks, 6 days, 7 hrs and 40 mins
```

#### Pluralize

`pluralize` is a `boolean` that will determine if the strings used to represent a unit should be pluralized if there is more than one of a particular unit. `pluralize` is `true` by default to produce `2 hours and 1 minute`.

You can alter this:

```
const opts = {
    units: {
        'm': 'min',
        'h': 'hr',
        'd': 'day',
        'w': 'wk'
    },
    pluralize: false
};

minutes(10, opts);                          // 10 min
minutes(2*60+50, opts);                     // 2 hr and 50 min
minutes(2*24*60+9*60+30, opts);             // 2 day, 6 hr and 30 min
minutes(2*7*24*60+6*24*60+7*60+40, opts);   // 2 wk, 6 day, 7 hr and 40 min
```

#### Tokens

`tokens` is an `Object` that represents the strings used between the various units. The default is:

```
tokens: {
    'space': ' ',
    'comma': ', ',
    'and': 'and ',
    'plural': 's'
}
```

You can customise this:

```
const opts = {
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
};

minutes(10, opts);                          // 10m
minutes(2*60+50, opts);                     // 2h 50m
minutes(2*24*60+9*60+30, opts);             // 2d 6h 30m
minutes(2*7*24*60+6*24*60+7*60+40, opts);   // 2w 6d 7h 40m
```

Or something else:

```
const opts = {
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
};

minutes(10, opts);                          // 10m
minutes(2*60+50, opts);                     // 2h:50m
minutes(2*24*60+9*60+30, opts);             // 2d:6h:30m
minutes(2*7*24*60+6*24*60+7*60+40, opts);   // 2w:6h:7h:40m
```

#### Display

`display` is an `Object` which dictates the units to be displayed. It defaults to all units:

```
display: {
    'm': true,
    'h': true,
    'd': true,
    'w': true
}
```

You can change this to display only certain units:

```

minutes(10, {
    display: {
        'h': false,
        'd': false,
        'w': false
    }
});                                     // 10 minutes
minutes(2*60+50, {
    display: {
        'm': false,
        'd': false,
        'w': false
    }
});                                     // 2 hours
minutes(1*24*60+9*60+30, {
    display: {
        'm': false,
        'h': false,
        'w': false
    }
});                                     // 1 day
minutes(3*7*24*60+6*24*60+7*60+40, {
    display: {
        'm': false,
        'h': false,
        'd': false
    }
});                                     // 3 weeks
```

## Change log

[Review the change log for all changes.](CHANGELOG.md)

## License

[MIT](LICENSE.md)
