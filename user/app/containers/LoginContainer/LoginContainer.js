import {connect} from 'react-redux';
import LoginComponent from '../../components/LoginComponent/LoginComponent.js';
import {login} from '../../actions/initialLoadingActions.js';
import {triggerNotification} from '../../actions/notificationActions.js';
const mapStateToProps = (state) => {

	return {

		"userInfo" : state.userInfo
	

	};
};

const mapDispatchToProps = (dispatch) => {

	return {

		login : (username, password) => {

			dispatch(login(username, password));

		},
		triggerNotification : (config) => {

			dispatch(triggerNotification(config));


		}
		

	};

};


export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
