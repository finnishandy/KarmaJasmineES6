/*****************************************
 * React component main script file
 * The Javascript application is intiated here.
 * All API methods are exposed here.
 *****************************************/

var Application = require("./application/application");

if (window["FalabellaReactApplication"]) {
	if (!window.FalabellaReactApplication["Example1"]) {
		window.FalabellaReactApplication.Example1 = function(config) {
			var application = new Application(config);
			return application;
		};
	}
}
else {
	// Fail silently	
}