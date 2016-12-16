import initialState from '../../../constants/initialState.js';
import actionConstants from '../../../constants/actionConstants';


const events = (state =  initialState.org.events , action) => {

	switch (action.type) {

		case actionConstants.SET_EVENTS : return setEvents (state, action);
		default: 
		return state
	}



};


function setEvents (state, action) {

	return action.payload;


}


export default events;

