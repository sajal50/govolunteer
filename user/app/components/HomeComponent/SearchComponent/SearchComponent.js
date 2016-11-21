import React from 'react';
import CSSModules from 'react-css-modules';
import SearchComponentStyles from './assets/SearchComponent.scss';
import SearchbarComponent from './SearchbarComponent/SearchbarComponent.js';
import ResultComponent from './ResultComponent/ResultComponent.js';

class SearchComponent extends React.Component {

	constructor (props) {

		super(props);
		
	}
	render () {

		return (

			<div>
				
				<div>
					<SearchbarComponent />
				</div>
				<div>
					<ResultComponent />
				</div>
			</div>



			);
		

	}
}

export default CSSModules(SearchComponent, SearchComponentStyles);
