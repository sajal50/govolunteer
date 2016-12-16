import {connect} from 'react-redux';
import OrganizationComponent from '../../components/OrganizationComponent/OrganizationComponent.js';


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

	};

};


export default connect(mapStateToProps, mapDispatchToProps)(OrganizationComponent);
