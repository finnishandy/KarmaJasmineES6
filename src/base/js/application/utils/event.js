/*****************************************
 * Event utility class
 *****************************************/

// Vendor
var $ = window.$;

// Util
var DebugUtil = require("./debug");

export default class EventUtil {
	constructor() {
		DebugUtil.log("Created: EventUtil");
	}

	on(eventName, callback) {
		DebugUtil.log("Adding event listener:", $(this), eventName, typeof callback);
		$(this).on(eventName, callback);
	}

	off(eventName, callback=null) {
		DebugUtil.log("Removing event listener:", $(this), eventName, typeof callback);
		callback 
			? $(this).off(eventName, callback) 
			: $(this).off(eventName, callback);
	}

	trigger(eventName, data=null) {
		DebugUtil.log("Triggering event:", $(this), eventName, data);
		$(this).trigger(eventName, data);
	}
}