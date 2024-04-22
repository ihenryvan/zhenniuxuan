// 是否是开发环境   true:是  false:不是
const isDevelop = true
// 基础地址   开发环境:线上环境
const BASE_URL = isDevelop ? `https://sd.zhjfd.com/` : `https://sd.zhjfd.com/`
// 项目名称    开发环境:线上环境
const PROJECT_NAME = isDevelop ? `xmate4d` : `xmate4d`
//请求地址
const REQUEST_URL = `${BASE_URL}${PROJECT_NAME}`
// 图片访问地址
const IMAGE_URL = `${BASE_URL}xmate4d`

//地图key
const MAP_KEY = 'IY5BZ-SKQWI-NPAGB-UL4WM-OJ3D2-YEFJM'


export default {
	isDevelop,
	BASE_URL,
	PROJECT_NAME,
	REQUEST_URL,
	IMAGE_URL,
	MAP_KEY
}
