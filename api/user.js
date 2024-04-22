/********* 用户相关接口 *********/


import request from "../utils/https.js"

export const login = (data)=>{
	return request.post(`/login`,data)
}

// 反馈
export const feedBack = (data)=>{
	return request.post('/api/main/addFeedback',data)
}

// 常见问题
export const questionList = (data)=>{
	return request.post('/api/article/questions',data)
}

// 查询SOC配置
export const getSocInfo = (data)=>{
	return request.post('/api/member/socInfo',data)
}

// 设置SOC配置
export const setSocInfo = (data)=>{
	return request.post('/api/member/socFlag',data)
}

export const carList = (data)=>{
	return request.post('/api/memberCart/list',data)
}
export const addCar = (data)=>{
	return request.post('/api/memberCart/add',data)
}
export const changeCar = (data)=>{
	return request.post('/api/memberCart/changeDefault',data)
}
export const delCar = (data)=>{
	return request.post('/api/memberCart/del',data)
}
export const centerInfo = (data)=>{
	return request.post('/api/menu/getCenterInfo',data)
}