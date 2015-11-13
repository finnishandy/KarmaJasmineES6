/*****************************************
 * React components base script file
 * Constructs the application base and exposes the class library
 *****************************************/

// Util
var DebugUtil = require("./utils/debug");
var UrlUtil = require("./utils/url");
var EventUtil = require("./utils/event");
var ComponentUtil = require("./utils/component");
var WebServiceUtil = require("./utils/web-service");

// Application
var AbstractApplication = require("./abstract-application");

// Actions
var ActionTypes = require("./actions/action-types");

// Store
var AbstractStore = require("./stores/abstract-store");

// View controllers
var AbstractComponentViewController = require("./components/abstract-component-view-controller.js");

// Create the class library object
export default {
	DebugUtil: DebugUtil,
	UrlUtil: UrlUtil,
	EventUtil: EventUtil,
	ComponentUtil: ComponentUtil,
	WebServiceUtil: WebServiceUtil,
	ActionTypes: ActionTypes,
	AbstractComponentViewController: AbstractComponentViewController,
	AbstractStore: AbstractStore,
	AbstractApplication: AbstractApplication
};