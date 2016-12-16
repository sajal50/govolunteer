import initialState from '../../../constants/initialState.js';
import actionConstants from '../../../constants/actionConstants';

const flags = (state = initialState.org.flags , action) => {

	switch (action.type) {

		case actionConstants.SET_ORG_FLAGS : 
		return setOrgFlags(state, action);
		break;


		default: 
		return state
	}



};


function setOrgFlags(state, action) {
	
	let {payload} = action;


	return {...state, ...payload};
}

export default flags;