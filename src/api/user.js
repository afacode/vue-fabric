import axios from '@/api/axios'

export function loginBywx(){
	return axios.get('/api/v1/wechat/login')
}

export function login(params){
	return axios.post("/api/v1/user/info/login",params);
}

export function regist(params) {
  return axios.post('/api/v1/user/info/register',params)

}
export function getSmsCode(params){
	return axios.post("/api/v1/user/info/smsSend",params);
}

export function bindPhone(params){
	return axios.put("/api/v1/user/info/bindPhone",params);
}
export function updateUser(params){
	return axios.put("/api/v1/user/info/update",params);
}
export function getUser(){
	return axios.get("/api/v1/user/info/getInfo");
}

export function getUserId(vm){
	let a = vm.$store.getters.user.userId;
	let  userId = "";
	if(!a || a==""){
		userId = localStorage.getItem("userId");
		vm.$store.commit('saveUserId',userId);
	}
	return vm.$store.getters.user.userId;
}
