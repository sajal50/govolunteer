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
		this.state = {
			checked: "PERSON"
		}

	}

	_handleKeyPress (e) {

		if (e.key === 'Enter') {
			this.onClickOfSignUButton();
		}
	}

	onClickTypeChangeHandler (e) {

		this.setState({
			checked : e.target.value
		})
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

			email : this.usernameRefSave.value,
			password : this.passwordRefSave.value,
			name : this.nameRefSave.value,
			type : this.state.checked
		});
		
	}

	render () {
		return (

			<div  className = 'col-md-12'>

				<div className = 'col-xs-6 text-right'>
					<div styleName = 'label'>

						<strong>Email</strong>:
					</div>
					<div styleName = 'label'>

						<strong>Name</strong>:
					</div>
					<div styleName = 'label'>

						<strong>Password</strong>:
					</div>
					<div styleName = 'label'>

						<strong>Re-Enter Password</strong>:
					</div>
					<div styleName = 'label'>

						<strong>Are you an organization?</strong>:
					</div>

				</div>
				<div className = 'col-xs-6'>

					<div>

					  <input type='text' 
						ref = {(ref) => this.usernameRefSave = ref} 
						onKeyPress = {this._handleKeyPress} />
					</div>

					<div>
						  <input type ='text' 
						 	ref = {(ref) => this.nameRefSave = ref}
					 		onKeyPress = {this._handleKeyPress} />
					</div>
					
					<div>
						  <input type ='password' 
						 	ref = {(ref) => this.passwordRefSave = ref}
					 		onKeyPress = {this._handleKeyPress} />
					</div>
					<div>
						  <input type ='password' 
						 	ref = {(ref) => this.passwordCopyRefSave = ref}
					 		onKeyPress = {this._handleKeyPress} />
					</div>
					<div>
						<input type="radio" name="typeOfSignUp" 
                                   value="PERSON" 
                                   checked= {this.state.checked == 'PERSON'}
                                   onChange = {(e)=> this.onClickTypeChangeHandler(e)}
                                   />No
                        <input type="radio" name="typeOfSignUp" 
                                   value="ORGANIZATION"
                                   checked= {this.state.checked == 'ORGANIZATION'}
                                   onChange = {(e) => this.onClickTypeChangeHandler(e)}
                                    />Yes
					</div>
				</div>
				<div styleName = 'buttons' className = 'col-xs-12 text-center'>
					<input type = 'button' onClick = {this.onClickOfSignUButton}
				  className = 'btn btn-primary' value = 'Sign Up' />

					<input type = 'button' onClick = {()=> hashHistory.push('login')}
				  className = 'btn btn-primary' value = 'Already a User' />
				</div>
			</div>


			);
		

	}
}

export default CSSModules(SignUpComponent, SignUpComponentStyles);
