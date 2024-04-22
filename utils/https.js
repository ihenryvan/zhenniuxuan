import config from "../config.js"
let http = {
	"baseUrl": config.REQUEST_URL,
	"headers": {
		"content-type": "application/x-www-form-urlencoded"
	},
	"get": get,
	"post": post,
	"delete": Delete,
	"put": put,
	"request": request
}

const mapUrl = 'https://apis.map.qq.com/ws/geocoder/v1'

function request(url, data, method, headers) {
	
	return new Promise((resolve, reject) => {
		let userInfo = uni.getStorageSync('userInfo');
        let params = data || {}
        
		if (userInfo && !params.token) {
			http.headers.token = userInfo.token
            params.token = userInfo.token
		}

		uni.request({
			url: url.startsWith('http') ? url : (http.baseUrl + url),
			method: method || "GET",
			data: params,
			header: headers || http.headers,
			sslVerify: false,
			success: (res) => {
				//
				if(res.data.code == 0){
					resolve(res.data.data || res.data.regeocode)
					return false
				}
				
				//地图接口走这个判断
				if(mapUrl.indexOf(url) != -1 && res.data.code == 0){
					resolve(res.data)
					return false
				}
				
				uni.showToast({
					title: res.data.msg || res.data.message,
					duration: 2000,
					icon: 'none'
				});
				reject(res.data.msg || res.data.message)
			},
			fail: (err) => {
				uni.showToast({
					title: "Network connection error",
					duration: 2000,
					icon: 'none'
				});
				reject(err)
			},
			complete: (e) => {

			}
		})
	})
}

/**
 * GET请求
 * @param {Object} url 请求路径
 * @param {Object} data 请求参数
 * @param {Object} headers 请求头
 */
function get(url, data, headers) {
	return request(url, data, "GET", headers);
}
/**
 * POST请求
 * @param {Object} url 请求路径
 * @param {Object} data 请求参数
 * @param {Object} headers 请求头
 */
function post(url, data, headers) {
	return request(url, data, "POST", headers);
}

/**
 * DELETE请求
 * @param {Object} url 请求路径
 * @param {Object} data 请求参数
 * @param {Object} headers 请求头
 */
function Delete(url, data, headers) {
	return request(url, data, "DELETE", headers);
}

/**
 * put请求
 * @param {Object} url 请求路径
 * @param {Object} data 请求参数
 * @param {Object} headers 请求头
 */
function put(url, data,headers) {
	return request(url, data, "PUT", headers);
}

export default http
