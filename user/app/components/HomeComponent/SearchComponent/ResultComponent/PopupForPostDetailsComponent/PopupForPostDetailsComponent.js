import React from 'react';
import CSSModules from 'react-css-modules';
import PopupForPostDetailsComponentStyles from './assets/PopupForPostDetailsComponent.scss';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';


class PopupForPostDetailsComponent extends React.Component {

	constructor (props) {

		super(props);
		
	}

	
	render () {

		let {showModal, closeModal} = this.props;


		return (

			<div>
				<Modal show={showModal} onHide={closeModal}>
		          <Modal.Header closeButton>
		            <Modal.Title>{this.props.postDetails.title}</Modal.Title>
		          </Modal.Header>
		          <Modal.Body>
		          	Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.  	
		          </Modal.Body>
		          <Modal.Footer>
		            <Button onClick={closeModal}>Close</Button>
		          </Modal.Footer>
		        </Modal>
			</div>



			);
		

	}
}

export default CSSModules(PopupForPostDetailsComponent, PopupForPostDetailsComponentStyles);
