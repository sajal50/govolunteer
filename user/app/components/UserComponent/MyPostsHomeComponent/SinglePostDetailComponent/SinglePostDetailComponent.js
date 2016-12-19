import React from 'react';
import CSSModules from 'react-css-modules';
import SinglePostDetailComponentStyle from './assets/SinglePostDetailComponent.scss';


class SinglePostDetailComponent extends React.Component {

	constructor (props) {

		super(props);
	}

	getViewForPosts (singlePost) {
     		let viewForRequests=this.getViewForRequests(singlePost.requests);
			let requestOptions = this.getRequestOptions(singlePost.requests);
			return (

				<div styleName = 'form' key = {singlePost.postId}>
					<div styleName = 'single-item'>

				        	<label styleName ='labels-input'>
				        		Title
				        	</label>
				        	<div>
				        		{singlePost.title}
			        		</div>
			        </div>
			        <div styleName = 'single-item'>

				        	<label styleName ='labels-input'>
				        		Description
				        	</label>
				        	<div>
				        		{singlePost.desc}
			        		</div>
			        </div>
			        <div styleName = 'single-item'>

				        	<label styleName ='labels-input'>
				        		Start Time
				        	</label>
				        	<div>
				        		{singlePost.startTime}
			        		</div>
			        </div>
			        <div styleName = 'single-item'>

				        	<label styleName ='labels-input'>
				        		End Time
				        	</label>
				        	<div>
				        		{singlePost.endTime}
			        		</div>
			        </div>

					<div styleName = 'single-item-without-border'>
						<label styleName ='labels-input'>
				        		Requests
				        </label>
						
						<div>{viewForRequests}</div>
					</div>

					<br/>
					{

						(singlePost.statusOfRequest == 0 || singlePost.statusOfRequest == 2) ?
						(null):
						(<div>
							<div>
							Select a request <br/>
							<select styleName = 'org-options' 
								ref = {(ref) => this.requestRef = ref} >
								{requestOptions}
							</select>
							</div>
							<div>
								<input type = 'button'  styleName='accept-button '
								 onClick = {() => this.onClickAcceptRequest()} value = 'Accept'/>
							 </div>
						</div>)
						


					}

						

				</div>

				);

	}

	getViewForRequests (posts) {

		return posts.map ((singleRequest)=>{

			return (
				<div styleName = 'single-activity' key = {singleRequest.activity.activityId}>
					<div>
						<label styleName ='labels-input request-label'>
						Event
						</label>
						{singleRequest.title} 
					</div>
					<div>
						<label styleName ='labels-input request-label'>
						Requesting Organization
						</label>
						{singleRequest.username} 
					</div>
					<div>
						<label styleName ='labels-input request-label'>
						Activity Title
						</label>
						{singleRequest.activity.title} 
					</div>
					<div>
						<label styleName ='labels-input request-label'>
						Activity Description
						</label>
						{singleRequest.activity.desc} 
					</div>
					<div>
						<label styleName ='labels-input request-label'>
						Activity Start Time
						</label>
						{singleRequest.activity.startTime} 
					</div>
					<div>
						<label styleName ='labels-input request-label'>
						Activity End Time 
						</label>
						{singleRequest.activity.endTime} 
					</div>
					<div>
						<label styleName ='labels-input request-label'>
						Request Status
						</label>
						{(singleRequest.statusOfRequest == 1) ? <span>Accepted</span> : <span>Pending</span> }
					</div>
					
					
				</div>
				);


		});
	}

	onClickAcceptRequest () {

		//TODO- validations
		
		 this.props.postActions.acceptRequest({
		 	activityId: this.requestRef.value,
		 	postId: this.props.postSelected.postId,
		 	response: '2'
		 });


	}

	getRequestOptions (posts) {

		return posts.map ((singleRequest) => {
			return (
				<option key = {singleRequest.activity.activityId} value = {singleRequest.activity.activityId}> 
					{singleRequest.activity.title}
				</option>
				);



		});
	}
	

	render () {
		let {postSelected} = this.props;


		if (!postSelected) {
			return (<div styleName = 'stiched'>Click on a post.</div>);
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

export default CSSModules(SinglePostDetailComponent, SinglePostDetailComponentStyle, {allowMultiple:true});
