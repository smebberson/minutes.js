# minutes.js

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

## Change log

[Review the change log for all changes.](CHANGELOG.md)

## License

[MIT](LICENSE.md)
