import React from 'react';
import CSSModules from 'react-css-modules';
import OrganizationComponentStyles from './assets/OrganizationComponent.scss';
import NotificationSystem from 'react-notification-system';
import SidebarComponent from './SidebarComponent/SidebarComponent.js';
import AccountSettingsComponent from './AccountSettingsComponent/AccountSettingsComponent.js';

class OrganizationComponent extends React.Component {

	constructor (props) {

		super(props);
		this.componentHash = {
			'events' : SearchComponent,
			'accountsettings' : AccountSettingsComponent
		};
		
	}

	
	getComponentToBeLoaded () {

		return this.componentHash[this.props.params.childRoute];
	}

	getPropsToBePassed () {

		switch (this.props.params.childRoute) {

			case 'events' : return {searchProps: this.props.searchProps, searchActions:this.props.searchActions};
							break;
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

						Event Component
						
					</div>



				</div>

			);

		}
		

	}
}

export default CSSModules(OrganizationComponent, OrganizationComponentStyles);
