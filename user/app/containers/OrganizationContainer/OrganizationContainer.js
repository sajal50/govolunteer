import {connect} from 'react-redux';
import OrganizationComponent from '../../components/OrganizationComponent/OrganizationComponent.js';
import {fetchCategories, fetchLocations, search} from '../../actions/searchActions.js';

const mapStateToProps = (state) => {
	return {
		userInfo : state.userInfo,
		searchProps : {
			categories : state.categories,
			locations : state.locations,
			posts: state.posts
		}
	};
};

const mapDispatchToProps = (dispatch) => {

	return {
		
		searchActions : {

			fetchCategories: () => {
				dispatch(fetchCategories());
			},
			fetchLocations: () => {
				dispatch (fetchLocations());
			},
			search: (payload) => {

				dispatch(search(payload))
			}

		}

	};

};


export default connect(mapStateToProps, mapDispatchToProps)(OrganizationComponent);
