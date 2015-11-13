/*****************************************
 * Debug utility class
 *****************************************/

export default class DebugUtil {
	constructor() {
		this.debugLevel = 0;
	}

	/**
	 * setDebugLevel
	 * Sets the debug level
	 */
	static setDebugLevel(debugLevel=0) {
		this.debugLevel = debugLevel;
	}

	/**
	 * log
	 * Decorator for the console.log method
	 */
	static log() {
		if (this.debugLevel && this.debugLevel != 0 && console && typeof console.log == "function") {
			console.log.apply(console, arguments);
		}
	}
}