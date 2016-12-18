

let urlConstants = () => {

	let baseUrl = "http://localhost:5000/"
	return {

		"login" : baseUrl + 'api/authz/signin',
		"init" : baseUrl + 'api/getSession',
		"signUp" : baseUrl + 'api/authz/signup',
		"logout" : baseUrl + 'api/authz/logout',
		"metadata" : baseUrl + 'api/metadata',
		"event" : baseUrl + 'api/event',
		"post" : baseUrl + 'post',
		"userpost" : baseUrl + 'userpost',
		"password": baseUrl + 'password',
		"responsepost" : baseUrl + 'responsepost',
		"userdetails" : baseUrl + 'userdetails',
		"profilePic" : baseUrl + 'profilePic'
	};


};

export default urlConstants();