import React from 'react';
import CSSModules from 'react-css-modules';
import NewEventComponentStyle from './assets/NewEventComponent.scss';
import NewEventFormComponent from './NewEventFormComponent/NewEventFormComponent.js';


class NewEventComponent extends React.Component {

	constructor (props) {

		super(props);
		
	}

	
	

	render () {

		let {newEventScreenType} = this.props.org.flags;

		if (newEventScreenType == 'FORM') {
			return (
			<div>
				<NewEventFormComponent newEventActions = {this.props.newEventActions} metadata = {this.props.metadata}/>
			</div>
			);
		} else {
			return (
			<div>
				This is the result page.
			</div>
			);
		}
	}
}

export default CSSModules(NewEventComponent, NewEventComponentStyle);
