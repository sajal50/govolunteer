import initialState from '../../../constants/initialState.js';
import actionConstants from '../../../constants/actionConstants';


const posts = (state =  initialState.user.posts , action) => {

	switch (action.type) {

		case actionConstants.SET_POSTS : return setPosts (state, action);
		default: 
		return state
	}



};


function setPosts (state, action) {

	return action.payload;


}


export default posts;

