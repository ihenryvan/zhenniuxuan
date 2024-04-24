/********* 授权相关接口 *********/

import request from "../utils/https.js"

export const getSession = data => {
    return request.post('/api/auth/wxmpCode2Session', data)
}

export const getPhone = data => {
    return request.post('/api/auth/wxmpPhoneLogin', data)
}

export const decryptUserInfo = data => {
    return request.post('/api/login/authority', data)
}

export const updateUserInfo = data => {
    return request.post('/api/member/modify', data)
}