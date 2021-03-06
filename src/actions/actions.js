import fetch from 'isomorphic-fetch';
import apiUrl from '../config/config';


//actions types
const DO_SOMETHING = 'DO_SOMETHING';
const FETCH_MEMORIES = 'FETCH_MEMORIES';
const RECEIVE_MEMORIES = 'RECEIVE_MEMORIES';

const REGISTER_USER = 'REGISTER_USER';
const REGISTER_REQUEST = 'REGISTER_REQUEST';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const REGISTER_FAIL = 'REGISTER_FAIL';
const VERIFY_REQUEST = 'VERIFY_REQUEST';
const VERIFY_SUCCESS = 'VERIFY_SUCCESS';
const VERIFY_FAIL = 'VERIFY_FAIL';


/*
// API CALLS  => ASYNC ACTIONS
async action types
{
type : 'FETCH_MEMORIES',
id : memoryId
}

{
type: 'REGISTER_USER',
creds: {
	identifier:"",
	identifierType:"PHONE",
	verificationMode:"OTP_MSG"
}
}

*/



//action creators

const doSomething = (text) => {

    return {
        type: 'DO_SOMETHING',
        text: text
    }

}


const registerUser = (creds) => {
	/*	return async action perhaps ???
	return dispatch => {
			dispatch(registerRequest(data))
			return fetch(apiUrl,config)
				.then(response => response.json())
				.then(json => dispatch(registerSuccess(json)))
	}*/
	let config = {
		method: "POST",
		headers: {'Content-Type':'application/x-www-form-urlencoded'},
		body: 'identifier=${creds.identifier}&identifierType=${creds.identifierType}&verificationMode=${creds.verificationMode}'
	}
	let url = apiUrl + "register.json";

	return dispatch => {
		// We dispatch requestLogin to kickoff the call to the API . THIS WILL DEPEND ON THE AUTH FLOW WE DECIDE EVENTUALLY , JUST REGISTER_USER FOR NOW.
		dispatch(registerRequest(creds))

		return fetch(url , config)
			.then((response) => {
				if(!resposne.verificationId){
					dispatch(loginFailure(response));
				}else {
					dispatch(verifyUser(response.verificationId));
				}
			})
			.catch()
	}

}

const registerRequest = (data) => {
	// return async action using thunk middleware
	return {
		type: 'REGISTER_REQUEST',
		data: data
	}

}


const getUserProfile = (data) => {
	//use this function to fetch user data when authToken is already present on initial page load
	//save this data as auth
}

const registerSuccess = (data) => {
	return {
		type: 'REGISTER_SUCCESS',
		data: data
	}
}

const registerFail = (data) => {
	return {
		type: 'REGISTER_FAIL',
		data: data
	}
}

const verifyRequest = (data) => {
	//update state , actual network call made in verifyUser()
	return {
		type: 'VERIFY_REQUEST',
		data: data
	}

}

const verifySuccess = (data) => {
	return {
		type: 'VERIFY_SUCCESS',
		data: data
	}

}

const verifyFail = (data) => {
	return {
		type: 'VERIFY_FAIl',
		data: data
	}
}


const verifyUser = (id) => {
	/*
	return dispatch => {
		dispatch(verifyRequest(data));
		return fetch(apiUrl,config)
			.then(response = response.json())
			.then(json => dispatch(verifySuccess(json)))
	}
	*/
	let url = apiUrl + "verify/"+id+".json";
	let config = {
		method: "POST",
		headers: {'Content-Type':'application/x-www-form-urlencoded'},
		body: 'otp=783sdf'
	}
	return dispatch => {
		//dispatch() dispatch requestverify
		return fetch(url , config)
			.then((response) => {
				if(resposne.authToken){
					dispatch(verifySuccess(response));
				}else {
					dispatch(verifyFailed(response));
				}
			})
	}

}


// have to use redux-thunk to setup async actionCreators

const fetchMemories = (memoryId) => {
	return {
		type: 'FETCH_MEMORIES',
		id : memoryId
	}
}

const receiveMemories = (json) => {
	return {
		type: 'RECEIVE_MEMORIES',
		memories : json
	}
}

//export action creator and call like dispatch(actionCreator(a,b))
//eventually move all action names into constants
export { doSomething , registerRequest , registerFail , registerSuccess , verifyUser , verifyFail , verifySuccess };
