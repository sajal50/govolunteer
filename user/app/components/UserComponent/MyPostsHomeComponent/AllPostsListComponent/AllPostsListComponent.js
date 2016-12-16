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
				styleName = 'single-box pointer' key = {singlePost.postId}>
					Post : {singlePost.title} 
				</div>
				);


		});
	}
	

	render () {

		let listView = this.getListView(this.props.posts);
		return (
			<div>
				{listView}
			</div>
			);
	}
}

export default CSSModules(AllPostsListComponent, AllPostsListComponentStyle, {allowMultiple: true});
