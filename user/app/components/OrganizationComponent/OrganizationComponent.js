import React from 'react';
import CSSModules from 'react-css-modules';
import OrganizationComponentStyles from './assets/OrganizationComponent.scss';
import SidebarComponent from './SidebarComponent/SidebarComponent.js';
import AccountSettingsComponent from './AccountSettingsComponent/AccountSettingsComponent.js';
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
			return {}
			break;
			
			default : return {};
		}
	}

	render () {

		let {isLoggedInChecked} = this.props.userInfo;

		if (!isLoggedInChecked) {
			return (<div>Loading..</div>);
		}
		else {
			let ComponentToBeLoaded = this.getComponentToBeLoaded();
			let propsToBePassed = this.getPropsToBePassed();
			return (

				<div>
					<div className = 'col-xs-3'>
						<SidebarComponent/>
					</div>
					
					<div className = 'col-xs-9'>

						<ComponentToBeLoaded {...propsToBePassed}/>
						
					</div>



				</div>

			);

		}
		

	}
}

export default CSSModules(OrganizationComponent, OrganizationComponentStyles);
