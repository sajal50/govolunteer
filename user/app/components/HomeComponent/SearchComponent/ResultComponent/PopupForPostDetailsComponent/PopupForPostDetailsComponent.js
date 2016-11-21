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

		let {postInfo, postedByInfo, showModal, closeModal} = this.props;

		return (

			<div>
				<Modal show={showModal} onHide={closeModal}>
		          <Modal.Header closeButton>
		            <Modal.Title>Modal heading</Modal.Title>
		          </Modal.Header>
		          <Modal.Body>
		            

		            <h4>Overflowing text to show scroll behavior</h4>
		            <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
		            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
		            <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
		            <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
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
