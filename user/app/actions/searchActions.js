import urlConstants from '../constants/urlConstants.js';
import {serialize} from '../util/util.js';
import actionConstants from '../constants/actionConstants.js';

import {triggerNotification} from './notificationActions.js';
import {kfetch} from '../util/util.js';
import {setFlags} from './flagActions.js';

export function fetchCategories () {

	return function (dispatch, getState) {

		let {isCategoryFetched} = getState().flags;

		if (!isCategoryFetched) {


			kfetch(urlConstants.categories)
			.then((response) => {

				return response.json();
			}).then((json)=> {

				if (!json.error) {

					dispatch(setFlags({
						isCategoryFetched: true
					}));

					dispatch ({
						type : actionConstants.SET_CATEGORIES,
						payload : json
					})
				}



			}).catch(() => {
				
			});
		}


	};



}

export function fetchLocations  () {

	return function (dispatch, getState) {

		let {isLocationFetched} = getState().flags;

		if (!isLocationFetched) {


			kfetch(urlConstants.locations)
			.then((response) => {

				return response.json();
			}).then((json)=> {

				if (!json.error) {

					dispatch(setFlags({
						isLocationFetched: true
					}));

					dispatch ({
						type : actionConstants.SET_LOCATIONS,
						payload : json
					})
				}



			}).catch(() => {
				
			});
		}


	};



}

export function search (payload) {

	return function (dispatch, getState) {

		let {location,searchword,lookingFor,category} = payload;
		//TODO - FIX ENCODE URL 
		kfetch( urlConstants.search+`?location=${location}&searchword=${searchword}&lookingFor=${lookingFor}&category=${category}`) 
		.then((response) => {

			return response.json();
		}).then((json)=> {

			if (!json.error) {

				dispatch({
					type:actionConstants.SET_POSTS,
					payload: json.posts
				});
			}



		}).catch(() => {
			
		});



	}
}