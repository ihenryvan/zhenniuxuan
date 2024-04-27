/********* 点肉相关接口 *********/

import request from "../utils/https.js"

// 店铺-商品分类
export const getShopCate = data => {
    return request.get('/api/product/categories', data)
}

// 店铺-商品分类-商品
export const getGoods = data => {
    return request.get('/api/product/list', data)
}

// 加入购物车
export const addCart = data => {
    return request.post('/api/cart/add', data)
}

// 拿出购物车
export const deductCart = data => {
    return request.post('/api/cart/deduct', data)
}

// 购物车数量
export const cartNum = data => {
    return request.get('/api/cart/num', data)
}

// 购物车商品列表
export const cartGoods = data => {
    return request.get('/api/cart/products', data)
}

// 清空购物车
export const clearCart = data => {
    return request.post('/api/cart/clear', data)
}