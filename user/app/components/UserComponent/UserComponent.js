import React from 'react';
import CSSModules from 'react-css-modules';
import UserComponentStyles from './assets/UserComponent.scss';
import SidebarComponent from './SidebarComponent/SidebarComponent.js';
import MyPostsHomeComponent from './MyPostsHomeComponent/MyPostsHomeComponent.js';
import NewPostComponent from './NewPostComponent/NewPostComponent.js';
import AccountSettingsComponent from '../commonComponents/AccountSettingsComponent/AccountSettingsComponent.js';

class UserComponent extends React.Component {

	constructor (props) {

		super(props);
		 this.componentHash = {
		 	'myposts' : MyPostsHomeComponent,
		 	'newpost' : NewPostComponent,
		 	'accountsettings' : AccountSettingsComponent
		 };
		
	}

	
	 getComponentToBeLoaded () {

	 	return this.componentHash[this.props.params.childRoute];
	 }

	getPropsToBePassed () {

		 switch (this.props.params.childRoute) {

		 	case 'myposts' : return {postActions: this.props.postActions, user: this.props.user};
		 					break;
		 	case 'newpost' :  
							return {newPostActions : this.props.newPostActions, user: this.props.user, metadata:this.props.metadata}
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

				<div styleName= 'user-container'>
					<div styleName = 'sidebar-container'>
						<SidebarComponent/>
					</div>
					
					<div styleName='post-container'>

						<ComponentToBeLoaded {...propsToBePassed}/>
						
					</div>



				</div>

			);

		}
		

	}
}

export default CSSModules(UserComponent, UserComponentStyles);
