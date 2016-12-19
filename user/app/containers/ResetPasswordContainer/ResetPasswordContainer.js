import {connect} from 'react-redux';
import ResetPasswordComponent from '../../components/ResetPasswordComponent/ResetPasswordComponent.js';
import {triggerNotification} from '../../actions/notificationActions.js';
import {resetPassword} from '../../actions/userManagementActions.js';


const mapStateToProps = (state) => {
	return {

	};
};

const mapDispatchToProps = (dispatch) => {

	return {

		triggerNotification : (config) => {
			dispatch(triggerNotification(config));
		},
		resetPassword : (payload) => {

			dispatch(resetPassword(payload));
		}

	};

};


export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordComponent);
