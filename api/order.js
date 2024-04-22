/********* 订单相关接口 *********/

import request from "../utils/https.js"

// 开始充电（下单）
export const createOrder = (data)=>{
	return request.post('/api/order/createCdOrder',data)
}

// 获取订单列表
export const getOrderList = (data)=>{
	return request.post('/api/order/queryCdOrderList',data)
}

// 订单详情
export const queryOrderInfo = (data)=>{
	return request.post('/api/order/queryCdOrderDetail',data)
}

// 微信支付参数
export const weixinMiniParam = (data)=>{
	return request.post('/api/order/weixinMiniParam',data)
}

// 发票列表
export const invoiceList = (data)=>{
	return request.post('/api/invoice/list',data)
}

// 发票详情
export const invoiceDetail = (data)=>{
	return request.post('/api/invoice/detail', data)
}

export const overOrder = (data)=>{
	return request.post('/api/order/overOrder',data)
}


export const invoiceAdd = (data)=>{
	return request.post('/api/invoice/add',data)
}

export const orderRestock = (data)=>{
	return request.post('/api/order/restock',data)
}





