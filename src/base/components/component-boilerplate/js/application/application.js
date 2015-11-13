/*****************************************
 * React component application script file
 * Constructs the application
 *****************************************/

// Reference pointers

// JQuery reference pointer
var $ = window.$;

// React reference pointer
import React from 'react';

// ReactDOM reference pointer
var ReactDOM = window.ReactDOM;

// AbstractComponentViewController reference pointer
import ClassLibrary from './class-library.js';
var AbstractComponentViewController = ClassLibrary.AbstractComponentViewController;


// DebugUtil reference pointer
// Use DebugUtil.log instead of console.log and your logs won't be displayed in production... magic!
var DebugUtil = ClassLibrary.DebugUtil;

// UrlUtil reference pointer
// Has a whole bunch of useful methods for extracting properties from the URL
var UrlUtil = ClassLibrary.UrlUtil;

// ComponentUtil reference pointer
var ComponentUtil = ClassLibrary.ComponentUtil;

/**
 * React Component
 * This is the default React component
 * Add all your component functionality into this class
 * Feel free to create child components if required but please place them into separate files
 */
var component = React.createClass({
  componentWillMount() {
    DebugUtil.log("Component did mount:", this.props.state);
    var self = this;
    self.setState({});
    ComponentUtil.getComponentInitialState(this.props, function(state) {
      DebugUtil.log("Setting component state:", state);
      self.setState(state);
    });
  },

  render() {
    DebugUtil.log("Rendering component:", this.props.componentType, "with props:", this.props, "and state:", this.state);
    return `<div className="falabella-component">
      Your component: {this.props.componentType}
    </div>`;
  }
});

/**
 * Application class
 * This is the component wrapper for your React component
 * This serves as the API for your component, establish all event listeners and public methods in this class
 */
export default class Application extends AbstractComponentViewController {
  constructor(config) {
    super(config);

    // Render the React component
    this.renderComponent(component);
  }

  /**
   * addEventListeners
   * Add all component wrapper event listeners
   * These are all the events that your component will respond to
   */
  addEventListeners() {
    // @todo: Add event listeners here...
    /*this.addEventListener("someCustomEvent", function() {
      DebugUtil.log("Called: someCustomEvent", this.config.componentType);
    });*/
  }
}