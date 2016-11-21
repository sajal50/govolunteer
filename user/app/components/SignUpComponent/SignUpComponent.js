import React from 'react';
import CSSModules from 'react-css-modules';
import SignUpComponentStyles from './assets/SignUpComponent.scss';
import {hashHistory} from 'react-router';
import _ from 'lodash';

class SignUpComponent extends React.Component {

	constructor (props) {

		super(props);
		this._handleKeyPress = this._handleKeyPress.bind(this);
		this.onClickOfSignUButton = this.onClickOfSignUButton.bind(this);

	}

	_handleKeyPress (e) {

		if (e.key === 'Enter') {
			this.onClickOfSignUButton();
		}
	}
	
	onClickOfSignUButton () {

		if (!this.usernameRefSave.value || !this.passwordRefSave.value || !this.passwordCopyRefSave.value) {

			this.props.triggerNotification({

				"level" : "error",
				"message" : "Please, fill out all fields."


			});
			return

		}
		if (_.trim(this.usernameRefSave.value) !=  this.usernameRefSave.value) {

			this.props.triggerNotification({

				"level" : "error",
				"message" : "Username can't have leading or trailing spaces."


			});
			return

		}

		if (this.passwordCopyRefSave.value != this.passwordRefSave.value) {
			this.props.triggerNotification ({

				"level" : "error",
				"message" : "Passwords don't match."
			});
			return
		}

		if (!_.trim(this.passwordRefSave.value)) {

			this.props.triggerNotification({

				"level" : "error",
				"message" : "Password can't be all spaces."


			});
			return

		}



		
		this.props.signUp({

			username : this.usernameRefSave.value,
			password : this.passwordRefSave.value
		});
		
	}

	render () {
		return (
			<div  className = 'col-md-12'>
				<div>

					<strong>Username</strong>:  <input type='text' 
					ref = {(ref) => this.usernameRefSave = ref} 
					onKeyPress = {this._handleKeyPress} />
				</div>
				<div>
					<strong>Password</strong>:  <input type ='password' 
					 ref = {(ref) => this.passwordRefSave = ref}
				 	onKeyPress = {this._handleKeyPress} />
				</div>

				<div>
					<strong>Re-Enter Password</strong>:  <input type ='password' 
					 ref = {(ref) => this.passwordCopyRefSave = ref}
				 	onKeyPress = {this._handleKeyPress} />
				</div>
				 <input type = 'button' onClick = {this.onClickOfSignUButton}
				  className = 'btn btn-primary' value = 'Sign Up' />
				  <br/>
				  <br/>

				  <input type = 'button' onClick = {()=> hashHistory.push('login')}
				  className = 'btn btn-primary' value = 'Already a User' />

			</div>



			);
		

	}
}

export default CSSModules(SignUpComponent, SignUpComponentStyles);
