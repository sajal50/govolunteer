import React from 'react';
import CSSModules from 'react-css-modules';
import BaseStyle from './assets/BaseComponent.scss';
import NotificationSystem from 'react-notification-system';
import imageLogo from './assets/logos.png';


class BaseComponent extends React.Component {

	constructor (props) {

		super(props);
		
	}
	componentWillMount () {

		this.props.fetchMetadata();
	}

	
	componentWillReceiveProps (nextProps) {

		if (this.props.notifConfig.isTriggered != nextProps.notifConfig.isTriggered) {

			if (nextProps.notifConfig.isTriggered) {

				this.notificationRef.addNotification({
						"level" : nextProps.notifConfig.level,
						"message" : nextProps.notifConfig.message
				});
			}
		}
	

		

	}

	render () {

		let {isLoggedIn} = this.props;
		return (
			<div >
				<div styleName = 'base-header'>
					<div>
						<img styleName = 'logo' src = {imageLogo} />
					</div>
					<div>
							{
								(isLoggedIn) ? 
									(<input type = 'button' 
										onClick = {() => this.props.logout()}
										className = 'btn btn-primary' value = "Logout" />)
									:
									(null)

							}
					</div>
				<NotificationSystem ref={(ref) => this.notificationRef = ref} />
				</div>

				<div className = 'col-xs-12'>

					{this.props.children}

				</div>

			</div>



			);
		

	}
}

export default CSSModules(BaseComponent, BaseStyle,);
