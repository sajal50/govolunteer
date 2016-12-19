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

	render () {

		return (

			<div styleName = 'sidebar'>
				 <div styleName = 'options' onClick = {()=> this.onClickMyPosts()} >
				 	My Posts
				 </div>
				<div styleName = 'options' onClick = {()=> this.onClickAccountSettings()}>
					Account Settings
				</div>

			</div>



			);
		

	}
}

export default CSSModules(SidebarComponent, SidebarComponentStyles);
