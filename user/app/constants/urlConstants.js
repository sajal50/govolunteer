

let urlConstants = () => {

	let baseUrl = "http://localhost:5000/"
	return {

		"login" : baseUrl + 'api/authz/signin',
		"init" : baseUrl + 'api/getSession',
		"signUp" : baseUrl + 'api/authz/signup',
		"logout" : baseUrl + 'api/authz/logout',
		"metadata" : baseUrl + 'api/metadata',
		"event" : baseUrl + 'api/event',
		"post" : baseUrl + 'api/userpost',
		"userpost" : baseUrl + 'api/userpost',
		"password": baseUrl + 'api/password',
		"responsepost" : baseUrl + 'api/responsepost',
		"userdetails" : baseUrl + 'api/userdetails',
		"profilePic" : baseUrl + 'api/profilePic'
	};


};

export default urlConstants();