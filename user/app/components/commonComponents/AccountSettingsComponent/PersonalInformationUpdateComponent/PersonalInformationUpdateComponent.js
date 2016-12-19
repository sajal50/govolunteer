import React from 'react';
import CSSModules from 'react-css-modules';
import PersonalInformationUpdateComponentStyles from './assets/PersonalInformationUpdateComponent.scss';
import {hashHistory} from 'react-router';
import _ from 'lodash';
import ProfilePicUploadComponent from './ProfilePicUploadComponent/ProfilePicUploadComponent.js';

class PersonalInformationUpdateComponent extends React.Component {

	constructor (props) {

		super(props);
		this.state = {
      		desc: this.props.userInfo.desc,
      		locationId : this.props.userInfo.locationId
    	};
    	this.handleDescOnChange = this.handleDescOnChange.bind(this);
    	this.handleLocationOnChange = this.handleLocationOnChange.bind(this);
	}
	handleDescOnChange(event) {
    	this.setState({desc: event.target.value});
  	}
  	getLocations () {

		return this.props.metadata.locations.map ((singleLocation) => {
			return (
				 	<option key = {singleLocation.locationId}
						
					 	value = {singleLocation.locationId}> 
						{singleLocation.locationName}
					</option>
				
				);



		});
	}
	onClickUpdate () {

		this.props.accountManagementActions.updateInfo({
			locationId : this.locationRef.value,
			desc : this.state.desc
		});
	}
	handleLocationOnChange(event) {
    	this.setState({locationId: event.target.value});
  	}
	render () {

		let locations = this.getLocations();
		return (
			<div>
				<div styleName = 'personal-info-update-container' >
					<div styleName = 'form'>
						
						<div styleName="field-wrap">
				            <label styleName='labels-input'>
				              Description<span styleName="req" >*</span>
				            </label>
				            	<textarea styleName='textarea-field'
				            	value={this.state.desc} onChange={this.handleDescOnChange}
				            	/>
				        </div>

						<div styleName="field-wrap">
							<label styleName='labels-input'>
					              Location<span styleName="req" >*</span>
					        </label>
					        <div>
							{
								(this.state.locationId) ?
								<select
								value = {this.state.locationId}
								onChange = {this.handleLocationOnChange}
								ref = {(ref) => this.locationRef = ref} >
									{locations}
								</select> :

								<select
								onChange = {this.handleLocationOnChange}
								ref = {(ref) => this.locationRef = ref} >
									{locations}
								</select>

							}
							</div>
						</div>
						<div styleName = 'gap'>
							<input type = 'button' styleName = 'button button-block'
					 			onClick = {() => this.onClickUpdate()} value = 'Update'/>
						</div>
					</div>
				</div>
				<div styleName = 'profile-pic-update-container'>

					<ProfilePicUploadComponent 
					accountManagementActions = {this.props.accountManagementActions}
					/>
				</div>
			</div>




			);
		

	}
}

export default CSSModules(PersonalInformationUpdateComponent, PersonalInformationUpdateComponentStyles, {allowMultiple:true});
