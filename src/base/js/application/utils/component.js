/*****************************************
 * Component utility class
 *****************************************/

// Vendor
var $ = window.$;

// Util
var DebugUtil = require("./debug");

export default class ComponentUtil {
	constructor() {}

	/**
	 * getComponentInitialState
	 * Returns the components initial state or gets state from API
	 */
	static getComponentInitialState(config, callback) {
		DebugUtil.log("Returning initial state from config:", config.state);
	    if (!config.state && config.stateAPI && config.stateAPI.url.length != 0) {
	      	this.getComponentStateFromAPI(config, callback);
	    }
	    else if (!config.state) {
	      	callback({});
	    }
	    else {
	    	callback($.extend({}, config.state));
	    }
	}

	/**
	 * getComponentStateFromAPI
	 * Gets the component state from API
	 */
	static getComponentStateFromAPI(config, callback) {
		DebugUtil.log("Getting state from config:", config.state);
		var self = this;
		var requestType = config.stateAPI.type
			? config.stateAPI.type
			: "GET";
		var requestData = config.stateAPI.data
			? config.stateAPI.data
			: {};
		$.ajax({
			url: config.stateAPI.url,
			type: requestType,
			dataType: "json",
			cache: false,
			crossDomain: true,
			beforeSend: function(request) {
			    // @todo: Set any request headers if required (REST auth etc)
			},
			data: requestData
		}).done(function(data) {
			DebugUtil.log("Setting state from API:", data);
			callback(data);
		}).fail(function(error) {
			DebugUtil.log("Get state error", error);
		});
  	}
}