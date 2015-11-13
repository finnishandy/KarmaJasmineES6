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
import ClassLibrary from '../../../../../base/js/application/class-library';
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
  componentWillMount(): Object {
    DebugUtil.log("Component did mount:", this.props.state);
    var self = this;
    self.setState({});
    ComponentUtil.getComponentInitialState(this.props, function(state) {
      DebugUtil.log("Setting component state:", state);
      self.setState(state);
    });
  },

  render(): any {
    DebugUtil.log("Rendering component:", this.props.componentType, "with props:", this.props, "and state:", this.state);
    return <div className="fbra_falabella-component fbra_falabella-component-example-1">
      <h3>{this.props.textDictionary.thisIsAnExampleComponentOfTypePreText} {this.props.componentType}</h3>
      <p>{this.props.textDictionary.thisComponentIsInstantiatedByState}</p>
      <p>{this.props.textDictionary.currentTestProperty1ValuePreText} {this.state.testProperty1}</p>
      <a className="default-button add-random-item-to-basket-button" href="#" onClick={this.handleAddRandomItemToBasketButtonClick}>
        {this.props.textDictionary.addRandomItemToBasketText}
      </a>
    </div>;
  },

  handleAddRandomItemToBasketButtonClick(evt): boolean {
    DebugUtil.log("Clicked: Add random item to basket button", this.props, this.props.example1Actions);
    var items = [
      {name: "Jimmy Choo Shoes", price: "£400.00"},
      {name: "Ted Baker Sweater", price: "£100.00"},
      {name: "Nike Football", price: "£50.00"},
      {name: "Casio Watch", price: "£200.00"},
      {name: "Carharrt Jeans", price: "£90.00"},
      {name: "Baseball Glove", price: "£30.00"}];
    var randomIndex = Math.floor(Math.random()*(items.length-1));
    var item = items[randomIndex];
    this.props.example1Actions.createAddItemToBasketAction(
      item, "onAddRandomItemToBasketSuccess", "onAddRandomItemToBasketFailure");
    evt.preventDefault();
    return false;
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

    // Add required actions
    this.example1Actions = window.FalabellaReactApplication.example1Actions;

    // Add required actions to config
    // These will then be accessible from the React component
    this.config.example1Actions = this.example1Actions;

    // Render the React component
    this.renderComponent(component);
  }
}