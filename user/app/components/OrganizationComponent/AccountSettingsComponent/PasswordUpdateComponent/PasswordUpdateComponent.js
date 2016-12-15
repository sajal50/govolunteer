import React from 'react';
import CSSModules from 'react-css-modules';
import PasswordUpdateComponentStyles from './assets/PasswordUpdateComponent.scss';
import {hashHistory} from 'react-router';
import _ from 'lodash';

class PasswordUpdateComponent extends React.Component {

	constructor (props) {

		super(props);


	}

	render () {

		return (
			<div>
				PasswordUpdateComponent
			</div>

			);
	}
}

export default CSSModules(PasswordUpdateComponent, PasswordUpdateComponentStyles);
