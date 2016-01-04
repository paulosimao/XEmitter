# XtraEmitter
Event Emitter w some bonuses

Last updated at: **04-JAN-2016 9:43 GMT-2**

------
###### IMPORTANT:
1. Events will always have `'^'` added as prefix and `'$'` as suffix. This way we avoid collateral effects on the Regex usage.

Without this approach, a listener to event 'A' would receive messages from 'A','AA','AB','AZCZXC', and any other starting w A. I understand thar unless you add a wildcard to your listen string, you want events to match on a ONE ON ONE BASIS.

Now, in case you want to listen to all `'A.*'` events, use the regex with .* (dot-star) at the end; Anything w 'A' in the middle? `'.*A.*'`

------


This is a replacement for standard EventEmitter, allows usage of Regex. Except for this, it behaves the same way the standard Event Emitter, please see below:

    var XtraEmitter = require('xtraemitter);
    it('Should Run On Regex', function (done) {
        var e    = new XtraEmitter();
        var noXs = 0;
        e.on('A.*', function (a) {
        	assert.equal('a', a);
        });
        e.on('XX.*', function (x) {
        	assert.equal('x', x);
        	noXs++;
             });
        e.on('END', function () {
        	assert.equal(2, noXs);
        	done();
        })
        e.emit('AAA', 'a');
        e.emit('XXX', 'x');
        e.emit('XXY', 'x');
        e.emit('END');
    });

#### Important: Feedback on improvements and issues are always welcome - please refer to (https://github.com/paulosimao/xtraemitter)