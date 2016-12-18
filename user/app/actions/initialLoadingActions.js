import urlConstants from '../constants/urlConstants.js';
import {serialize} from '../util/util.js';
import actionConstants from '../constants/actionConstants.js';
import {hashHistory} from 'react-router';
import {triggerNotification} from './notificationActions.js';
import {kfetch} from '../util/util.js';
import {setFlags} from './flagActions.js';


export function checkInit () {

	return function (dispatch, getState) {

		if (!getState().userInfo.isLoggedInChecked) {

			return kfetch(urlConstants.init)
			.then((response) => {

				return response.json();

			}).then((json) => {

				dispatch ({

					'type' : actionConstants.SET_USER_INFO,
					payload: {isLoggedInChecked:true}
				});


				if (!json.error) {

					json = changeTypeOfPersonToNumberEnum(json);

					json.isLoggedIn = true;
					
					dispatch ({

						'type' : actionConstants.SET_USER_INFO,
						payload: json
					});


					return Promise.resolve('USER_LOGGED_IN');

				} else {
					if (json.error == 'SESSION_DOES_NOT_EXIST') {

						return Promise.resolve(json.error);
					}
				}


			});
		} else {

			if (getState().userInfo.isLoggedIn) {

				return Promise.resolve('USER_LOGGED_IN');
			} else {

				return Promise.resolve('USER_NOT_LOGGED_IN');

			}
		}




	}



}


function changeTypeOfPersonToNumberEnum (json) {

	json.type = (+json.type == 0) ? 'PERSON' : 'ORGANIZATION';
	return json;
}

export function login (email, password) {


	return function (dispatch, getState) {

		

			kfetch(urlConstants.login, {

				method :'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({email, password})
			}).then((response) => {
				return response.json();
			}).then((json)=> {



				if (!json.error) {

					json.isLoggedIn = true;
					json = changeTypeOfPersonToNumberEnum(json);

					dispatch ({

						'type' : actionConstants.SET_USER_INFO,
						payload: json
					});

					redirectAccordingToRole (json.type);




				} else {

					if (json.error == "INCORRECT_PASSWORD") {

						dispatch (triggerNotification({
							message : 'Incorrect Crendentials',
							level: 'error'
						}));

					}
					if (json.error == "USER_DOES_NOT_EXIST") {

						dispatch (triggerNotification({
							message : 'Incorrect Crendentials',
							level: 'error'
						}));

					}
				}


			}).catch((error) => {

				console.log(error);

			});



		

		


	};


}

function changeTypeOfPersonEnumToNumber (payload) {

	payload.type = (payload.type == 'PERSON')? 0 : 1
	return payload;


}

export function redirectAccordingToRole (type) {
	if (type == 'PERSON') {
		hashHistory.push('user/myposts');	
	} else {
		hashHistory.push ('org/events');
	}
}

export function signUp (payload)  {

	return function (dispatch, getState)  {

		payload = changeTypeOfPersonEnumToNumber(payload);

		kfetch(urlConstants.signUp, {

			method :'POST',
			headers: {
					'Content-Type': 'application/json'
			},
			body: JSON.stringify (payload)
		}).then((response) => {
			return response.json();
		}).then((json)=> {



			if (!json.error) {

				json.isLoggedIn = true;
				
				json = changeTypeOfPersonToNumberEnum(json);

				dispatch ({

					'type' : actionConstants.SET_USER_INFO,
					payload: json
				});

				redirectAccordingToRole(json.type);



			} else {
				if (json.error == "USERNAME_TAKEN") {
					dispatch(triggerNotification({

						"level" : "error",
						"message" : "Username is taken"


					}));
				}
			}
			

		}).catch(() => {
			
		});



	}

}

export function logout () {

	return function (dispatch, getState)  {

		kfetch(urlConstants.logout ,{

			method :'POST',
			headers: {
					'Content-Type': 'application/json'
			},
			body: JSON.stringify ({})
		})
		.then((response) => {
			
		}).then((json)=> {


			location.reload();
			return response.json();

			console.log('here');
			//TODO- CHECK FOR 200
			

			
			

		}).catch(() => {
			
		});



	}
}

export function fetchMetadata () {

	return function (dispatch, getState) {

		let {isMetadataFetched} = getState().flags;

		if (!isMetadataFetched) {


			kfetch(urlConstants.metadata)
			.then((response) => {

				return response.json();
			}).then((json)=> {

				if (!json.error) {

					dispatch(setFlags({
						isMetadataFetched: true
					}));

					dispatch ({
						type : actionConstants.SET_CATEGORIES,
						payload : json.categories
					});
					dispatch ({
						type : actionConstants.SET_LOCATIONS,
						payload : json.locations
					});

				}



			}).catch(() => {
				
			});
		}


	};



}

