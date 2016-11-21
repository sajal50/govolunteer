import React from 'react';
import CSSModules from 'react-css-modules';
import HomeComponentStyles from './assets/HomeComponent.scss';
import NotificationSystem from 'react-notification-system';
//import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import SidebarComponent from './SidebarComponent/SidebarComponent.js';
import SearchComponent from './SearchComponent/SearchComponent.js';
import AccountSettingsComponent from './AccountSettingsComponent/AccountSettingsComponent.js';

class HomeComponent extends React.Component {

	constructor (props) {

		super(props);
		this.componentHash = {
			'search' : SearchComponent,
			'accountsettings' : AccountSettingsComponent
		};
		
	}

	
	getComponentToBeLoaded () {

		return this.componentHash[this.props.params.childRoute];
	}

	getPropsToBePassed () {

		switch (this.props.params.childRoute) {

			case 'search' : return {searchProps: this.props.searchProps, searchActions:this.props.searchActions};
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
						<ComponentToBeLoaded {...propsToBePassed}/>
						
					</div>



				</div>

			);

		}
		

	}
}

export default CSSModules(HomeComponent, HomeComponentStyles);
