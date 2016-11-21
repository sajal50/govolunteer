import React from 'react';
import CSSModules from 'react-css-modules';
import SinglePostComponentStyles from './assets/SinglePostComponent.scss';




class SinglePostComponent extends React.Component {

	constructor (props) {

		super(props);
		
	}
	onClickPostHandler() {

		this.props.openModal(this.props.postDetails.pid);
	}
	render () {
		let {title} = this.props.postDetails;
		return (

			<div onClick = {()=> this.onClickPostHandler()} styleName = 'single-post'>
				{title}
			</div>



			);
		

	}
}

export default CSSModules(SinglePostComponent, SinglePostComponentStyles);
