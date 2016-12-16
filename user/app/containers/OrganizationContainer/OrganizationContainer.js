import {connect} from 'react-redux';
import OrganizationComponent from '../../components/OrganizationComponent/OrganizationComponent.js';
import {fetchEvents} from '../../actions/orgActions.js';


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


		}

	};

};


export default connect(mapStateToProps, mapDispatchToProps)(OrganizationComponent);
