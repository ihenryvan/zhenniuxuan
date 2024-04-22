/********* 基础接口 *********/

import config from "../config.js"
import request from "../utils/https.js"

export const upload = (data)=>{
	return request.post(`/upload`,data)
}

export const geocoder = (data)=>{
	data.key = config.MAP_KEY
	return request.post(`https://apis.map.qq.com/ws/geocoder/v1`,data,{"content-type": "application/json"})
}

export const geocoderByLocation = (data)=>{
	data.key = config.MAP_KEY
	return request.post(`https://apis.map.qq.com/ws/geocoder/v1`,data,{"content-type": "application/json"})
}

export const siteKeys = (data)=>{
	return request.post(`/api/site/keys`,data)
}



