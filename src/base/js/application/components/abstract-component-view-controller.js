/*****************************************
 * Abstract component view controller
 * All component view controllers will inherit from this class
 *****************************************/

// Vendor
var $ = window.$;
var React = window.React;
var ReactDOM = window.ReactDOM;

// Util
var DebugUtil = require("../utils/debug");

/**
 * Abstract React component wrapper class
 */
export default class AbstractComponentViewController {
	constructor(config) {
		DebugUtil.log("Created:", config.componentType);

		this.config = config;
		this.componentType = config.componentType;
		this.componentDomId = config.componentDomId;
		this.textDictionary = config.textDictionary;
		this.application = window.FalabellaReactApplication;
		this.eventDispatcher = window.FalabellaReactApplication.eventDispatcher;
		this.applicationDispatcher = window.FalabellaReactApplication.applicationDispatcher;
		this.webServiceRequestActions = window.FalabellaReactApplication.webServiceRequestActions;
		this.component = null;
		this.eventListeners = {};
		this.actions = {};

		// Add default event listeners
		this.addDefaultEventListeners();

		// Add all event listeners
	    this.addEventListeners();
	}

	/************************************
	 * Event handling
	 ************************************/

	/**
	 * addEventListeners
	 * This method will be overridden in the extending component class
	 */
	addEventListeners() {}

	/**
	 * addEventListener
	 * Adds a new event listener to the event dispatcher
	 */
	addEventListener(eventName, callback) {
		DebugUtil.log("Called: addEventListener", this.config.componentType, eventName, typeof callback);
		this.eventDispatcher.on(eventName, callback);
		this.eventListeners[eventName] = callback;
	}

	/**
	 * removeEventListener
	 * Removes an event listener from the event dispatcher
	 */
	removeEventListener(eventName) {
		DebugUtil.log("Called: removeEventListener", this.config.componentType, eventName, typeof this.eventListeners[eventName]);
		if (!this.eventListeners[eventName])
			return false;
		this.eventDispatcher.off(eventName, this.eventListeners[eventName]);
		delete this.eventListeners[eventName];
		return true;
	}

	/**
	 * removeEventListeners
	 * Removes all event listeners from the event dispatcher
	 */
	removeEventListeners() {
		DebugUtil.log("Called: removeEventListeners", this.config.componentType);
		for (var eventName in this.eventListeners) {
			this.removeEventListener(eventName);
		}
	}

	/**
	 * addDefaultEventListeners
	 * Adds all default listeners to the event dispatcher
	 */
	addDefaultEventListeners() {
		DebugUtil.log("Called: addDefaultEventListeners", this.config.componentType);
		// @todo: Add all default listeners here...
	}

	/************************************
	 * Mandatory/default public functions
	 ************************************/

	/**
	 * renderComponent
	 * Renders the associated React component
	 */
	renderComponent(component) {
		DebugUtil.log(
			"Called: renderComponent", 
			this.config.componentType, 
			this.application, 
			this.eventDispatcher);

		// Add all required properties to the React.js component config
		this.config.application = this.application;
		this.config.eventDispatcher = this.eventDispatcher;
		this.config.webServiceRequestActions = this.webServiceRequestActions;

		// Create the React.js component
		this.component = ReactDOM.render(
        	React.createElement(component, this.config), 
        	document.getElementById(this.config.componentDomId));
	}

	/**
	 * destroyComponent
	 * Destroys the component and cleans up
	 */
	destroyComponent(component) {
		DebugUtil.log("Called: destroyComponent", this.config.componentType);
		this.removeEventListeners();
		// @todo: Clean up the React component here...
	}

	/**
	 * refreshComponent
	 * Refreshes the component state
	 */
	refreshComponent(component) {
		DebugUtil.log("Called: refreshComponent", this.config.componentType);
		// @todo: Refresh the React component here...
	}

	/************************************
	 * Actions
	 ************************************/

	/**
	 * addActions
	 * Adds a set of actions to the component
	 */
	static addActions(key, actions) {
		DebugUtil.log("Called: addActions", key, actions);
		this.actions[key] = actions;
	}
}