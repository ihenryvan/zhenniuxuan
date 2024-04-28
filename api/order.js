/********* 订单相关接口 *********/

import request from "../utils/https.js"

// 下单
export const saveOrder = (data)=>{
	return request.post('/api/order/balance', data, { 'content-type': 'application/json' })
}

// 订单列表
export const orderList = (data)=>{
	return request.get('/api/order/list', data, { 'content-type': 'application/json' })
}

// 订单详情
export const orderDetail = (data)=>{
	return request.get('/api/order/details', data, { 'content-type': 'application/json' })
}

// 支付订单
export const payOrder = (data)=>{
	return request.post('/api/order/pay', data)
}

// 获取订单核销码
export const genCode = (data)=>{
	return request.get('/api/order/verifycode', data, { 'content-type': 'application/json' })
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

export const invoiceAdd = (data)=>{
	return request.post('/api/invoice/add',data)
}

export const orderRestock = (data)=>{
	return request.post('/api/order/restock',data)
}





