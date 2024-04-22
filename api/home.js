/********* 首页相关接口 *********/

import request from "../utils/https.js"

// 电站列表
export const getSiteList = data => {
    return request.post('/api/site/distance', data)
}

// 电站详情
export const getSiteDetail = data => {
    return request.post('/api/site/detail', data)
}

// 电桩列表
export const getMachineList = data => {
    return request.post('/api/machine/machines', data)
}

// 电桩详情
export const getMachineDetail = data => {
    return request.post('/api/machine/detail', data)
}

// 费用详情
export const feeList = data => {
    return request.post('/api/fee/feeList', data)
}

export const geocode = data => {
    const key = '50b7b2c90714dc691f64155272ebb4f8'
    return request.post(`https://restapi.amap.com/v3/geocode/regeo?output=JSON&location=${data}&key=${key}&radius=10&extensions=all`)
}