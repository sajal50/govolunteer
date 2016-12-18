import React from 'react';
import CSSModules from 'react-css-modules';
import NewEventResultComponentStyle from './assets/NewEventResultComponent.scss';


class NewEventResultComponent extends React.Component {

	constructor (props) {

		super(props);
		
	}

	
	activitiesView () {

		return this.props.resultEvent.activities.map ((singleActivity)=>{


			return (
				<div key = {singleActivity.activityId}>

					<div> Title : {singleActivity.title}</div>
					{

						(singleActivity.user) ? 

						<div> Requested : {singleActivity.user.name} </div>
						:
						<div> Requested : Couldn't find a match. </div>
					}
					
				</div>

				);



		});
	}
	componentWillUnmount() {

		this.props.clearEventResult();
	}

	render () {
		let {title, desc, startTime, endTime} = this.props.resultEvent;
		let activitiesView = this.activitiesView();
		return (
			<div>
				Your event has been created.
				<div>
					title : {title}
				</div>
				<div>
					desc : {desc}
				</div>
				<div>
					startTime : {startTime}
				</div>
				<div>
					endTime : {endTime}
				</div>

				<div>
					And the requests have been sent for the following activities.
					{activitiesView}
				</div>
				

			</div>
			);
	}
}

export default CSSModules(NewEventResultComponent, NewEventResultComponentStyle);
