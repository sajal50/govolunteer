import {connect} from 'react-redux';
import UserComponent from '../../components/UserComponent/UserComponent.js';
import {fetchPosts,createNewPost,acceptRequest} from '../../actions/userActions.js';
import {triggerNotification} from '../../actions/notificationActions.js';
import {updatePassword, updateInfo} from '../../actions/userManagementActions.js';


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
			},
			acceptRequest : (payload) => {
				dispatch(acceptRequest(payload));
			}
		},

		newPostActions : {

			createNewPost : (payload) => {

				dispatch(createNewPost(payload));
			}
			
		},
		accountManagementActions : {


			triggerNotification : (payload) => {

				dispatch(triggerNotification(payload));
			},
			updatePassword : (payload) => {

				dispatch(updatePassword(payload));
			},
			updateInfo : (payload) => {

				dispatch (updateInfo(payload));
			}

		}
	};
};


export default connect(mapStateToProps, mapDispatchToProps)(UserComponent);
