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
		 	postSelectedId : null
		 };
		 this.selectPost = this.selectPost.bind(this);
	}

	componentWillMount () {
		this.props.postActions.fetchPosts();
	}

	
	 selectPost (postId) {

		this.setState ({
	 		postSelectedId : postId
	 	});
	 	
	 }

	render () {
		let {posts} = this.props.user;
		//TODO - LOADING.. WILL COME while the posts are being fetched.

		return (
			<div styleName = 'myposts-home-container'>
				<div styleName = 'clearfix'>
					<input onClick = {() => hashHistory.push('user/newpost')} styleName = 'new-post-button'
					 type = 'button' value = 'New Post' />
				</div>
					<div styleName = 'all-posts-container'>
						<AllPostsListComponent selectPost = {this.selectPost} posts = {posts} />

					</div>
					<div styleName = 'single-post-container' >

						<SinglePostDetailComponent postSelectedId = {this.state.postSelectedId} posts = {posts} postActions = {this.props.postActions}/>
					</div>
					

			</div>
			);
	}
}

export default CSSModules(MyPostsHomeComponent, MyPostsHomeComponentStyle,{allowMultiple:true});
