import React from 'react';
import CSSModules from 'react-css-modules';
import NewEventResultComponentStyle from './assets/NewEventResultComponent.scss';


class NewEventResultComponent extends React.Component {

	constructor (props) {

		super(props);
		
	}

	
	activitiesView () {

		return this.props.resultEvent.activities.map ((singleActivity)=>{


			return (
				<div styleName ='single-activity' key = {singleActivity.activityId}>

					<div> Title : {singleActivity.title}</div>
					{

						(singleActivity.user) ? 

						<div> Requested : {singleActivity.user.name} </div>
						:
						<div> Requested : Couldn't find a match. </div>
					}
					
				</div>

				);



		});
	}
	componentWillUnmount() {

		this.props.clearEventResult();
	}

	render () {
		let {title, desc, startTime, endTime} = this.props.resultEvent;
		let activitiesView = this.activitiesView();
		return (
			<div>
				<div styleName="form">
					<div id="login">   
			          <h1 styleName ='welcome-back-text'>Your event has been created!</h1>
			          
			          <form>
			          	<div styleName = 'single-item'>

				        	<label styleName ='labels-input'>
				        		Title
				        	</label>
				        	<div styleName = 'detail'>
				        		{title}
			        		</div>
			        	</div>
			        	<div styleName = 'single-item'>

				        	<label styleName ='labels-input'>
				        		Description
				        	</label>
				        	<div styleName = 'detail'>
				        		{desc}
			        		</div>
			        	</div>
			        	<div styleName = 'single-item'>

				        	<label styleName ='labels-input'>
				        		Start Time
				        	</label>
				        	<div styleName = 'detail'>
				        		{startTime}
			        		</div>
			        	</div>
			        	<div styleName = 'single-item'>

				        	<label styleName ='labels-input'>
				        		End Time
				        	</label>
				        	<div styleName = 'detail'>
				        		{endTime}
			        		</div>
			        	</div>

			        	<div styleName = 'single-item-without-border'>

				        	<label styleName ='labels-input'>
				        		Activities
				        	</label>
				        	<div styleName = 'detail'>
				        		{activitiesView}
			        		</div>
			        	</div>
			          </form>

			        </div>
			      
				</div> 
				

			</div>
			);
	}
}

export default CSSModules(NewEventResultComponent, NewEventResultComponentStyle, {allowMultiple:true});
