/*****************************************
 * React components base application script file
 * Constructs the application
 *****************************************/

// Vendor
var $ = window.$;
var React = window.React;
var ReactDOM = window.ReactDOM;

// Util
var DebugUtil = require("./utils/debug");
var UrlUtil = require("./utils/url");
var EventUtil = require("./utils/event");
var ComponentUtil = require("./utils/component");
var WebServiceUtil = require("./utils/web-service");

// Actions
var WebServiceRequestActions = require("./actions/web-service-request-actions");

// Dispatcher
var ApplicationDispatcher = require("./dispatcher/application-dispatcher");

// Store
var WebServiceRequestStore = require("./stores/web-service-request-store");

/**
 * Application class
 */
export default class AbstractApplication {
	constructor(type) {
		// Add debugging
		this.addDebug();

		DebugUtil.log("Created:", type);

		// Application text dictionary object
		this.applicationTextDictionary = {};

		// Application configuration object
		this.defaultApplicationConfiguration = {
			instanceId: String(Math.random(10000000)*32),
			dateCreated: new Date().toString()
		};
		this.applicationConfiguration = this.defaultApplicationConfiguration;

		// Global event dispatcher
		this.eventDispatcher = new EventUtil();

		// Global dispatchers
		this.applicationDispatcher = new ApplicationDispatcher();

		// Global stores
		this.webServiceRequestStore = new WebServiceRequestStore(
			this.applicationDispatcher, this.eventDispatcher);

		// Global actions
		this.webServiceRequestActions = new WebServiceRequestActions(
			this.applicationDispatcher);
	}

	/**
	 * addDebug
	 * Adds debugging flag based on ?debug query param
	 */
	addDebug() {
		var urlArgs = UrlUtil.getArgsFromLocation();
		DebugUtil.setDebugLevel((urlArgs && urlArgs.debug) ? 1 : 0);
		DebugUtil.log("Initialised: DebugUtil");
	}

	/************************************
	 * Global application configuration
	 ************************************/

	/**
	 * setApplicationConfiguration
	 * Sets the application configuration object
	 */
	setApplicationConfiguration(applicationConfiguration) {
		this.applicationConfiguration = $.extend(this.defaultApplicationConfiguration, applicationConfiguration);
	}

	/**
	 * getApplicationConfiguration
	 * Returns a the application configuration object
	 */
	getApplicationConfiguration() {
		return this.applicationConfiguration;
	}

	/**
	 * getApplicationConfigurationToString
	 * Returns the application configuration object as a string
	 */
	getApplicationConfigurationToString(renderAsHtml = true) {
		return this._getDictionaryToString(this.applicationConfiguration, renderAsHtml);
	}

	/**
	 * setApplicationConfigurationProperty
	 * Sets a property on the application configuration object
	 */
	setApplicationConfigurationProperty(key, value) {
		this.applicationConfiguration[key] = value;
	}

	/**
	 * getApplicationConfigurationProperty
	 * Returns a property of the application configuration object
	 */
	getApplicationConfigurationProperty(key) {
		return this.applicationConfiguration[key];
	}

	/************************************
	 * Global text dictionary
	 ************************************/

	/**
	 * setApplicationTextDictionary
	 * Sets the application text dictionary object
	 */
	setApplicationTextDictionary(applicationTextDictionary) {
		this.applicationTextDictionary = applicationTextDictionary;
	}

	/**
	 * getApplicationTextDictionaryToString
	 * Returns the application text dictionary object as a string
	 */
	getApplicationTextDictionaryToString(renderAsHtml = true) {
		return this._getDictionaryToString(this.applicationTextDictionary, renderAsHtml);
	}

	/**
	 * getApplicationTextDictionaryProperty
	 * Returns a property of the application text dictionary object
	 */
	getApplicationTextDictionaryProperty(key) {
		return this.applicationTextDictionary[key];
	}

	/************************************
	 * Private
	 ************************************/

	/**
	 * _getDictionaryToString
	 * Returns an object as a string
	 * @todo: Make this print nested object properties
	 */
	_getDictionaryToString(object, renderAsHtml = true) {
		var string = "";
		var index = 0;
		for (var key in object) {
			if (index != 0 && renderAsHtml)
				string += "<br/>";
			else if (index != 0)
				string += "\n";
			string += key + ": " + object[key];
			index++;
		}
		return string;
	}
}