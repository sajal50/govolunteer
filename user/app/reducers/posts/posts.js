import initialState from '../../constants/initialState.js';
import actionConstants from '../../constants/actionConstants';
import _ from 'lodash';



const posts = (state = initialState.posts, action) => {

	switch (action.type) {

		case actionConstants.SET_POSTS : return setposts(state, action);
								break;

		default: 
		return state
	}



};


function setposts(state, action) {
	
	let payload = action.payload;


	return _.slice(payload);



}

export default posts;