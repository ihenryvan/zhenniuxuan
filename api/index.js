/********* 首页相关接口 *********/

import request from "../utils/https.js"

// 列表
export const getIndexList = data => {
    return request.post('/api/img/queryShowImage', data)
}