import {connect} from 'react-redux';
import BaseComponent from '../../components/BaseComponent/BaseComponent.js';
import {logout, fetchCategories, fetchLocations} from '../../actions/initialLoadingActions.js';

const mapStateToProps = (state) => {
	return {
		isLoggedIn : state.userInfo.isLoggedIn,
		notifConfig : state.notifConfig
	};
};

const mapDispatchToProps = (dispatch) => {

	return {

		logout : () => {

			dispatch(logout());


		},
		fetchCategories: () => {
				dispatch(fetchCategories());
		},
		fetchLocations: () => {
				dispatch (fetchLocations());
		}

	};

};


export default connect(mapStateToProps, mapDispatchToProps)(BaseComponent);
