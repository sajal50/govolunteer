import React from 'react';
import CSSModules from 'react-css-modules';
import PasswordUpdateComponentStyles from './assets/PasswordUpdateComponent.scss';
import {hashHistory} from 'react-router';
import _ from 'lodash';

class PasswordUpdateComponent extends React.Component {

	constructor (props) {

		super(props);
		this._handleKeyPress = this._handleKeyPress.bind(this);
		this.onClickOfUpdatePasswordButton = this.onClickOfUpdatePasswordButton.bind(this);

	}

	_handleKeyPress (e) {

		if (e.key === 'Enter') {
			this.onClickOfUpdatePasswordButton();
		}
	}
	
	onClickOfUpdatePasswordButton () {

		if (!this.oldpasswordRefSave.value || !this.newpasswordRefSave.value || !this.newpasswordCopyRefSave.value) {

			this.props.accountManagementActions.triggerNotification({

				"level" : "error",
				"message" : "Please, fill out all fields."


			});
			return

		}
		if (_.trim(this.oldpasswordRefSave.value) !=  this.oldpasswordRefSave.value) {

			this.props.accountManagementActions.triggerNotification({

				"level" : "error",
				"message" : "Username can't have leading or trailing spaces."


			});
			return

		}


		if (this.newpasswordCopyRefSave.value != this.newpasswordRefSave.value) {
			this.props.accountManagementActions.triggerNotification ({

				"level" : "error",
				"message" : "Passwords don't match."
			});
			return
		}
		if (this.newpasswordRefSave.value == this.oldpasswordRefSave.value)  {

			this.props.accountManagementActions.triggerNotification ({

				"level" : "error",
				"message" : "New password and old password can't match."
			});
			return

		}

		if (!_.trim(this.newpasswordRefSave.value)) {

			this.props.accountManagementActions.triggerNotification({

				"level" : "error",
				"message" : "Password can't be all spaces."


			});
			return

		}



		
		this.props.accountManagementActions.updatePassword(

			this.oldpasswordRefSave.value,
			this.newpasswordRefSave.value
		);
		
	}
	render () {
			return (
			<div  className = 'col-md-12'>
				<div>

					<strong>Old Password</strong>:  <input type='password' 
					ref = {(ref) => this.oldpasswordRefSave = ref} 
					onKeyPress = {this._handleKeyPress} />
				</div>
				<div>
					<strong>New Password</strong>:  <input type ='password' 
					 ref = {(ref) => this.newpasswordRefSave = ref}
				 	onKeyPress = {this._handleKeyPress} />
				</div>

				<div>
					<strong>Re-Enter New Password</strong>:  <input type ='password' 
					 ref = {(ref) => this.newpasswordCopyRefSave = ref}
				 	onKeyPress = {this._handleKeyPress} />
				</div>
				 <input type = 'button' onClick = {this.onClickOfUpdatePasswordButton}
				  className = 'btn btn-primary' value = 'Update Password' />
				  <br/>
				  <br/>

			</div>



			);

	}
}

export default CSSModules(PasswordUpdateComponent, PasswordUpdateComponentStyles);
