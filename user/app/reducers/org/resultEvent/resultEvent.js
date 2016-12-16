import initialState from '../../../constants/initialState.js';
import actionConstants from '../../../constants/actionConstants';

const resultEvent = (state =  initialState.org.resultEvent, action) => {

	switch (action.type) {

		case actionConstants.SET_RESULT_EVENT :
		return setResultEvent(state, action);
		break;



		default: 
		return state
	}



};

function setResultEvent(state, action) {
	return action.payload;
}

export default resultEvent;