import React from 'react';
import CSSModules from 'react-css-modules';
import NewEventFormComponentStyle from './assets/NewEventFormComponent.scss';
import  './assets/datetime.css';
import Datetime from 'react-datetime';
import SingleActivityFormComponent from './SingleActivityFormComponent/SingleActivityFormComponent.js';
import _ from 'lodash';
import moment from 'moment';

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
			desc : this.descRef.value,
			startTime : this.startTime,
			endTime : this.endTime,
			locationId : this.locationRef.value,
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

	getLocations () {

		return this.props.metadata.locations.map ((singleLocation) => {
			return (
				<option key = {singleLocation.locationId} value = {singleLocation.locationId}> 
					{singleLocation.locationName}
				</option>
				);



		});
	}

	render () {

		let activitiesView = this.getActivitiesView (this.state.activities);
		let locations = this.getLocations();
		return (
			<div>
				<div styleName="form">
					<div id="login">   
			          <h3 styleName ='welcome-back-text'>New Event</h3>
			          
			          <form>
			          
				        <div styleName="field-wrap">
				            <label styleName='labels-input'>
				              Title<span styleName="req" >*</span>
				            </label>

				            	<input styleName='text-fields' autoComplete={'off'}
				            	type = 'text' ref = {(ref) => this.titleRef = ref}/>
				        </div>

				        <div styleName="field-wrap">
				            <label styleName='labels-input'>
				              Description<span styleName="req" >*</span>
				            </label>
				            	<textarea styleName='textarea-field' ref = {(ref) => this.descRef = ref}/>
				        </div>
				        <div styleName="field-wrap">
				       		<label styleName='labels-input'>
				              Start Time<span styleName="req" >*</span>
				            </label>
							 <Datetime inputProps = {{className : "time"}}
							 onChange = {(date) => this.startTime = moment(date.toDate()).format('YYYY-MM-DD HH:mm:ss')} timeConstraints = {{minutes: { step: 30 }}} />
						</div>
						<div styleName="field-wrap">
							<label styleName='labels-input'>
				              End Time<span styleName="req" >*</span>
				            </label>

							<Datetime inputProps = {{className : "time"}}
							onChange = {(date) => this.endTime = moment(date.toDate()).format('YYYY-MM-DD HH:mm:ss')} timeConstraints = {{minutes: { step: 30 }}} />
						</div>
						<div styleName="field-wrap">
							<label styleName='labels-input'>
				              Location<span styleName="req" >*</span>
				            </label>
							<div>
								<select
								ref = {(ref) => this.locationRef = ref} >
									{locations}
								</select>
							</div>
						</div>
						<div>
							<label styleName='labels-input bigger-label'>
				              Activities<span styleName="req" >*</span>
				            </label>
							{activitiesView}

							<div styleName = 'add-button-container'>
								<input type = 'button'  styleName = 'button add-button'
							 	onClick = {() => this.onClickAddActivity()} value = 'Add'/>

							</div>
						</div>



				        <div styleName='gap-up'>
				          <div styleName = 'gap'>
					          <input type = 'button' styleName = 'button button-block'
					 			onClick = {() => this.onClickCreate()} value = 'Create'/>
				          </div>
				          
						</div>
			          </form>

			        </div>
			      
				</div> 
			</div>
			);
	}
}

export default CSSModules(NewEventFormComponent, NewEventFormComponentStyle, {allowMultiple:true});
