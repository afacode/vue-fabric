import axios from 'axios'

export function create(params){
	return axios.post("/api/v1/tuku/palettes/palette",params);
}

export function list(){
	return axios.get("/api/v1/tuku/palettes/palette");
}

export function del(paletteId){
	return axios.put("/api/v1/tuku/palettes/"+paletteId);
}

export function updateCaseBasic(params){
	return axios.put("/api/v1/tuku/palettes/palette/"+params.paletteId,params);
}

export function caseBasic(paletteId){
	return axios.get("/api/v1/tuku/palettes/palettes/"+paletteId);
}

export function casedetails(paletteId){
	return axios.get("/api/v1/tuku/palettes/caseMongoDO/"+paletteId);
}

export function updateCanvas(params){
	return axios.post("/api/v1/tuku/palettes/canvas",params);
}