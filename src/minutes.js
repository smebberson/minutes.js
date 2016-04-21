'use strict';

class Minutes {
    
    constructor(minutes, opts) {
        
        this.minutes = parseInt(minutes);
        
        if (Number.isNaN()) {
            throw new Error('Minutes accepts an integer representing minutes.');
        }
        
        this.opts = opts || {};
        
    }
    
    toString () {
        
        var delta = this.minutes,
            parts = [];
        
        // Determine the time period.
        if (delta >= Minutes.week()) {
            parts.push(Minutes.formatPart(Math.floor(delta/Minutes.week()), 'w'));
            delta -= Math.floor(delta/Minutes.week())*Minutes.week();
        }
        
        if (delta >= Minutes.day()) {
            parts.push(Minutes.formatPart(Math.floor(delta/Minutes.day()), 'd'));
            delta -= Math.floor(delta/Minutes.day())*Minutes.day();
        }
        
        if (delta >= Minutes.hour()) {
            parts.push(Minutes.formatPart(Math.floor(delta/Minutes.hour()), 'h'));
            delta -= Math.floor(delta/Minutes.hour())*Minutes.hour();
        }
        
        if (delta > 0 && delta < Minutes.hour()) {
            parts.push(Minutes.formatPart(delta, 'm'));
        }
        
        return parts.join(' and ');
        
    }
    
    static formatPart (value, part) {
        
        var str = String(value);
        
        switch (part) {
            
            case 'm':
                str += ' min';
                break;
            
            case 'h':
                str += ' hr';
                break;
            
            case 'd':
                str += ' day';
                break;
            
            case 'w':
                str += ' wk';
                break;
            
        }
        
        if (value > 1) {
            str += 's';
        }
        
        return str;
        
    }
    
    static hour () {
        return 60;
    }
    
    static day () {
        return 24*Minutes.hour();
    }
    
    static week () {
        return 7*Minutes.day();
    }
    
}

module.exports = Minutes;