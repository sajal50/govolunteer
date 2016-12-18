import React from 'react';
import CSSModules from 'react-css-modules';
import EventHomeComponentStyle from './assets/EventHomeComponent.scss';
import AllEventsListComponent from './AllEventsListComponent/AllEventsListComponent.js';
import SingleEventDetailComponent from './SingleEventDetailComponent/SingleEventDetailComponent.js';
import _ from 'lodash';
import {hashHistory} from 'react-router';


class EventHomeComponent extends React.Component {

	constructor (props) {

		super(props);
		this.state = {
			eventSelected : null,
			showDetailsModal : false
		};
		this.selectEvent = this.selectEvent.bind(this);
		this.closeDetailsModal = this.closeDetailsModal.bind(this);
	}

	componentWillMount () {
		this.props.eventActions.fetchEvents();
	}

	
	selectEvent (eventId) {
		let {events} = this.props.org;

		let event = _.find(events, function(singleEvent) { return singleEvent.eventId == eventId; });
		this.setState ({
			eventSelected : event,
			showDetailsModal : true
		});
	}

	closeDetailsModal() {
		this.setState({showDetailsModal:false});
	}

	render () {
		let {events} = this.props.org;
		//TODO - LOADING.. WILL COME while the events are being fetched.
		return (
			<div>
				<div>
					<input onClick = {() => hashHistory.push('org/new-event')} className = 'btn btn-success'
					 type = 'button' value = 'New Event' />
				</div>
				<br/>
				<div>

						<AllEventsListComponent selectEvent = {this.selectEvent} events = {events} />
						<SingleEventDetailComponent showDetailsModal = {this.state.showDetailsModal}
						closeDetailsModal = {this.closeDetailsModal}
						eventSelected = {this.state.eventSelected} />
				</div>

			</div>
			);
	}
}

export default CSSModules(EventHomeComponent, EventHomeComponentStyle,{allowMultiple:true});
