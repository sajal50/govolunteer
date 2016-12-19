let initialState = () => {

	return {

		"userInfo" : {

			"email" : null,
			"isLoggedIn" : false,
			"isLoggedInChecked" : false,
			"type" : null,
			"pic" : null
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
		org : {

			events : [],
			flags : {
				'newEventScreenType' : 'FORM'

			},
			resultEvent:null
		},

		user : {
			posts: []			


			}
		
		}

	};


export default initialState ();