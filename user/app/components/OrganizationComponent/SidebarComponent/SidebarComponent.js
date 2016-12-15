import React from 'react';
import CSSModules from 'react-css-modules';
import SidebarComponentStyles from './assets/SidebarComponent.scss';
import {hashHistory} from 'react-router';


class SidebarComponent extends React.Component {

	constructor (props) {

		super(props);
		
	}

	
	
	onClickEvents () {
		
		hashHistory.push('org/events');

	}

	onClickAccountSettings () {

		hashHistory.push('org/accountsettings');


	}
	onClickNotifications () {
		console.log('clicked');
	}
	render () {

		return (

			<div>
				<div onClick = {()=> this.onClickEvents()} >
					Events
				</div>
				<div onClick = {()=> this.onClickAccountSettings()}>
					Account Settings
				</div>
				<div onClick = {()=> this.onClickNotifications()}>
					Notifications
				</div>

			</div>



			);
		

	}
}

export default CSSModules(SidebarComponent, SidebarComponentStyles);
