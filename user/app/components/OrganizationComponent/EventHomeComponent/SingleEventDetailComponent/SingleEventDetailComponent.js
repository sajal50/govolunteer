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
						User Assigned : {singleActivity.user.username}
						Status : {singleActivity.user.status}
					</div>
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
					Activities : 

					{viewForActivities}
					
				</div>

			</div>
			);


		}
		
	}
}

export default CSSModules(SingleEventDetailComponent, SingleEventDetailComponentStyle);
