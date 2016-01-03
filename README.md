# XEmitter
Event Emitter w some bonuses

This is a replacement for standard EventEmitter, allows usage of Regex. Except for this, it behaves the same way the standard Event Emitter, please see below:

    it('Should Run On Regex', function (done) {
        var e    = new XEmitter();
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

#### Important: Feedback on improvements and issues are always welcome - please refer to (https://github.com/paulosimao/xemitter)