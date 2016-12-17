import React from 'react';
import CSSModules from 'react-css-modules';
import NewPostComponentStyle from './assets/NewPostComponent.scss';
import NewPostFormComponent from './NewPostFormComponent/NewPostFormComponent.js';
//import NewEventResultComponent from './NewEventResultComponent/NewEventResultComponent.js';


class NewPostComponent extends React.Component {

	constructor (props) {

		super(props);
		
	}

	
	

	render () {

			return (
			<div>
				 <NewPostFormComponent 
				 newPostActions = {this.props.newPostActions} metadata = {this.props.metadata}/>
			</div>
			);
	}
}

export default CSSModules(NewPostComponent, NewPostComponentStyle);
