import React from 'react';
import CSSModules from 'react-css-modules';
import SingleEventDetailComponentStyle from './assets/SingleEventDetailComponent.scss';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

class SingleEventDetailComponent extends React.Component {

	constructor (props) {

		super(props);
		this.state = {
			show : false
		}
		
	}

	getViewForActivities (activities) {

		return activities.map ((singleActivity) => {

			return (

				<div styleName = 'single-activity' key = {singleActivity.activityId}>
					<div>
						Title : {singleActivity.title}
					</div>
					<div>
						Start time :  {singleActivity.startTime}
					</div>
					<div>
						End time :  {singleActivity.endTime}
					</div>
					{
						(singleActivity.user) ?
						<div>
							<div>

								User Assigned : {singleActivity.user.name}
							</div>
							<div>

								Status : {(singleActivity.status == 1) ? 'Accepted' : 'Pending' }
							</div>
						</div>
						:
						<div>
							User Assigned : No user assigned.
						</div>
					}
				</div>

				);


		});


	}
	

	render () {

		let {eventSelected} = this.props;
		if (eventSelected) {

		let viewForActivities = this.getViewForActivities (this.props.eventSelected.activities);


		return (
			<Modal dialogClassName="event-detail-modal" show = {this.props.showDetailsModal} 
			bsSize="large" aria-labelledby="contained-modal-title-lg"
			onHide={()=> this.props.closeDetailsModal()}>
		        <Modal.Header closeButton>
		          <Modal.Title id="contained-modal-title-lg">Event Details</Modal.Title>
		        </Modal.Header>
		        <Modal.Body>

		        		<div styleName = 'single-item'>

				        	<label styleName ='labels-input'>
				        		Title
				        	</label>
				        	<div>
				        		{eventSelected.title}
			        		</div>
			        	</div>
			        	<div styleName = 'single-item'>

				        	<label styleName ='labels-input'>
				        		Description
				        	</label>
				        	<div>
				        		{eventSelected.desc}
			        		</div>
			        	</div>
			        	<div styleName = 'single-item'>

				        	<label styleName ='labels-input'>
				        		Start Time
				        	</label>
				        	<div>
				        		{eventSelected.startTime}
			        		</div>
			        	</div>
			        	<div styleName = 'single-item'>

				        	<label styleName ='labels-input'>
				        		End Time
				        	</label>
				        	<div>
				        		{eventSelected.endTime}
			        		</div>
			        	</div>

			        	<div styleName = 'single-item-without-border'>

				        	<label styleName ='labels-input'>
				        		Activities
				        	</label>
				        	<div>
				        		{viewForActivities}
			        		</div>
			        	</div>
		        </Modal.Body>
		        <Modal.Footer>
		          <Button onClick={()=> this.props.closeDetailsModal()}>Close</Button>
		        </Modal.Footer>
		    </Modal>

			);


		}
		
		
		
	}
}

export default CSSModules(SingleEventDetailComponent, SingleEventDetailComponentStyle);
