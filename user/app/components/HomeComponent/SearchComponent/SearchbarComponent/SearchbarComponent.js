import React from 'react';
import CSSModules from 'react-css-modules';
import SearchbarComponentStyles from './assets/SearchbarComponent.scss';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';



class SearchbarComponent extends React.Component {

	constructor (props) {

		super(props);
		
	}
	render () {

		return (

			<div>
				<div styleName = 'firstline'>
					<div  >
						<select>
							<option> Looking for </option>
							<option> Person </option>
							<option> Organization </option>
						</select>

					</div>
					<div  >
						<select>
							<option> City </option>
							
						</select>

					</div>
					<div  >
						<select>
							<option> Category </option>
							
						</select>

					</div>
				</div>
				<div styleName = 'secondline'>
					<div>
						<input type = 'text' />
					</div>
					<div>
						<Button bsStyle="primary">Search</Button>
					</div>
				</div>
			</div>



			);
		

	}
}

export default CSSModules(SearchbarComponent, SearchbarComponentStyles);
