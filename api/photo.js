/********* 首页相关接口 *********/

import request from "../utils/https.js"

// 列表
export const getVideo = data => {
    return request.post('/api/video/queryVideo', data)
}

// 详情
export const videoDetail = data => {
    return request.post('/api/video/queryTransmitShowImage', data)
}

// 转发
export const transmitVideo = data => {
    return request.post('/api/video/transmitVideo', data)
}