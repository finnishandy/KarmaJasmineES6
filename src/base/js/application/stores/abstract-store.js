/*****************************************
 * Abstract store
 * All stores will inherit from this class
 *****************************************/

/**
 * Abstract store class
 */
export default class AbstractStore {
	constructor(applicationDispatcher, eventDispatcher) {
		this.applicationDispatcher = applicationDispatcher;
		this.eventDispatcher = eventDispatcher;
	}
}