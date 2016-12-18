import React from 'react';
import CSSModules from 'react-css-modules';
import AllEventsListComponentStyle from './assets/AllEventsListComponent.scss';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment';
BigCalendar.momentLocalizer(moment);

class AllEventsListComponent extends React.Component {

	constructor (props) {

		super(props);
		this.state = {
			events : [
		
		  {
		    'title': 'All Day Event',
		    'check' : 'sajal',
		    'start': new Date('2016-12-18 1:30:00'),
		    'end':  new Date('2016-12-18 15:30:00')
		  }
		]
		};
		
	}



	getListView (events) {

		return events.map ((singleEvent)=>{

			return (
				<div onClick = {()=> this.props.selectEvent(singleEvent.eventId)} 
				styleName = 'single-box pointer' key = {singleEvent.eventId}>
					Event : {singleEvent.title} 
				</div>
				);


		});
	}

	parseInfo (events) {

		return events.map ((singleEvent)=> {

			singleEvent['start'] = new Date (singleEvent.startTime)
			singleEvent['end'] = new Date (singleEvent.endTime)
			return singleEvent

		});


	}
	

	render () {

		let listView = this.getListView(this.props.events);
		let events = this.parseInfo(this.props.events);
		return (
			<div styleName = 'calendar-container'>
				<BigCalendar
		          selectable
		          timeslots = {2}
		          events={events}
		          defaultView='week'
		          onSelectEvent={event => this.props.selectEvent(event.eventId)}
		        />
			</div>
			);
	}
}

export default CSSModules(AllEventsListComponent, AllEventsListComponentStyle, {allowMultiple: true});
