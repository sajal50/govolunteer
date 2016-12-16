import {combineReducers} from 'redux';
import events from './events/events.js';
import flags from './flags/flags.js';
import resultEvent from './resultEvent/resultEvent.js';

export default combineReducers({
	events,
	flags,
	resultEvent

});


