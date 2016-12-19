import urlConstants from '../constants/urlConstants.js';
import actionConstants from '../constants/actionConstants.js';
import {triggerNotification} from './notificationActions.js';
import {kfetch} from '../util/util.js';
import request from 'superagent';


export function updatePassword (payload) {


	return function (dispatch, getState) {

		kfetch(urlConstants.password, {

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

export function sendEmailCode (emailId) {


	return function (dispatch, getState) {

		kfetch(urlConstants.sendVerificationCode, {

					method :'POST',
					headers: {
						'Content-Type': 'application/json'
				},
				body: JSON.stringify({emailId:emailId})
				}).then((response) => {
					return response.json();
				}).then((json)=> {

					if (!json.error) {

						dispatch(triggerNotification({
							message: "Email Sent",
							level : "success"
						}));



					} else {

							dispatch (triggerNotification({
								message : 'Email not sent.',
								level: 'error'
							}));
					}


				}).catch(() => {

				});

	}

}

export function resetPassword (payload) {


	return function (dispatch, getState) {

		kfetch(urlConstants.resetpassword, {

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
							message: "Password Reset",
							level : "success"
						}));



					} else {
						if (json.error == 'INCORRECT_USER') {
							dispatch (triggerNotification({
								message : 'No such user.',
								level: 'error'
							}));

						} else if (json.error == 'NO_VERIFICATION_CODE') {

							dispatch (triggerNotification({
								message : 'No active verification code.',
								level: 'error'
							}));

						} else if (json.error == 'INCORRECT_VERIFICATION_CODE') {

							dispatch (triggerNotification({
								message : 'Incorrect verification code.',
								level: 'error'
							}));

						} else {

							dispatch (triggerNotification({
								message : 'Password not reset.',
								level: 'error'
							}));

						}
					}


				}).catch(() => {

				});

	}

}

