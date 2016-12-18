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
				<div>
					Description <br/><textarea value={this.state.desc} onChange={this.handleDescOnChange} />
				</div>
				<div>
					Location : <br/>
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

				<input type='button' onClick = {() => this.onClickUpdate()} className = 'btn btn-success' value = 'Update' />

				<ProfilePicUploadComponent 
				accountManagementActions = {this.props.accountManagementActions}
				/>
			</div>




			);
		

	}
}

export default CSSModules(PersonalInformationUpdateComponent, PersonalInformationUpdateComponentStyles);
