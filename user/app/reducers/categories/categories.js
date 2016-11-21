import initialState from '../../constants/initialState.js';
import actionConstants from '../../constants/actionConstants';
import _ from 'lodash';



const flags = (state = initialState.categories, action) => {

	switch (action.type) {

		case actionConstants.SET_CATEGORIES : return setCategories(state, action);
								break;

		default: 
		return state
	}



};


function setCategories(state, action) {

	let payload = action.payload;


	return _.slice(payload);



}

export default flags;