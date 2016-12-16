import React from 'react';
import CSSModules from 'react-css-modules';
import SingleEventDetailComponentStyle from './assets/SingleEventDetailComponent.scss';


class SingleEventDetailComponent extends React.Component {

	constructor (props) {

		super(props);
		
	}

	
	

	render () {

		return (
			<div>
				This is the SingleEventDetailComponent
			</div>
			);
	}
}

export default CSSModules(SingleEventDetailComponent, SingleEventDetailComponentStyle);
