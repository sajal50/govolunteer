import React from 'react';
import CSSModules from 'react-css-modules';
import ForgotPasswordComponentStyle from './assets/ForgotPasswordComponent.scss';
import {hashHistory} from 'react-router';


class ForgotPasswordComponent extends React.Component {

	constructor (props) {

		super(props);
		this._handleKeyPress = this._handleKeyPress.bind(this);
		this.onClickSendEmail = this.onClickSendEmail.bind(this);
	}

	_handleKeyPress (e) {

		if (e.key === 'Enter') {
			this.onClickSendEmail();
		}
	}
	
	onClickSendEmail () {

		let emailId = this.emailRef.value;
		this.props.sendEmailCode(emailId);
	}
	render () {

		return (
			<div>

				<div styleName="form">
					<div id="login">   
			          <h1 styleName ='welcome-back-text'>Don't Worry!</h1>
			          
			          <form>
			          
				        <div styleName="field-wrap">
				            <label styleName='labels-input'>
				              Email Address<span styleName="req" >*</span>
				            </label>
				            	<input styleName='text-fields' autoComplete={'off'}
				            	type='text' 
								ref = {(ref)=>this.emailRef = ref} 
								onKeyPress = {this._handleKeyPress} />


				        </div>
				        <div styleName='gap-up'>
				          <div styleName = 'gap'>
					          <input type = 'button' onClick = {this.onClickSendEmail}
					          styleName="button button-block" value = 'Send Email'/>
				          </div>

						</div>

						<div onClick = {() => hashHistory.push('resetPassword')} styleName = 'forgot-text'>
							<span>Already have the code? </span>
						</div>

			          </form>

			        </div>
			      
				</div> 
							


			</div>
			);
	}
}

export default CSSModules(ForgotPasswordComponent, ForgotPasswordComponentStyle, {allowMultiple:true});
