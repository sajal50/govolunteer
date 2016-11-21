let initialState = () => {

	return {

		"userInfo" : {

			"email" : null,
			"isLoggedIn" : false,
			"isLoggedInChecked" : false
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
		},
		posts: []

	};

};


export default initialState ();