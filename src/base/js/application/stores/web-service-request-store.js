/*****************************************
 * Web request store
 * Store used to manage web requests
 * @todo: Improve this so that the success/failure events are not considered when matching completed responses
 *****************************************/

// Stores
var AbstractStore = require("./abstract-store");

// Constants
var ActionTypes = require("../actions/action-types");

// Util
var WebServiceUtil = require("../utils/web-service");
var DebugUtil = require("../utils/debug");

/**
 * Web service request store class
 */
export default class WebRequestStore extends AbstractStore {
	constructor(applicationDispatcher, eventDispatcher) {
		super(applicationDispatcher, eventDispatcher);
		this.actionsRunning = {};
		this.actionsCompleted = {};

		var self = this;

		this.dispatchToken = this.applicationDispatcher.register(function(action) {
			switch (action.actionType) {
				case ActionTypes.WEB_SERVICE_REQUEST:
					var matchedRunningAction = self.getMatchingActionFromRunningDictionary(action);
					var matchedCompletedAction = self.getMatchingActionFromCompletedDictionary(action);
					var noMatchedActions = !matchedRunningAction && !matchedCompletedAction;
					if (noMatchedActions) {
						self.addActionToRunningDictionary(action);
						WebServiceUtil.makeWebServiceRequest(
							action.action.url, 
							action.action.type, 
							action.action.data, 
							function(data) {
								self.removeActionFromRunningDictionary(action);
								self.addActionToCompletedDictionary(action, data);
								self.eventDispatcher.trigger(action.action.successEvent, data);
							}, 
							function(error) {
								self.removeActionFromRunningDictionary(action);
								self.eventDispatcher.trigger(action.action.failureEvent, data);
							});
					}
					else if (matchedCompletedAction) {
						// This means we have already stored a successful response for this request so we can return it rather than making it again.
						// Set a litle delay to simulate a response from the web service in there are functions called later in the stack which assume 
						// that the web request will not be instantaneous
						setTimeout(function() {
							self.eventDispatcher.trigger(
								action.action.successEvent, matchedCompletedAction.action.data);
						}, 50);
					}
					else {
						// Do nothing
					}
					break;
			}
		});
	}

	/**
	 * addActionToRunningDictionary
	 * Adds a reference to the running web request actions dictionary
	 */
	addActionToRunningDictionary(action) {
		// Make sure the action is valid
		if (!action || !action.action || !action.action.url)
			return false;
		var key = this.getActionUniqueKey(action);
		DebugUtil.log("Adding web request action to running dictionary:", key, action);
		this.actionsRunning[key] = {
			request: action
		};
		return true;
	}

	/**
	 * removeActionFromRunningDictionary
	 * Removes action from the running dictionary
	 */
	removeActionFromRunningDictionary(action) {
		DebugUtil.log("Removing web request action from running dictionary", action);
		return this.removeActionFromDictionary(this.actionsRunning, action);
	}

	/**
	 * getMatchingActionFromRunningDictionary
	 * Checks to see if web request action is in the running dictionary and returns the action if found
	 */
	getMatchingActionFromRunningDictionary(action) {
		return this.getMatchingActionFromDictionary(this.actionsRunning, action);
	}

	/**
	 * addActionToCompletedDictionary
	 * Adds a reference to the completed web request actions dictionary
	 */
	addActionToCompletedDictionary(action, response) {
		// Make sure response was successful
		if (!response || !response.success)
			return false;
		// Make sure the action is valid
		if (!action || !action.action || !action.action.url)
			return false;
		var key = this.getActionUniqueKey(action);
		DebugUtil.log("Adding web request action to completed dictionary:", key, action, response);
		this.actionsCompleted[key] = {
			request: action,
			response: response
		};
		return true;
	}

	/**
	 * removeActionFromCompletedDictionary
	 * Removes action from the completed dictionary
	 */
	removeActionFromCompletedDictionary(action) {
		DebugUtil.log("Removing web request action from completed dictionary", action);
		return this.removeActionFromDictionary(this.actionsCompleted, action);
	}

	/**
	 * getMatchingActionFromCompletedDictionary
	 * Checks to see if web request action is in the completed dictionary and returns the action if found
	 */
	getMatchingActionFromCompletedDictionary(action) {
		return this.getMatchingActionFromDictionary(this.actionsCompleted, action);
	}

	/**
	 * removeActionFromDictionary
	 * emoves action from a dictionary
	 */
	removeActionFromDictionary(dictionary, action) {
		if (!dictionary || !action)
			return false;
		var key = this.getActionUniqueKey(action);
		delete dictionary[key];
	}

	/**
	 * getMatchingActionFromDictionary
	 * Checks to see if web request action is in a dictionary and returns the action if found
	 */
	getMatchingActionFromDictionary(dictionary, action) {
		if (!dictionary || !action)
			return null;
		var key = this.getActionUniqueKey(action);
		return dictionary[key];
	}

	/**
	 * getActionUniqueKey
	 * Returns a unique web request action key
	 */
	getActionUniqueKey(action) {
		var str = JSON.stringify(action);
		var hash = 0, i, chr, len;
		if (str.length == 0) 
			return hash;
		for (i = 0, len = str.length; i < len; i++) {
			chr   = str.charCodeAt(i);
			hash  = ((hash << 5) - hash) + chr;
			hash |= 0; // Convert to 32bit integer
		}
		return hash;
	}
}