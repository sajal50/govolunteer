import React from 'react';
import CSSModules from 'react-css-modules';
import AllEventsListComponentStyle from './assets/AllEventsListComponent.scss';


class AllEventsListComponent extends React.Component {

	constructor (props) {

		super(props);
		
	}



	getListView (events) {

		return events.map ((singleEvent)=>{

			return (
				<div styleName = 'single-box pointer' key = {singleEvent.eventId}>
					Event : {singleEvent.title} 
				</div>
				);


		});
	}
	

	render () {

		let listView = this.getListView(this.props.events);
		return (
			<div>
				{listView}
			</div>
			);
	}
}

export default CSSModules(AllEventsListComponent, AllEventsListComponentStyle, {allowMultiple: true});
