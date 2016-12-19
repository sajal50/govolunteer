import {connect} from 'react-redux';
import ForgotPasswordComponent from '../../components/ForgotPasswordComponent/ForgotPasswordComponent.js';
import {sendEmailCode} from '../../actions/userManagementActions.js';

const mapStateToProps = (state) => {
	return {

	};
};

const mapDispatchToProps = (dispatch) => {

	return {
		sendEmailCode : (emailId) => {

			dispatch (sendEmailCode(emailId));

		}

	};

};


export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordComponent);
