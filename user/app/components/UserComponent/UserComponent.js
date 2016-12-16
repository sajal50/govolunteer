import React from 'react';
import CSSModules from 'react-css-modules';
import UserComponentStyles from './assets/UserComponent.scss';
import SidebarComponent from './SidebarComponent/SidebarComponent.js';
import MyPostsHomeComponent from './MyPostsHomeComponent/MyPostsHomeComponent.js';
//import EventHomeComponent from './EventHomeComponent/EventHomeComponent.js';

class UserComponent extends React.Component {

	constructor (props) {

		super(props);
		 this.componentHash = {
		 	'myposts' : MyPostsHomeComponent
		// 	'accountsettings' : AccountSettingsComponent
		 };
		
	}

	
	 getComponentToBeLoaded () {

	 	return this.componentHash[this.props.params.childRoute];
	 }

	getPropsToBePassed () {

		 switch (this.props.params.childRoute) {

		 	case 'myposts' : return {postActions: this.props.postActions, user: this.props.user};
		 					break;
		 }
	}

	render () {

		let {isLoggedInChecked} = this.props.userInfo;
		isLoggedInChecked = 1;
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

export default CSSModules(UserComponent, UserComponentStyles);
