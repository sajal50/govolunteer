import React from 'react';
import CSSModules from 'react-css-modules';
import ResultComponentStyles from './assets/ResultComponent.scss';


class ResultComponent extends React.Component {

	constructor (props) {

		super(props);
		
	}
	render () {

		return (

			<div>
				This is the ResultComponent.

			</div>



			);
		

	}
}

export default CSSModules(ResultComponent, ResultComponentStyles);
