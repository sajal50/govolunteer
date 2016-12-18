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
	
	render () {

		return (

			<div styleName = 'sidebar'>
				<div styleName = 'options' onClick = {()=> this.onClickEvents()} >
					Events
				</div>
				<div styleName = 'options' onClick = {()=> this.onClickAccountSettings()}>
					Account Settings
				</div>
				

			</div>



			);
		

	}
}

export default CSSModules(SidebarComponent, SidebarComponentStyles);
