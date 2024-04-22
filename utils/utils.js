//秒数转化为时分秒
const formatSeconds = (value) => {
	var secondTime = parseInt(value); // 秒
	var minuteTime = 0; // 分
	var hourTime = 0; // 小时
	if (secondTime > 60) { //如果秒数大于60，将秒数转换成整数
		//获取分钟，除以60取整数，得到整数分钟
		minuteTime = parseInt(secondTime / 60);
		//获取秒数，秒数取余，得到整数秒数
		secondTime = parseInt(secondTime % 60);
		//如果分钟大于60，将分钟转换成小时
		if (minuteTime > 60) {
			//获取小时，获取分钟除以60，得到整数小时
			hourTime = parseInt(minuteTime / 60);
			//获取小时后取余的分，获取分钟除以60取余的分
			minuteTime = parseInt(minuteTime % 60);
		}
	}
	var result = "" + parseInt(secondTime) + "秒";

	if (minuteTime > 0) {
		result = "" + parseInt(minuteTime) + "分" + result;
	}
	if (hourTime > 0) {
		result = "" + parseInt(hourTime) + "小时" + result;
	}
	console.log('result', result);
	return `${parseInt(hourTime) }小时${parseInt(minuteTime)}分${parseInt(secondTime)}秒`
}


/**
 * 跳转页面方法
 * @param {String} url 页面地址
 * @param {Boolean} hasLogin 是否登录
 * @returns 
 */
const navPage = (url, hasLogin = true) => {
	if (!hasLogin) {
		return toast('请登录')
	}
	uni.navigateTo({
		url
	})
}

/**
 * 返回上一级
 * @param {String} delta 返回页面数
 */
const navback = (delta = 1) => {
	uni.navigateBack({
		delta: delta
	})
}

/**
 * 获取上级页面参数方法
 * @returns prePage.$vm
 */
const prePage = () => {
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 2];
	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
}



/**
 * 统一提示
 * @param {String} title 提示语
 * @param {Number} duration 显示时间
 * @param {String} mask 
 * @param {String} icon 图标
 * @returns 
 */
const toast = (title, duration = 2000, mask = false, icon = 'none') => {
	//统一提示方便全局修改
	if (Boolean(title) === false) {
		return;
	}
	setTimeout(() => {
		uni.showToast({
			title,
			duration,
			mask,
			icon
		});
	}, 10);

}

/**
 * 生成UUID
 */
let generateUUID = function() {
	var d = new Date().getTime();
	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = (d + Math.random() * 16) % 16 | 0;
		d = Math.floor(d / 16);
		return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
	})
	return uuid
}


/**
 * 是否在微信打开
 * @returns Boolean
 */
let isWechat = function() {
	let ua = window.navigator.userAgent.toLowerCase();
	if (ua.match(/micromessenger/i) == 'micromessenger') {
		return true;
	}
	return false;
}


/**
 * 是否IOS设备
 * @returns Boolean
 */
let isIOS = function() {
	let ua = window.navigator.userAgent;
	if (!!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
		return true;
	}
	return false;
}

/**
 * 时间格式化
 * @param {Date} date 时间对象
 * @param {String} pattren 时间格式
 * @returns 
 */
let formatDate = function(date, pattren) {
	var fmt = pattren || 'yyyy-MM-dd hh:mm:ss';
	var o = {
		"M+": date.getMonth() + 1, //月份 
		"d+": date.getDate(), //日 
		"h+": date.getHours(), //小时 
		"m+": date.getMinutes(), //分 
		"s+": date.getSeconds(), //秒 
		"q+": Math.floor((date.getMonth() + 3) / 3), //季度
		"S": date.getMilliseconds() //毫秒 
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k])
				.length)));
	return fmt;
}

export default {
	$formatDate: formatDate,
	$isIOS: isIOS,
	$isWechat: isWechat,
	$generateUUID: generateUUID,
	$toast: toast,
	$prePage: prePage,
	$navback: navback,
	$navPage: navPage,
	$formatSeconds:formatSeconds
}