/********* 充值相关接口 *********/

import request from "../utils/https.js"

// 发起充值
export const addRecharge = (data)=>{
	return request.post(`/api/recharge/add`,data)
}

// 充值支付参数
export const rechargeParam = (data)=>{
	return request.post(`/api/recharge/weixinMinParam`,data)
}