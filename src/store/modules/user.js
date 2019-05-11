const user = {
	state:{
		userId:"",
		weichatId:""
	},
	mutations:{
		saveUserId:(state,userId)=>{
			localStorage.setItem("userId",userId);
//			console.log(localStorage)
			state.userId = userId;
		}
	}
}

export default user;