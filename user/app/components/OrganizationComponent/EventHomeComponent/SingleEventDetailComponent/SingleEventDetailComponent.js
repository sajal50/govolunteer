import React from 'react';
import CSSModules from 'react-css-modules';
import SingleEventDetailComponentStyle from './assets/SingleEventDetailComponent.scss';


class SingleEventDetailComponent extends React.Component {

	constructor (props) {

		super(props);
		
	}

	getViewForActivities (activities) {

		return activities.map ((singleActivity) => {

			return (

				<div key = {singleActivity.activityId}>
					<div>
						Title : {singleActivity.title}
					</div>
					<div>
						Start time :  {singleActivity.startTime}
					</div>
					<div>
						End time :  {singleActivity.endTime}
					</div>
					{
						(singleActivity.user) ?
						<div>
							User Assigned : {singleActivity.user.name}
							Status : {singleActivity.user.status}
						</div>
						:
						<div>
							User Assigned : No user assigned.
						</div>
					}
				</div>

				);


		});


	}
	

	render () {

		let {eventSelected} = this.props;

		if (!eventSelected) {
			return (<div>Click on an event.</div>);
		} else {

			let viewForActivities = this.getViewForActivities (this.props.eventSelected.activities);

			return (
			<div>
				<div>
					Title : {eventSelected.title}

				</div>
				<div>
					Description : {eventSelected.desc}
					
				</div>
				<div>
					Start time :  {eventSelected.startTime}
				</div>
				<div>
					End time :  {eventSelected.endTime}
				</div>
				<div>
					Activities : 

					{viewForActivities}
					
				</div>

			</div>
			);


		}
		
	}
}

export default CSSModules(SingleEventDetailComponent, SingleEventDetailComponentStyle);
