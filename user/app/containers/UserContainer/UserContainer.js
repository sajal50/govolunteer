import {connect} from 'react-redux';
import UserComponent from '../../components/UserComponent/UserComponent.js';
import {fetchPosts} from '../../actions/userActions.js';


const mapStateToProps = (state) => {
	return {
		userInfo : state.userInfo,
		user : state.user,
		metadata : {
			locations : state.locations,
			categories : state.categories
		}
	};
};

const mapDispatchToProps = (dispatch) => {

	return {
		postActions : {

			fetchPosts : () => {

				dispatch(fetchPosts());
			}
		}
	};
};


export default connect(mapStateToProps, mapDispatchToProps)(UserComponent);
