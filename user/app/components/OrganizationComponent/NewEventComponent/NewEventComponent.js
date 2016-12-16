import React from 'react';
import CSSModules from 'react-css-modules';
import NewEventComponentStyle from './assets/NewEventComponent.scss';


class NewEventComponent extends React.Component {

	constructor (props) {

		super(props);
		
	}

	
	

	render () {

		return (
			<div>
				This is the NewEventComponent
			</div>
			);
	}
}

export default CSSModules(NewEventComponent, NewEventComponentStyle);
