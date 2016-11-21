import initialState from '../../constants/initialState.js';
import actionConstants from '../../constants/actionConstants';
import _ from 'lodash';



const locations = (state = initialState.locations, action) => {

	switch (action.type) {

		case actionConstants.SET_LOCATIONS : return setLocations(state, action);
								break;

		default: 
		return state
	}



};


function setLocations(state, action) {
	
	let payload = action.payload;


	return _.slice(payload);



}

export default locations;