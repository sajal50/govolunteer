import React from 'react';
import CSSModules from 'react-css-modules';
import NewEventFormComponentStyle from './assets/NewEventFormComponent.scss';
import  './assets/datetime.css';
import Datetime from 'react-datetime';
import SingleActivityFormComponent from './SingleActivityFormComponent/SingleActivityFormComponent.js';
import _ from 'lodash';

class NewEventFormComponent extends React.Component {

	constructor (props) {

		super(props);
		this.state = {
			activities : [{
				activityId : 1,
				title : null,
				categoryId : null,
				startTime : null,
				endTime : null,
				desc: null
			}]
		};
		this.onDeleteClick = this.onDeleteClick.bind(this);
		this.globalCounter = 1;
		this.onChangeOfValue = this.onChangeOfValue.bind(this);
		
	}
	onClickAddActivity () {

		let newActivities = _.slice(this.state.activities);
		this.globalCounter += 1;
		newActivities.push({

			activityId : this.globalCounter,
			title : null,
			categoryId : null,
			startTime : null,
			endTime : null,
			desc: null

		});




		this.setState ({
			activities : newActivities

		});
	}

	onClickCreate () {

		//TODO- validations

		let activities = this.state.activities.map ((singleActivity) => {

			singleActivity.activityId = null;
			return singleActivity;


		});

		this.props.newEventActions.createNewEvent({

			eventId: null,
			title: this.titleRef.value,
			startTime : this.startTime,
			endTime : this.endTime,
			activities : activities

		});


	}

	onDeleteClick (activityId) {

		let newActivities = _.filter(this.state.activities, (singleActivity) => {

			return singleActivity.activityId != activityId;


		});

		this.setState({

			activities : newActivities


		});


	}
	onChangeOfValue (values) {

		//console.log(values);
		let newActivities = this.state.activities.map((singleActivity) => {

			if (singleActivity.activityId == values.activityId) {
				return values;
			} else {
				return singleActivity;
			}


		});

		this.setState({

			activities : newActivities

		});

	}

	getActivitiesView (activities) {

		return activities.map ((singleActivity) => {

			return (

				<SingleActivityFormComponent metadata = {this.props.metadata} 
				onChangeOfValue = {this.onChangeOfValue}
				onDeleteClick  = {this.onDeleteClick}
				activityId = {singleActivity.activityId} key = {singleActivity.activityId} />

				);


		});

	}

	render () {

		let activitiesView = this.getActivitiesView (this.state.activities);

		return (
			<div>
				<div>
					Title : <br/><input type = 'text' ref = {(ref) => this.titleRef = ref}/>
				</div>
				<div>
					Description : <br/><textarea ref = {(ref) => this.descRef = ref}/>
				</div>
				<div>
					Start : <br/><Datetime  onChange = {(date) => this.startTime = date.toDate()} timeConstraints = {{minutes: { step: 30 }}} />
				</div>
				<div>
					End : <br/><Datetime onChange = {(date) => this.endTime = date.toDate()} timeConstraints = {{minutes: { step: 30 }}} />
				</div>
				<div>
					Activities : <br/>
					{activitiesView}

					<div>
						<input type = 'button'  className = 'btn btn-success'
					 	onClick = {() => this.onClickAddActivity()} value = 'Add'/>

					</div>
				</div>
				<div>
					<input type = 'button'  className = 'btn btn-success'
					 onClick = {() => this.onClickCreate()} value = 'Create'/>
				</div>
			</div>
			);
	}
}

export default CSSModules(NewEventFormComponent, NewEventFormComponentStyle);
