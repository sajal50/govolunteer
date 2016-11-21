import React from 'react';
import CSSModules from 'react-css-modules';
import SearchbarComponentStyles from './assets/SearchbarComponent.scss';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';



class SearchbarComponent extends React.Component {

	constructor (props) {

		super(props);
		this.state = {
			selectedCategory: "None",
			selectedLocation : "None",
			selectedLookingFor : "PERSON"
		}
		
	}

	getAllCategories () {

		return this.props.categories.map((singleCategory) => {

			return (<option value = {singleCategory.cid} key = {singleCategory.cid} >
					 {singleCategory.categoryName}
					 </option>);


		});
	}

	getAllLocations () {
		return this.props.locations.map((singleLocation) => {

			return (<option value = {singleLocation.lid} key = {singleLocation.lid} >
					 {singleLocation.locationName}
					 </option>);


		});


	}

	onChangeLocationHandler (e) {

		this.setState({
			selectedLocation : e.target.value

		});

	}

	onChangeCategoryHandler (e) {
		this.setState({
			selectedCategory : e.target.value

		});

	}
	onChangeLookingForHandler (e) {

		this.setState({
			selectedLookingFor : e.target.value

		});


	}
	onClickSearchHandler () {
		this.props.search({

			location: this.state.selectedLocation,
			searchword : this.searchKeyworkRef.value,
			lookingFor: this.state.selectedLookingFor,
			category: this.state.selectedCategory
		});

	}
	render () {

		let allCategories = this.getAllCategories ();
		let allLocations = this.getAllLocations ();
		return (

			<div>
				<div styleName = 'firstline'>
					<div>
						<select  value = {this.state.selectedLookingFor} onChange = {(e)=> this.onChangeLookingForHandler(e)}>
							<option value = 'PERSON' > Person </option>
							<option value = 'ORGANIZATION' > Organization </option>
						</select>

					</div>
					<div  >

						<select value = {this.state.selectedLocation} onChange = {(e)=> this.onChangeLocationHandler(e)} >
							<option value = 'None' disabled> All Locations </option>
							{allLocations}
							
						</select>

					</div>
					<div  >
						<select value = {this.state.selectedCategory} onChange = {(e)=> this.onChangeCategoryHandler(e)} >
							<option value = 'None' disabled> Category </option>
							{allCategories}
							
						</select>

					</div>
				</div>
				<div styleName = 'secondline'>
					<div>
						<input type = 'text' ref = {(ref) => this.searchKeyworkRef = ref }/>
					</div>
					<div>
						<Button bsStyle="primary" onClick  = {() =>this.onClickSearchHandler()}>Search</Button>
					</div>
				</div>
			</div>



			);
		

	}
}

export default CSSModules(SearchbarComponent, SearchbarComponentStyles);
