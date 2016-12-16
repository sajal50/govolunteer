import React from 'react';
import CSSModules from 'react-css-modules';
import SinglePostDetailComponentStyle from './assets/SinglePostDetailComponent.scss';


class SinglePostDetailComponent extends React.Component {

	constructor (props) {

		super(props);
	}

	getViewForPosts (singlePost) {
     		let viewForRequests=this.getViewForRequests(singlePost.requests);
		

			return (

				<div key = {singlePost.postId}>
					<div>
						Title : {singlePost.title}
					</div>
					<div>
						Description : {singlePost.desc}
					</div>
					<div>
						Start Time : {singlePost.startTime}
					</div>
					<div>
						End Time : {singlePost.endTime}
					</div>
					<div>
						Requests : <div>{viewForRequests}</div>
					</div>
				</div>

				);

	}

	getViewForRequests (posts) {

		return posts.map ((singleRequest)=>{

			return (
				<div key = {singleRequest.activity.activityId}>
					<div>
						Event Title : {singleRequest.title} 
					</div>
					<div>
						Event Description : {singleRequest.desc} 
					</div>
					<div>
						Requesting User : {singleRequest.username} 
					</div>
					<div>
						Activity Title : {singleRequest.activity.title} 
					</div>
					<div>
						Activity Description : {singleRequest.activity.desc} 
					</div>
					<div>
						Activity Start Time : {singleRequest.activity.startTime} 
					</div>
					<div>
						Activity End Time : {singleRequest.activity.endTime} 
					</div>
					
				</div>
				);


		});
	}
	

	render () {

		let {postSelected} = this.props;


		if (!postSelected) {
			return (<div>Click on a post.</div>);
		} else {

			let viewForPosts = this.getViewForPosts (this.props.postSelected);

			return (
			<div>
				{viewForPosts}

			</div>
			);


		}
		
	}
}

export default CSSModules(SinglePostDetailComponent, SinglePostDetailComponentStyle);