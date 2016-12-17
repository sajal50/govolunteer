import React from 'react';
import CSSModules from 'react-css-modules';
import NewPostFormComponentStyle from './assets/NewPostFormComponent.scss';
import  './assets/datetime.css';
import Datetime from 'react-datetime';
import _ from 'lodash';

class NewPostFormComponent extends React.Component {

	constructor (props) {

		super(props);
		// this.onDeleteClick = this.onDeleteClick.bind(this);
		// this.globalCounter = 1;
		// this.onChangeOfValue = this.onChangeOfValue.bind(this);
		
	}
	
	getCategoryOptions () {



		return this.props.metadata.categories.map ((singleCategory) => {
			return (
				<option key = {singleCategory.categoryId} value = {singleCategory.categoryId}> 
					{singleCategory.categoryName}
				</option>
				);



		});
	}

	getLocationOptions () {



		return this.props.metadata.locations.map ((singleLocation) => {
			return (
				<option key = {singleLocation.locationId} value = {singleLocation.locationId}> 
					{singleLocation.locationName}
				</option>
				);



		});
	}

	onClickPost () {

		//TODO- validations

		this.props.newPostActions.createNewPost({
			
			title: this.titleRef.value,
			desc: this.descRef.value,
			startTime : this.startTime,
			endTime : this.endTime,
			locationId : this.locationRef.value,
			categoryId : this.categoryRef.value
		});


	}

	render () {
		let categoryOptions = this.getCategoryOptions ();
		let locationOptions = this.getLocationOptions ();

		return (
			<div>
				<div>
					Title : <br/><input type = 'text' ref = {(ref) => this.titleRef = ref}/>
				</div>
				<div>
					Description : <br/><textarea ref = {(ref) => this.descRef = ref}/>
				</div>
				<div>
					Start Time : <br/><Datetime  onChange = {(date) => this.startTime = date.toDate()} timeConstraints = {{minutes: { step: 30 }}} />
				</div>
				<div>
					End Time: <br/><Datetime onChange = {(date) => this.endTime = date.toDate()} timeConstraints = {{minutes: { step: 30 }}} />
				</div>
				<div>
					Category : <br/>
					<select 
					ref = {(ref) => this.categoryRef = ref} >
						{categoryOptions}
					</select>
				</div>
				<div>
					Location : <br/>
					<select 
					ref = {(ref) => this.locationRef = ref} >
						{locationOptions}
					</select>
				</div>
				<div>
					<input type = 'button'  className = 'btn btn-success'
					 onClick = {() => this.onClickPost()} value = 'Post'/>
				</div>
			</div>
			);
	}
}

export default CSSModules(NewPostFormComponent, NewPostFormComponentStyle);
