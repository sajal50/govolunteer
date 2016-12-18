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
				<div styleName="field-wrap">
				            <label styleName='labels-input'>
				              Title<span styleName="req" >*</span>
				            </label>

				            	<input styleName='text-fields' autoComplete={'off'}
				            	type = 'text' ref = {(ref) => this.titleRef = ref}/>
				        </div>

				        <div styleName="field-wrap">
				            <label styleName='labels-input'>
				              Description<span styleName="req" >*</span>
				            </label>
				            	<textarea styleName='textarea-field' ref = {(ref) => this.descRef = ref}/>
				        </div>
				<div>
					<label styleName='labels-input'>
				              Start Time<span styleName="req" >*</span>
				            </label>
					<Datetime inputProps = {{className : "time"}}
					ref = {(ref) => this.startRef = ref} 
					onChange = {this.onChangeStartDate}
					timeConstraints = {{minutes: { step: 30 }}} />
				</div>
				<div>
					<label styleName='labels-input'>
				              End Time<span styleName="req" >*</span>
				    </label>
					<Datetime inputProps = {{className : "time"}}
					ref = {(ref) => this.endRef = ref}
					onChange = {this.onChangeEndDate}
					timeConstraints = {{minutes: { step: 30 }}} />
				</div>
				<div>
					<label styleName='labels-input'>
				              Category<span styleName="req" >*</span>
				    </label>
				    <div>
					<select 
						onChange = {() => this.onChange()}
						ref = {(ref) => this.categoryRef = ref} >
							{options}
						</select>
					</div>
				</div>
				
				<div styleName='gap-up'>

					<div styleName = 'gap'>
					  <input type = 'button' styleName = 'button button-block delete'
							onClick = {this.onClickDelete} value = 'Delete'/>
					</div>
				          
				</div>

			</div>
			);
	}
}

export default CSSModules(SingleActivityFormComponent, SingleActivityFormComponentStyle,{allowMultiple:true});
