/*****************************************
 * We service utility class
 *****************************************/

// Vendor
var $ = window.$;

// Util
var DebugUtil = require("./debug");

export default class WebServiceUtil {
	constructor() {}

	/**
	 * makeWebServiceRequest
	 * Makes a new web service request
	 */
	static makeWebServiceRequest(url, type, data, success, failure) {
		DebugUtil.log("Making web service request:", url, type, data);
		var self = this;
		$.ajax({
			url: url,
			type: type,
			dataType: "json",
			cache: false,
			crossDomain: true,
			beforeSend: function(request) {
			    // @todo: Set any request headers if required (REST auth etc)
			},
			data: data
		}).done(function(data) {
			DebugUtil.log("Setting state from API:", data);
			success(data);
		}).fail(function(error) {
			DebugUtil.log("Get state error", error);
			failure(error);
		});
  	}
}