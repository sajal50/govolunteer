import React from 'react';
import CSSModules from 'react-css-modules';
import PersonalInformationUpdateComponentStyles from './assets/PersonalInformationUpdateComponent.scss';
import {hashHistory} from 'react-router';
import _ from 'lodash';

class PersonalInformationUpdateComponent extends React.Component {

	constructor (props) {

		super(props);


	}

	

	render () {
		return (
			<div>
				PersonalInformationUpdateComponent
			</div>



			);
		

	}
}

export default CSSModules(PersonalInformationUpdateComponent, PersonalInformationUpdateComponentStyles);
