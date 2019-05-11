import axios from 'axios'

export function loginBywx(){
	return axios.get('/wechat/login')
}

export function login(params){
	return axios.post("/users/login",params);
}

