import React from 'react';
import CSSModules from 'react-css-modules';
import MyPostsHomeComponentStyle from './assets/MyPostsHomeComponent.scss';
import AllPostsListComponent from './AllPostsListComponent/AllPostsListComponent.js';
import SinglePostDetailComponent from './SinglePostDetailComponent/SinglePostDetailComponent.js';
import _ from 'lodash';
import {hashHistory} from 'react-router';


class MyPostsHomeComponent extends React.Component {

	constructor (props) {

		super(props);
		 this.state = {
		 	postSelected : null
		 };
		 this.selectPost = this.selectPost.bind(this);
	}

	componentWillMount () {
		this.props.postActions.fetchPosts();
	}

	
	 selectPost (postId) {
	 	let {posts} = this.props.user;

		let post = _.find(posts, function(singlePost) { return singlePost.postId == postId; });
	 	this.setState ({
	 		postSelected : post
	 	});
	 }

	render () {
		let {posts} = this.props.user;
		//TODO - LOADING.. WILL COME while the posts are being fetched.
		return (
			<div>
				<div>
					<input onClick = {() => hashHistory.push('user/newpost')} className = 'btn btn-success'
					 type = 'button' value = 'New Post' />
				</div>
				<br/>
					<div className = 'col-xs-4' >
						<AllPostsListComponent selectPost = {this.selectPost} posts = {posts} />

					</div>
					<div className = 'col-xs-8' >

						<SinglePostDetailComponent postSelected = {this.state.postSelected} />
					</div>

			</div>
			);
	}
}

export default CSSModules(MyPostsHomeComponent, MyPostsHomeComponentStyle,{allowMultiple:true});
