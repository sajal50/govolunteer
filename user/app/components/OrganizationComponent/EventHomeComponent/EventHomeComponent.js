import React from 'react';
import CSSModules from 'react-css-modules';
import EventHomeComponentStyle from './assets/EventHomeComponent.scss';
import AllEventsListComponent from './AllEventsListComponent/AllEventsListComponent.js';
import SingleEventDetailComponent from './SingleEventDetailComponent/SingleEventDetailComponent.js';


class EventHomeComponent extends React.Component {

	constructor (props) {

		super(props);
		
	}

	componentWillMount () {
		this.props.eventActions.fetchEvents();
	}

	
	

	render () {
		let {events} = this.props.org;
		//TODO - LOADING.. WILL COME while the events are being fetched.
		return (
			<div>
				<div className = 'col-xs-4' >
					<AllEventsListComponent events = {events} />

				</div>

				<div className = 'col-xs-8' >

					<SingleEventDetailComponent/>
				</div>

			</div>
			);
	}
}

export default CSSModules(EventHomeComponent, EventHomeComponentStyle,{allowMultiple:true});
