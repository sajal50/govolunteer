import {combineReducers} from 'redux';
import events from './events/events.js';
import flags from './flags/flags.js';

export default combineReducers({
	events,
	flags

});


