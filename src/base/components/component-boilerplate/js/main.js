/*****************************************
 * React component main script file
 * The Javascript application is intiated here.
 * All API methods are exposed here.
 *****************************************/

var Application = require("./application/application");

if (window["FalabellaReactApplication"]) {
	/**
	 * <TODO>Replace ComponentBoilerplate with your component name</TODO>
	 */
	if (!window.FalabellaReactApplication["ComponentBoilerplate"]) {
		/**
		 * <TODO>Replace ComponentBoilerplate with your component name</TODO>
		 */
		window.FalabellaReactApplication.ComponentBoilerplate = function(config) {
			var application = new Application(config);
			return application;
		};
	}
}
else {
	// Fail silently	
}