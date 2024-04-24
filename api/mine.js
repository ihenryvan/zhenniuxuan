/********* 我的相关接口 *********/

import request from '../utils/https.js'

export function applyVip(data) {
    return request.post('/api/membervip/apply', data)
}
export function getConfig(data) {
    return request.get('/api/membervip/config', data)
}
export function getUserInfo(data) {
    return request.get('/api/member/info', data)
}