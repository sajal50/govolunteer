import {connect} from 'react-redux';
import OrganizationComponent from '../../components/OrganizationComponent/OrganizationComponent.js';
import {fetchEvents, createNewEvent, clearEventResult} from '../../actions/orgActions.js';



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
			
		}

	};

};


export default connect(mapStateToProps, mapDispatchToProps)(OrganizationComponent);
