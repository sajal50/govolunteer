import React from 'react';
import CSSModules from 'react-css-modules';
import ResultComponentStyles from './assets/ResultComponent.scss';
import SinglePostComponent from './SinglePostComponent/SinglePostComponent.js';
import PopupForPostDetailsComponent from './PopupForPostDetailsComponent/PopupForPostDetailsComponent.js';

class ResultComponent extends React.Component {

	constructor (props) {

		super(props);
		this.state = {

			posts : [{

				"pid" : 1,
			  	"title" : "ABCD",
			  	"startDate" : "1/11/2011",
			  	"endDate": "1/11/2011",
			  	"location" : "Mumbai",
			  	"lookingFor" : "PERSON",
			  	"categories" : [{
			  
				  	"cid" : "1",
				    "categoryName" : "Cat1"
			  	}],
			  	"timestamp" : "1/11/2011" ,
			  
				postedby : {

				  	"email" : "sajal50@gmail.com"
				  }
			  
			},{

				"pid" : 2,
			  	"title" : "ABCD2",
			  	"startDate" : "1/11/2011",
			  	"endDate": "1/11/2011",
			  	"location" : "Mumbai",
			  	"lookingFor" : "PERSON",
			  	"categories" : [{
			  
				  	"cid" : "1",
				    "categoryName" : "Cat1"
			  	}],
			  	"timestamp" : "1/11/2011" ,
			  
				postedby : {

				  	"email" : "sajal50@gmail.com"
				  }
			  
			},{

				"pid" : 3,
			  	"title" : "ABCD3",
			  	"startDate" : "1/11/2011",
			  	"endDate": "1/11/2011",
			  	"location" : "Mumbai",
			  	"lookingFor" : "PERSON",
			  	"categories" : [{
			  
				  	"cid" : "1",
				    "categoryName" : "Cat1"
			  	}],
			  	"timestamp" : "1/11/2011" ,
			  
				postedby : {

				  	"email" : "sajal50@gmail.com"
				  }
			  
			}],
			showModal : false
		};
		this.closeModal = this.closeModal.bind(this);
		this.openModal = this.openModal.bind(this);
	}

	closeModal () {

		this.setState({showModal:false});
	}

	openModal (id) {
		console.log(id);
		this.setState({showModal:true});

	}
	getPostsToBeDisplayed () {
		let {posts} = this.state;
		
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
				showModal = {this.state.showModal}
				closeModal = {this.closeModal} />
			</div>



			);
		

	}
}

export default CSSModules(ResultComponent, ResultComponentStyles);
