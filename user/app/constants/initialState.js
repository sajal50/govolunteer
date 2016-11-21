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

		}

	};

};


export default initialState ();