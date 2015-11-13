/*****************************************
 * Web request actions
 * Action to make a web request
 *****************************************/

// Constants
var ActionTypes = require("./action-types");

// Util
var DebugUtil = require("../utils/debug");

/**
 * Web service request actions class
 */
export default class WebServiceRequestActions {
	constructor(applicationDispatcher) {
		this.applicationDispatcher = applicationDispatcher;
	}

	/**
	 * createWebRequest
	 * Creates a web request action
	 */
	createWebRequest(url, type, data, successEvent, failureEvent) {
		DebugUtil.log("Creating web request", url, type, data, successEvent, failureEvent);
		this.applicationDispatcher.dispatch({
			actionType: ActionTypes.WEB_SERVICE_REQUEST,
			action: {
				url: url,
				type: type,
				data: data,
				successEvent: successEvent,
				failureEvent: failureEvent
			}
		});
	}
}