import React from 'react';
import CSSModules from 'react-css-modules';
import NewPostFormComponentStyle from './assets/NewPostFormComponent.scss';
import  './assets/datetime.css';
import Datetime from 'react-datetime';
import moment from 'moment';

class NewPostFormComponent extends React.Component {

	constructor (props) {

		super(props);
		
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
				<div styleName="form">
					<div id="login">   
			          <h3 styleName ='welcome-back-text'>New Post</h3>
			          
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
									{locationOptions}
								</select>
				            </div>

						</div>
						<div styleName="field-wrap">
							<label styleName='labels-input'>
				              Category<span styleName="req" >*</span>
				            </label>
				            <div>
				            	<select 
								ref = {(ref) => this.categoryRef = ref} >
									{categoryOptions}
								</select>
				            </div>

						</div>
						
						



				        <div styleName='gap-up'>
				          <div styleName = 'gap'>
					          <input type = 'button' styleName = 'button button-block'
					 			onClick = {() => this.onClickPost()} value = 'Post'/>
				          </div>
				          
						</div>
			          </form>

			        </div>
			      
				</div>

				
			</div>
			);
	}
}

export default CSSModules(NewPostFormComponent, NewPostFormComponentStyle, {allowMultiple:true});
