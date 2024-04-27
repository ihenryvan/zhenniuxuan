/********* 首页相关接口 *********/

import request from "../utils/https.js"

// 店铺列表
export const getShopList = data => {
    return request.get('/api/store/nearbyList', data)
}

// 店铺详情
export const getShopDetail = data => {
    return request.get('/api/store/details', data)
}

export const geocode = data => {
    const key = '50b7b2c90714dc691f64155272ebb4f8'
    return request.post(`https://restapi.amap.com/v3/geocode/regeo?output=JSON&location=${data}&key=${key}&radius=10&extensions=all`)
}