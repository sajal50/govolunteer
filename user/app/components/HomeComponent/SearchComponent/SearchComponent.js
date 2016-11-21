import React from 'react';
import CSSModules from 'react-css-modules';
import SearchComponentStyles from './assets/SearchComponent.scss';
import SearchbarComponent from './SearchbarComponent/SearchbarComponent.js';
import ResultComponent from './ResultComponent/ResultComponent.js';

class SearchComponent extends React.Component {

	constructor (props) {

		super(props);
		
	}
	componentWillMount () {
		let {searchActions} = this.props;
		searchActions.fetchCategories();
		searchActions.fetchLocations();
	}
	render () {

		let {searchProps, searchActions} = this.props;
		return (

			<div>
				
				<div>
					<SearchbarComponent {...searchActions} {...searchProps} />
				</div>
				<div>
					<ResultComponent posts = {searchProps.posts} />
				</div>
			</div>



			);
		

	}
}

export default CSSModules(SearchComponent, SearchComponentStyles);
