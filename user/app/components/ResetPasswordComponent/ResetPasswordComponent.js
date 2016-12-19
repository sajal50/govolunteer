import React from 'react';
import CSSModules from 'react-css-modules';
import ResetPasswordComponentStyle from './assets/ResetPasswordComponent.scss';
import {hashHistory} from 'react-router';


class ResetPasswordComponent extends React.Component {

	constructor (props) {

		super(props);
		this.onClickResetPassword = this.onClickResetPassword.bind(this);
	}

	
	_handleKeyPress (e) {

		if (e.key === 'Enter') {
			this.onClickResetPassword();
		}
	}
	
	onClickResetPassword () {
		if (this.newpasswordCopyRefSave.value != this.newpasswordRefSave.value) {
			this.props.triggerNotification ({

				"level" : "error",
				"message" : "Passwords don't match."
			});
			return
		}

		this.props.resetPassword ({
			emailId : this.emailRef.value,
			newPassword : this.newpasswordRefSave.value,
			verificationCode : this.verCodeRef.value

		});
		this.newpasswordRefSave.value = '';
		this.newpasswordCopyRefSave.value = '';
		this.verCodeRef.value = '';
		this.emailRef.value = '';
		// let emailId = this.emailRef.value;
		// this.props.sendEmailCode(emailId);
	}
	render () {

		return (
			<div>

				<div styleName="form">
					<div id="login">   
			          <h1 styleName ='welcome-back-text'>Reset Password</h1>
			          
			          <form>
			          	<div styleName="field-wrap">
				            <label styleName='labels-input'>
				              Email ID<span styleName="req" >*</span>
				            </label>
				            	<input styleName='text-fields' autoComplete={'off'}
				            	type='text' 
								ref = {(ref)=>this.emailRef = ref} 
								onKeyPress = {this._handleKeyPress} />


				        </div>

				        <div styleName="field-wrap">
				            <label styleName='labels-input'>
				              Verification Code<span styleName="req" >*</span>
				            </label>
				            	<input styleName='text-fields' autoComplete={'off'}
				            	type='text' 
								ref = {(ref)=>this.verCodeRef = ref} 
								onKeyPress = {this._handleKeyPress} />


				        </div>
				        <div styleName="field-wrap">
				            <label styleName='labels-input'>
				              New Password<span styleName="req" >*</span>
				            </label>
				            	<input 
				            	styleName='text-fields' autoComplete={'off'}
				            	type ='password' 
								ref = {(ref) => this.newpasswordRefSave = ref}
							 	onKeyPress = {this._handleKeyPress} />

				        </div>
				        <div styleName="field-wrap">
				            <label styleName='labels-input'>
				              Re-enter New Password<span styleName="req" >*</span>
				            </label>
				            	<input 
				            	styleName='text-fields' autoComplete={'off'}
				            	type ='password' 
								ref = {(ref) => this.newpasswordCopyRefSave = ref}
							 	onKeyPress = {this._handleKeyPress} />

				        </div>
				        <div styleName='gap-up'>
				          <div styleName = 'gap'>
					          <input type = 'button' onClick = {this.onClickResetPassword}
					          styleName="button button-block" value = 'Reset'/>
				          </div>

						</div>

						<div onClick = {() => hashHistory.push('login')} styleName = 'forgot-text'>
							<span>Know the password? </span>
						</div>

			          </form>

			        </div>
			      
				</div> 
							


			</div>
			);
	}
}

export default CSSModules(ResetPasswordComponent, ResetPasswordComponentStyle,{allowMultiple:true});
