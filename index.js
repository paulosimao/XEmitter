/**
 * Created by paulo.simao on 03/01/2016.
 */
function XEmitter() {
	this.listeners = {};
}

XEmitter.prototype.addListener        = function (event, listener) {
	//var r = new RegExp(event);
	//this.listeners[listener] = new RegExp(event);
	if (!this.listeners[event]) {
		this.listeners[event] = {
			regex: new RegExp(event),
			listeners: []
		};
	}
	this.listeners[event].listeners.push(listener);


};
XEmitter.prototype.emit               = function (event, args) {
	var event = arguments[0];
	var args1 = [];
	for (var i = 1; i < arguments.length; i++) {
		args1.push(arguments[i]);
	}

	for (var l in this.listeners) {
		if (this.listeners[l].regex.test(event)) {
			for (l1 of this.listeners[l].listeners) {
				l1(...args1);
			}
		}
	}

};
XEmitter.prototype.getMaxListeners    = function () {
	return Number.MAX_SAFE_INTEGER;
};
XEmitter.prototype.listenerCount      = function (type) {
	if (this.listeners[type]) {
		return this.listeners[type].listeners.length;
	}
	return 0;
};
XEmitter.prototype.listeners          = function (type) {
	if (this.listeners[type]) {
		return this.listeners[type].listeners.slice(0);
	}
	return null;
};
XEmitter.prototype.on                 = function (event, listener) {
	this.addListener(event, listener);

};
XEmitter.prototype.once               = function (event, listener) {
	var self     = this;
	var event    = event;
	var listener = listener;

	function fn() {
		var args = [];
		for (var i = 0; i < arguments.length; i++) {
			args.push(arguments[i]);
		}
		listener(...args);
		self.removeListener(event, fn);
	}

	fn.___TEST = 'FARELO';

	this.addListener(event, fn);


};
XEmitter.prototype.removeAllListeners = function (event) {
	this.listeners[event].listeners = {};

};
XEmitter.prototype.removeListener     = function (event, listener) {
	for (var i = 0; i < this.listeners[event].listeners.length; i++) {
		if (this.listeners[event].listeners[i] === listener) {
			return this.listeners[event].listeners.splice(i);
		}
	}
};
XEmitter.prototype.setMaxListeners    = function (n) {

};
module.exports                        = XEmitter;