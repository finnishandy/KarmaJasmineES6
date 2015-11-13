/*****************************************
 * URL utility class
 *****************************************/

export default class UrlUtil {
	constructor() {}

	/**
	 * getArgsFromQueryString
	 * Return arguments from passed query string
	 */
	static getArgsFromQueryString(queryString) {
		var args = {};
		if (!queryString || queryString.length == 0)
			return args;
		var queryStringParts = queryString.split("&");
		for (var i=0; i<queryStringParts.length; i++) {
			var queryStringPartData = queryStringParts[i].split("=");
			if (queryStringPartData.length != 2)
				continue;
			var queryStringPartValue = queryStringPartData[1].split(",");
			if (queryStringPartValue && 
				queryStringPartValue.toString() !== "" &&
				queryStringPartValue.toString() !== "undefined" &&
				queryStringPartValue.toString() !== "null") {
				args[queryStringPartData[0]] = queryStringPartValue;
			}
		}
		return args;
	}

	/**
	 * getArgsFromUrl
	 * Return arguments from passed URL
	 */
	static getArgsFromUrl(url) {
		var args = {};
		if (url.indexOf("?") > -1) {
			var queryString = url.split("?")[1];
			args = this.getArgsFromQueryString(queryString);
		}
		return args;
	}

	/**
	 * getArgsFromLocation
	 * Return arguments from current location
	 */
	static getArgsFromLocation() {
		return this.getArgsFromUrl(window.location.href);
	}
}