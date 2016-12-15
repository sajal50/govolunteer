let initialState = () => {

	return {

		"userInfo" : {

			"email" : null,
			"isLoggedIn" : false,
			"isLoggedInChecked" : false,
			"type" : null
		},
		"notifConfig" : {
			
			isTriggered : false,
			level : null,
			message : null

		},
		categories: [],
		locations: [],
		flags : {

			isCategoryFetched:false,
			isLocationFetched :false
		}
	};

};


export default initialState ();