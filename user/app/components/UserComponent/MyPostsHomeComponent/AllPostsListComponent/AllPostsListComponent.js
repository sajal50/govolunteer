import React from 'react';
import CSSModules from 'react-css-modules';
import AllPostsListComponentStyle from './assets/AllPostsListComponent.scss';


class AllPostsListComponent extends React.Component {

	constructor (props) {

		super(props);
		
	}



	getListView (posts) {

		return posts.map ((singlePost)=>{

			return (
				<div onClick = {()=> this.props.selectPost(singlePost.postId)} 
				styleName = 'form pointer' key = {singlePost.postId}>
					<label styleName='labels-input'>
				              Post
				    </label>
				    <div styleName = 'text'>
				    	{singlePost.title}
				    </div>
				</div>
				);


		});
	}
	

	render () {

		let listView = this.getListView(this.props.posts);
		return (
			<div>
				<h2> My Posts </h2>
				{listView}
			</div>
			);
	}
}

export default CSSModules(AllPostsListComponent, AllPostsListComponentStyle, {allowMultiple: true});
