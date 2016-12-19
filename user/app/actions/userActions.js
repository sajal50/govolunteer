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

export function createNewPost (payload) {
	return function (dispatch, getState) {
		kfetch(urlConstants.userpost, {

			method :'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(payload)
		}).then((response) => {
			return response.json();
		}).then((json)=> {



			if (!json.error) {

				dispatch(triggerNotification({
							message : 'Post created successfully',
							level: 'success'
						}));
				hashHistory.push('user/myposts');					

			

			}

		}).catch((error) => {

			console.log(error);

		});
	}



}


export function acceptRequest (payload) {
	return function (dispatch, getState) {
		kfetch(urlConstants.responsepost, {

			method :'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(payload)
		}).then((response) => {
			return response.json();
		}).then((json)=> {



			if (!json.error) {
				dispatch(triggerNotification({
					message : 'Activity Acceped.',
					level : 'success'

				}));
				dispatch(fetchPosts());

			}

		}).catch((error) => {

			console.log(error);

		});
	}



}

