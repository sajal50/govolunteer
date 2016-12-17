import urlConstants from '../constants/urlConstants.js';
import {serialize} from '../util/util.js';
import actionConstants from '../constants/actionConstants.js';
import {hashHistory} from 'react-router';
import {triggerNotification} from './notificationActions.js';
import {kfetch} from '../util/util.js';

import {redirectAccordingToRole} from './initialLoadingActions.js';


export function updatePassword (oldpassword,newpassword) {


	return function (dispatch, getState) {

		kfetch(urlConstants.password, {

					method :'POST',
					headers: {
						'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
					},
					body: serialize({"oldpassword":oldpassword,"newpassword":newpassword})
				}).then((response) => {
					return response.json();
				}).then((json)=> {

					if (!json.error) {

						dispatch(triggerNotification({
							message: "Password Updated.",
							level : "success"
						}));
						redirectAccordingToRole (getState().userInfo.type);



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