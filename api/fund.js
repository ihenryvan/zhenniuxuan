/********* 资金相关接口 *********/

import request from "../utils/https.js"

// 资金信息
export const memberStatistics = (data)=>{
	return request.post(`/api/member/memberStatistics`,data)
}

// 流水记录
export const waterRecord = (data)=>{
	return request.post(`/api/accountWater/water`,data)
}

// 提现记录
export const withdrawRecord = (data)=>{
	return request.post(`/api/withdrawApply/list`,data)
}

// 提现
export const applyWithdraw = (data)=>{
	return request.post(`/api/withdrawApply/addWithdrawApplyBalance`,data)
}
