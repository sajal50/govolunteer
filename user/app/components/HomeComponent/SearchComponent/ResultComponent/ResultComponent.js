import React from 'react';
import CSSModules from 'react-css-modules';
import ResultComponentStyles from './assets/ResultComponent.scss';
import SinglePostComponent from './SinglePostComponent/SinglePostComponent.js';
import PopupForPostDetailsComponent from './PopupForPostDetailsComponent/PopupForPostDetailsComponent.js';

class ResultComponent extends React.Component {

	constructor (props) {

		super(props);
		this.state = {
			showModal : false,
			currentPopupProps:{}
		};
		this.closeModal = this.closeModal.bind(this);
		this.openModal = this.openModal.bind(this);
	}

	closeModal () {

		this.setState({showModal:false});
	}

	openModal (id) {

		let currentPopupPostIndex = _.findIndex(this.props.posts, (singlePost) => {

			return singlePost.pid == id;

		});

		this.setState({

			currentPopupProps:this.props.posts[currentPopupPostIndex],
			showModal:true

		});

	}
	getPostsToBeDisplayed () {
		let {posts} = this.props;
		
		return posts.map((singlePost) => {
			
			return (
				<SinglePostComponent openModal = {this.openModal}
				key = {singlePost.pid} postDetails = {singlePost} />
				);
		});
	}
	render () {

		let postsToBeDisplayed = this.getPostsToBeDisplayed();
		return (

			<div>
				{postsToBeDisplayed}
				<PopupForPostDetailsComponent
				postDetails = {this.state.currentPopupProps}
				showModal = {this.state.showModal}
				closeModal = {this.closeModal} />
			</div>



			);
		

	}
}

export default CSSModules(ResultComponent, ResultComponentStyles);
