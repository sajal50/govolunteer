import React from 'react';
import CSSModules from 'react-css-modules';
import SingleActivityFormComponentStyle from './assets/SingleActivityFormComponent.scss';
import Datetime from 'react-datetime';
import moment from  'moment';

class SingleActivityFormComponent extends React.Component {

	constructor (props) {

		super(props);
		this.onClickDelete = this.onClickDelete.bind(this);
		this.onChangeStartDate = this.onChangeStartDate.bind(this);
		this.onChangeEndDate = this.onChangeEndDate.bind(this);
		
	}

	onClickDelete () {

		this.props.onDeleteClick(this.props.activityId);
	}
	
	getOptions () {



		return this.props.metadata.categories.map ((singleCategory) => {
			return (
				<option key = {singleCategory.categoryId} value = {singleCategory.categoryId}> 
					{singleCategory.categoryName}
				</option>
				);



		});
	}

	onChange () {

		this.props.onChangeOfValue({

			activityId : this.props.activityId,
			title : this.titleRef.value,
			desc : this.descRef.value,
			categoryId : this.categoryRef.value,
			startTime : this.startDate,
			endTime : this.endDate


		});


	}
	onChangeStartDate (date) {

		this.startDate = moment(date.toDate()).format('YYYY-MM-DD HH:mm:ss');
		this.onChange();

	}
	onChangeEndDate (date) {
		this.endDate = moment(date.toDate()).format('YYYY-MM-DD HH:mm:ss');
		this.onChange();
	}
	render () {

		let options = this.getOptions ();
		return (
			<div styleName = 'single-activity-form'>
				<div>
					Title : <br/><input onChange = {() => this.onChange()} type = 'text' ref = {(ref) => this.titleRef = ref}/>
				</div>
				<div>
					Description : <br/><textarea onChange = {() => this.onChange()} ref = {(ref) => this.descRef = ref}/>
				</div>
				<div>
					Start : <br/>
					<Datetime ref = {(ref) => this.startRef = ref} 
					onChange = {this.onChangeStartDate}
					timeConstraints = {{minutes: { step: 30 }}} />
				</div>
				<div>
					End : <br/>
					<Datetime ref = {(ref) => this.endRef = ref}
					onChange = {this.onChangeEndDate}
					timeConstraints = {{minutes: { step: 30 }}} />
				</div>
				<div>
					Category : <br/>
					<select 
					onChange = {() => this.onChange()}
					ref = {(ref) => this.categoryRef = ref} >
						{options}
					</select>
				</div>
				 

				<input type = 'button' onClick = {this.onClickDelete}
				className = 'btn btn-danger' value = "Delete" />

			</div>
			);
	}
}

export default CSSModules(SingleActivityFormComponent, SingleActivityFormComponentStyle);
