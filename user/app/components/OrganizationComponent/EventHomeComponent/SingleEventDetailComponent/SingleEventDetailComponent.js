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

				<div key = {singleActivity.activityId}>
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

								Status : {singleActivity.status}
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

		// let {eventSelected} = this.props;

		// if (!eventSelected) {
		// 	return (<div>Click on an event.</div>);
		// } else {

		// 	let viewForActivities = this.getViewForActivities (this.props.eventSelected.activities);

		// 	return (
		// 	<div>
		// 		<div>
		// 			Title : {eventSelected.title}

		// 		</div>
		// 		<div>
		// 			Description : {eventSelected.desc}
					
		// 		</div>
		// 		<div>
		// 			Start time :  {eventSelected.startTime}
		// 		</div>
		// 		<div>
		// 			End time :  {eventSelected.endTime}
		// 		</div>
		// 		<div>
		// 			Activities : 

		// 			{viewForActivities}
					
		// 		</div>

		// 	</div>
		// 	);


		// }
		let {eventSelected} = this.props;
		if (eventSelected) {

		let viewForActivities = this.getViewForActivities (this.props.eventSelected.activities);


		return (
			<Modal show = {this.props.showDetailsModal} 
			bsSize="large" aria-labelledby="contained-modal-title-lg"
			onHide={()=> this.props.closeDetailsModal()}>
		        <Modal.Header closeButton>
		          <Modal.Title id="contained-modal-title-lg">Event Details</Modal.Title>
		        </Modal.Header>
		        <Modal.Body>
		        	<div>
					Title : {eventSelected.title}

					</div>
					<div>
						Description : {eventSelected.desc}
						
					</div>
					<div>
						Start time :  {eventSelected.startTime}
					</div>
					<div>
						End time :  {eventSelected.endTime}
					</div>
					<div>
						Activities : 

						{viewForActivities}
						
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
