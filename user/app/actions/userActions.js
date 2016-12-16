import urlConstants from '../constants/urlConstants.js';
import {serialize} from '../util/util.js';
import actionConstants from '../constants/actionConstants.js';
import {hashHistory} from 'react-router';
import {triggerNotification} from './notificationActions.js';
import {kfetch} from '../util/util.js';



export function fetchPosts () {

	return function (dispatch, getState) {


		kfetch(urlConstants.post)
		.then((response) => {

			return response.json();
		}).then((json)=> {

			if (!json.error) {

				dispatch({
					type : actionConstants.SET_POSTS,
					payload: json
				});

			}



		}).catch(() => {
			
		});


	};


}