import React from 'react';
import CSSModules from 'react-css-modules';
import AccountSettingsComponentStyles from './assets/AccountSettingsComponent.scss';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import PasswordUpdateComponent from './PasswordUpdateComponent/PasswordUpdateComponent.js';
import PersonalInformationUpdateComponent from './PersonalInformationUpdateComponent/PersonalInformationUpdateComponent.js';

class AccountSettingsComponent extends React.Component {

	constructor (props) {

		super(props);
		this.handleSelect = this.handleSelect.bind(this);
		this.state = {
			'activeKey' : 1

		};
		this.componetHash  = {

			1 : PasswordUpdateComponent,
			2 : PersonalInformationUpdateComponent


		};
	}
	handleSelect (selectedKey) {
		this.setState({
			'activeKey' : selectedKey
		})

	}
	getComponentToBeLoaded () {

		return this.componetHash[this.state.activeKey]


	}

	getPropsToBePassed () {
		switch (this.state.activeKey) {
			case 1 :
			return {accountManagementActions:this.props.accountManagementActions};
			
			break;


			case 2 :
			return {};
			break;

			default:
			return {};
		}
	}
	render () {

		let ComponentToBeLoaded  = this.getComponentToBeLoaded();
		let propsToBePassed = this.getPropsToBePassed();
		return (

			<div>
				<Nav bsStyle="tabs" justified activeKey={this.state.activeKey} onSelect={this.handleSelect}>
		          <NavItem eventKey={1}> Update Password</NavItem>
		          <NavItem eventKey={2}> Update Other Information</NavItem>
		        </Nav>
		        <div>
		        	<ComponentToBeLoaded {...propsToBePassed} />
		        </div>

			</div>



			);
		

	}
}

export default CSSModules(AccountSettingsComponent, AccountSettingsComponentStyles);
