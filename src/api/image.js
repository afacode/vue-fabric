import axios from '@/api/axios';
export function uploadImg(params){
	return axios.post("/api/v1/tuku/item",params);
}

export function getCategory(params){
	return axios.get("/api/v1/tuku/categories?"+params);
}

export function search(params){
	return axios.get("/api/v1/products/search?"+params);
}

export function getByItemId(id){
	return axios.get("/api/v1/tuku/item/"+id);
}

export function query(params){
	return axios.get("/api/v1/products/research?d="+params);
}
