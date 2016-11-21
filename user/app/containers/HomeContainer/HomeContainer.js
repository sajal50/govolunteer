import {connect} from 'react-redux';
import HomeComponent from '../../components/HomeComponent/HomeComponent.js';
import {logout} from '../../actions/initialLoadingActions.js';

const mapStateToProps = (state) => {
	return {
		userInfo : state.userInfo
	};
};

const mapDispatchToProps = (dispatch) => {

	return {
		

	};

};


export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
