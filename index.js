/**
 * Created by paulo.simao on 03/01/2016.
 */
function XtraEmitter() {
	this.listeners = {};
}

XtraEmitter.prototype.addListener        = function (event, listener) {
	//var r = new RegExp(event);
	//this.listeners[listener] = new RegExp(event);
	if (!this.listeners[event]) {
		this.listeners[event] = {
			regex: new RegExp('^' + event + '$'),
			listeners: []
		};
	}
	this.listeners[event].listeners.push(listener);


};
XtraEmitter.prototype.emit               = function (evt, args) {
	var event = arguments[0];
	var args1 = [];
	for (var i = 1; i < arguments.length; i++) {
		args1.push(arguments[i]);
	}

	for (var l in this.listeners) {
		if (this.listeners[l].regex.test(event)) {
			for (var l1 of this.listeners[l].listeners) {
				l1(...args1);
			}
		}
	}

};
XtraEmitter.prototype.getMaxListeners    = function () {
	return Number.MAX_SAFE_INTEGER;
};
XtraEmitter.prototype.listenerCount      = function (type) {
	if (this.listeners[type]) {
		return this.listeners[type].listeners.length;
	}
	return 0;
};
XtraEmitter.prototype.listeners          = function (type) {
	if (this.listeners[type]) {
		return this.listeners[type].listeners.slice(0);
	}
	return null;
};
XtraEmitter.prototype.on                 = function (event, listener) {
	this.addListener(event, listener);

};
XtraEmitter.prototype.once               = function (evt, list) {
	var self     = this;
	var event    = evt;
	var listener = list;

	function fn() {
		var args = [];
		for (var i = 0; i < arguments.length; i++) {
			args.push(arguments[i]);
		}
		listener(...args);
		self.removeListener(event, fn);
	}

	this.addListener(event, fn);


};
XtraEmitter.prototype.removeAllListeners = function (event) {
	this.listeners[event].listeners = {};

};
XtraEmitter.prototype.removeListener     = function (event, listener) {
	for (var i = 0; i < this.listeners[event].listeners.length; i++) {
		if (this.listeners[event].listeners[i] === listener) {
			return this.listeners[event].listeners.splice(i);
		}
	}
};
XtraEmitter.prototype.setMaxListeners    = function (n) {

};
module.exports                           = XtraEmitter;