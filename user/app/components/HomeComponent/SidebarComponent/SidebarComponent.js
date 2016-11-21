import React from 'react';
import CSSModules from 'react-css-modules';
import SidebarComponentStyles from './assets/SidebarComponent.scss';
import {hashHistory} from 'react-router';


class SidebarComponent extends React.Component {

	constructor (props) {

		super(props);
		
	}

	
	
	onClickSearch () {
		
		hashHistory.push('home/search');

	}

	onClickAccountSettings () {

		hashHistory.push('home/accountsettings');


	}
	render () {

		return (

			<div>
				<div onClick = {()=> this.onClickSearch()} >
					Search
				</div>
				<div onClick = {()=> this.onClickAccountSettings()}>
					Account Settings
				</div>

			</div>



			);
		

	}
}

export default CSSModules(SidebarComponent, SidebarComponentStyles);
