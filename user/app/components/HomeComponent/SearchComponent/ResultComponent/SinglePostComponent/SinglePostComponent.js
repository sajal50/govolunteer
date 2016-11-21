import React from 'react';
import CSSModules from 'react-css-modules';
import SinglePostComponentStyles from './assets/SinglePostComponent.scss';




class SinglePostComponent extends React.Component {

	constructor (props) {

		super(props);
		
	}
	onClickPostHandler() {

		this.props.openModal();
	}
	render () {

		return (

			<div onClick = {()=> this.onClickPostHandler()} styleName = 'single-post'>
				Single Post
			</div>



			);
		

	}
}

export default CSSModules(SinglePostComponent, SinglePostComponentStyles);
