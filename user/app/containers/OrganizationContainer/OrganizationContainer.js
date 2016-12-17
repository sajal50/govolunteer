import {connect} from 'react-redux';
import OrganizationComponent from '../../components/OrganizationComponent/OrganizationComponent.js';
import {fetchEvents, createNewEvent, clearEventResult} from '../../actions/orgActions.js';
import {triggerNotification} from '../../actions/notificationActions.js';
import {updatePassword, updateInfo, updateProfilePic} from '../../actions/userManagementActions.js';


const mapStateToProps = (state) => {
	return {
		userInfo : state.userInfo,
		org : state.org,
		metadata : {
			locations : state.locations,
			categories : state.categories
		}
	};
};

const mapDispatchToProps = (dispatch) => {

	return {

		eventActions : {

			fetchEvents : () => {

				dispatch(fetchEvents());
			}


		},

		newEventActions : {

			createNewEvent : (payload) => {

				dispatch(createNewEvent(payload));
			},
			clearEventResult : () => {
				dispatch (clearEventResult());
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
			},
			updateProfilePic : (file) => {

				dispatch(updateProfilePic(file));
			}

		}

	};

};


export default connect(mapStateToProps, mapDispatchToProps)(OrganizationComponent);
