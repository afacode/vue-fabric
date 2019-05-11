var images = {
	state:{
		classes:[],
		currentClass:{}
	},
	mutations:{
		setClasses:(state,data)=>{
			state.classes = data;
		},
		setClass:(state,data)=>{
			state.currentClass = data;
		}
	}
}

export default images