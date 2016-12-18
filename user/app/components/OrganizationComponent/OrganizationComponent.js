import React from 'react';
import CSSModules from 'react-css-modules';
import OrganizationComponentStyles from './assets/OrganizationComponent.scss';
import SidebarComponent from './SidebarComponent/SidebarComponent.js';
import AccountSettingsComponent from '../commonComponents/AccountSettingsComponent/AccountSettingsComponent.js';
import EventHomeComponent from './EventHomeComponent/EventHomeComponent.js';
import NewEventComponent from './NewEventComponent/NewEventComponent.js';

class OrganizationComponent extends React.Component {

	constructor (props) {

		super(props);
		this.componentHash = {
			'events' : EventHomeComponent,
			'accountsettings' : AccountSettingsComponent,
			'new-event' : NewEventComponent
		};
		
	}

	
	getComponentToBeLoaded () {

		return this.componentHash[this.props.params.childRoute];
	}

	getPropsToBePassed () {

		switch (this.props.params.childRoute) {

			case 'events' : 
			return {eventActions: this.props.eventActions, org: this.props.org};
			break;
			
			case 'new-event' :  
			return {newEventActions : this.props.newEventActions, org: this.props.org, metadata:this.props.metadata}
			break;

			case 'accountsettings' :
			return {
				accountManagementActions: this.props.accountManagementActions,
			 	userInfo : this.props.userInfo,
			 	metadata : this.props.metadata
			 };
			break;
			
			default : return {};
		}
	}

	render () {

		let {isLoggedIn} = this.props.userInfo;
		
		if (!isLoggedIn) {
			return (<div>Loading..</div>);
		}
		else {
			let ComponentToBeLoaded = this.getComponentToBeLoaded();
			let propsToBePassed = this.getPropsToBePassed();
			return (

				<div styleName= 'organization-container'>
					<div styleName = 'sidebar-container'>
						<SidebarComponent/>
					</div>
					
					<div styleName='event-container'>

						<ComponentToBeLoaded {...propsToBePassed}/>
						
					</div>



				</div>

			);

		}
		

	}
}

export default CSSModules(OrganizationComponent, OrganizationComponentStyles);
