/**
 * Created by paulo.simao on 03/01/2016.
 */
var XEmitter = require('../index');
var assert   = require('assert');
describe('XEmitter Test', function () {
	it('Should Run Basic Test', function (done) {
		var e = new XEmitter();
		e.on('.*', function (a, b, c) {
			console.log(`ON EVENT .*: ${a},${b},${c}`);
			//delete e;
			done();
		});

		e.emit('x', 'a', 'b', 'c');
		console.log('ok');

	});

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
		});
		e.emit('AAA', 'a');
		e.emit('XXX', 'x');
		e.emit('XXY', 'x');
		e.emit('END');
	});

	it('Should remove listener', function (done) {
		var e  = new XEmitter();
		var fn = function () {
			assert(false, 'Should not be triggered');
		};

		e.on('.*', fn);
		e.removeListener('.*', fn);
		e.emit('END');
		e.on('END', function () {
			done(0);
		});
		e.emit('END');

	});

	it('Should once be triggered once', function (done) {
		var e     = new XEmitter();
		var count = 0;
		var fn    = function () {
			assert(false, 'Should not be triggered');
		};

		e.once('A', function () {
			count++;
		});

		e.emit('A');

		e.emit('A');
		e.emit('A');

		e.on('END', function () {
			assert.equal(1, count);
			done();
		});
		e.emit('END');

	});

});