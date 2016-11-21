import React from 'react';
import CSSModules from 'react-css-modules';
import LoginStyle from './assets/LoginComponent.scss';
import {hashHistory} from 'react-router';
import _ from 'lodash';


class LoginComponent extends React.Component {

	constructor (props) {

		super(props);
		this._handleKeyPress = this._handleKeyPress.bind(this);
		this.onClickOfLoginButton = this.onClickOfLoginButton.bind(this);
		this.usernameRefSave = this.usernameRefSave.bind(this);
		this.passwordRefSave = this.passwordRefSave.bind(this);
		this.onClickOfGoToSignUp = this.onClickOfGoToSignUp.bind(this);
	}

	onClickOfGoToSignUp () {

		hashHistory.push('signUp');

	}

	_handleKeyPress (e) {

		if (e.key === 'Enter') {
			this.onClickOfLoginButton();
		}
	}
	usernameRefSave(ref) {
		this.usernameRef = ref;
	}


	passwordRefSave (ref) {
		this.passwordRef = ref;
	}
	onClickOfLoginButton () {
		let username = this.usernameRef.value; 
		let password = this.passwordRef.value;


		if (!username || !password) {

			this.props.triggerNotification({
				level : 'error',
				message : 'Please fill out all fields.'

			});

			return;

		}

		if (_.trim(username) !=  username) {

			this.props.triggerNotification({
				level : 'error',
				message : "No leading or trailing spaces in username"

			});

			return;

		}


		let {login} = this.props;
		login (username, password);

		
		
	}

	render () {
		let {isLoggedInChecked} = this.props.userInfo;
		if (!isLoggedInChecked) {

			return (
				<div>
					Loading..
				</div>

				);
		}

		return (
			<div  className = 'col-md-12'>

				<div className = 'col-xs-6 text-right'>
					<div>

						<strong>Username</strong>:
					</div>
					<div>

						<strong>Password</strong>:
					</div>
				</div>
				<div className = 'col-xs-6'>

					<div>

					  <input type='text' 
					ref = {this.usernameRefSave} 
					onKeyPress = {this._handleKeyPress} />
					</div>
					<div>
						  <input type ='password' 
						 ref = {this.passwordRefSave}
					 	onKeyPress = {this._handleKeyPress} />
					</div>
				</div>
				<div styleName = 'buttons' className = 'col-xs-12 text-center'>
					<input styleName = 'login' type = 'button' onClick = {this.onClickOfLoginButton}
						className = 'btn btn-primary' value = 'Login' /> 

					<input styleName = 'new-user' type = 'button' onClick = {this.onClickOfGoToSignUp}
						className = 'btn btn-primary' value = 'New User' />
				</div>
			</div>



			);
		

	}
}

export default CSSModules(LoginComponent, LoginStyle);
