import urlConstants from '../constants/urlConstants.js';
import {serialize} from '../util/util.js';
import actionConstants from '../constants/actionConstants.js';
import {hashHistory} from 'react-router';
import {triggerNotification} from './notificationActions.js';
import {kfetch} from '../util/util.js';
import request from 'superagent';


export function updatePassword (oldpassword,newpassword) {


	return function (dispatch, getState) {

		kfetch(urlConstants.password, {

					method :'POST',
					headers: {
						'Content-Type': 'application/json'
				},
				body: JSON.stringify({"oldpassword":oldpassword,"newpassword":newpassword})
				}).then((response) => {
					return response.json();
				}).then((json)=> {

					if (!json.error) {

						dispatch(triggerNotification({
							message: "Password Updated.",
							level : "success"
						}));



					} else {

						if (json.error == "PASSWORD_INCORRECT") {

							dispatch (triggerNotification({
								message : 'Incorrect Password',
								level: 'error'
							}));

						}
					}


				}).catch(() => {

				});

	}

}

export function updateInfo (payload) {

	return function (dispatch, getState) {

		kfetch(urlConstants.userdetails, {

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
							message: "Details Updated.",
							level : "success"
						}));
						dispatch ({

							'type' : actionConstants.SET_USER_INFO,
							payload: payload
						});

						

					}


				}).catch(() => {

				});

	}



}

export function updateProfilePic (file) {



	return function (dispatch, getState) {

		request
		.post(urlConstants.profilePic)
		.withCredentials()
		.attach('pic', file)
		.end((error, result) => {

			if (result) {
				dispatch({

					type : actionConstants.SET_USER_INFO,
					payload: {
						pic:result.body.pic
					}
				});
				dispatch(triggerNotification({
							message: "Profile Picture Updated.",
							level : "success"
				}));
			}


		});



	}
}