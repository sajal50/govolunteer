import React from 'react';
import CSSModules from 'react-css-modules';
import SidebarComponentStyles from './assets/SidebarComponent.scss';
import {hashHistory} from 'react-router';


class SidebarComponent extends React.Component {

	constructor (props) {

		super(props);
		
	}

	
	
	onClickMyPosts () {
		
		hashHistory.push('user/myposts');

	}

	onClickAccountSettings () {

		hashHistory.push('user/accountsettings');


	}
	onClickNotifications () {
		console.log('clicked');
	}
	render () {

		return (

			<div styleName = 'sidebar'>
				 <div onClick = {()=> this.onClickMyPosts()} >
				 	My Posts
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
