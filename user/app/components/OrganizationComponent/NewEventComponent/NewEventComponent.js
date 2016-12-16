import React from 'react';
import CSSModules from 'react-css-modules';
import NewEventComponentStyle from './assets/NewEventComponent.scss';
import NewEventFormComponent from './NewEventFormComponent/NewEventFormComponent.js';
import NewEventResultComponent from './NewEventResultComponent/NewEventResultComponent.js';


class NewEventComponent extends React.Component {

	constructor (props) {

		super(props);
		
	}

	
	

	render () {

		let {newEventScreenType} = this.props.org.flags;

		if (newEventScreenType == 'FORM') {
			return (
			<div>
				<NewEventFormComponent 
				newEventActions = {this.props.newEventActions} metadata = {this.props.metadata}/>
			</div>
			);
		} else {
			return (
			<div>
				<NewEventResultComponent clearEventResult = {this.props.newEventActions.clearEventResult} resultEvent = {this.props.org.resultEvent} />
			</div>
			);
		}
	}
}

export default CSSModules(NewEventComponent, NewEventComponentStyle);
