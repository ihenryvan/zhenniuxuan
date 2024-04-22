/********* 授权相关接口 *********/

import request from "../utils/https.js"

export const getSession = data => {
    // return request.post('/api/member/wxmpCode2Session', data)
    return request.post('/api/login/wxlogin', data)
}

export const getPhone = data => {
    return request.post('/api/member/wxMinBindPhone', data)
}

export const decryptUserInfo = data => {
    return request.post('/api/login/authority', data)
}

export const updateUserInfo = data => {
    return request.post('/api/member/updateMemberInfo', data)
}