import React from 'react';
import CSSModules from 'react-css-modules';
import EventHomeComponentStyle from './assets/EventHomeComponent.scss';
import AllEventsListComponent from './AllEventsListComponent/AllEventsListComponent.js';
import SingleEventDetailComponent from './SingleEventDetailComponent/SingleEventDetailComponent.js';
import _ from 'lodash';


class EventHomeComponent extends React.Component {

	constructor (props) {

		super(props);
		this.state = {
			eventSelected : null
		};
		this.selectEvent = this.selectEvent.bind(this);
	}

	componentWillMount () {
		this.props.eventActions.fetchEvents();
	}

	
	selectEvent (eventId) {
		let {events} = this.props.org;

		let event = _.find(events, function(singleEvent) { return singleEvent.eventId == eventId; });
		this.setState ({
			eventSelected : event
		});
	}

	render () {
		let {events} = this.props.org;
		//TODO - LOADING.. WILL COME while the events are being fetched.
		return (
			<div>
				<div className = 'col-xs-4' >
					<AllEventsListComponent selectEvent = {this.selectEvent} events = {events} />

				</div>

				<div className = 'col-xs-8' >

					<SingleEventDetailComponent eventSelected = {this.state.eventSelected} />
				</div>

			</div>
			);
	}
}

export default CSSModules(EventHomeComponent, EventHomeComponentStyle,{allowMultiple:true});
