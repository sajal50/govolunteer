import urlConstants from '../constants/urlConstants.js';
import {serialize} from '../util/util.js';
import actionConstants from '../constants/actionConstants.js';
import {hashHistory} from 'react-router';
import {triggerNotification} from './notificationActions.js';
import {kfetch} from '../util/util.js';



export function fetchEvents () {

	return function (dispatch, getState) {


		kfetch(urlConstants.event)
		.then((response) => {

			return response.json();
		}).then((json)=> {

			if (!json.error) {

				dispatch({
					type : actionConstants.SET_EVENTS,
					payload: json
				});

			}



		}).catch(() => {
			
		});


	};


}

export function createNewEvent (payload) {

	return function (dispatch, getState) {

		kfetch(urlConstants.event, {

			method :'POST',
			headers: {
				'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
			},
			body: serialize(payload)
		}).then((response) => {
			return response.json();
		}).then((json)=> {



			if (!json.error) {

				dispatch ({

					type : actionConstants.SET_RESULT_EVENT,
					payload : json
				});

				dispatch({
					type: actionConstants.SET_ORG_FLAGS,
					payload: {
						newEventScreenType : 'RESULT'
					}

				});
				

			

			}

		}).catch((error) => {

			console.log(error);

		});
	}



}

export function clearEventResult() {

	return function (dispatch, getState) {

		dispatch ({

			type : actionConstants.SET_RESULT_EVENT,
			payload : null
		});

		dispatch({
			type: actionConstants.SET_ORG_FLAGS,
			payload: {
				newEventScreenType : 'FORM'
			}

		});


	}

}