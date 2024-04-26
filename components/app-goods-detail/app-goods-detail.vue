<template>
    <view class="auth-wrap" v-if="show">
        
    </view>
</template>

<script setup>
    import { ref, reactive } from 'vue'
    import * as auth from '@/api/auth'
    import config from '@/config'
    import { userAppStore } from '@/store/app'

    let appStore = userAppStore()
    let emit = defineEmits(['authed'])
    let show = ref(false)
    let userInfo = reactive({})
    let params = {}
    let agreeVal = ref([])
    
    
    function open() {
        if (!params.openid) {
            // uni.getUserInfo({
            //     success(info) {
            //         console.log(1234, info);
            //     }
            // })
            uni.login({
                provider: 'weixin',
                success: res => {
                    if (res.errMsg != "login:ok") {
                        uni.showToast({
                            icon: 'none',
                            title: '获取token失败'
                        })
                        show.value = false
                        return
                    }
                    console.log(res.code);
                    auth.getSession({
                        code: res.code
                    }).then(data => {
                        params.openid = data.openid
                        params.sessionKey = data.session_key
                    })
                }
            })
        }

        show.value = true
    }

    function close() {
        show.value = false
    }

    function submitUserInfo() {
        if (!userInfo.avatar) {
            return uni.showToast({
                icon: 'none',
                title: '请选择头像'
            })
        }
        if (!userInfo.nickname) {
            return uni.showToast({
                icon: 'none',
                title: '请输入用户名'
            })
        }
        if (!agreeVal.value.length) {
            return uni.showToast({
                icon: 'none',
                title: '请先同意《用户服务协议》和《隐私政策》'
            })
        }
        
    }

    function getPhoneNumber(evt) {
        let {
            iv,
            encryptedData,
            errMsg
        } = evt.detail
        
        if (errMsg.indexOf('ok') < 0) {
            return uni.showToast({
                icon: 'none',
                title: '手机号获取失败'
            })
        }

        let queryData = {
            iv,
            encryptedData,
            openid: params.openid,
            sessionKey: params.sessionKey,
            // avatarUrl: userInfo.avatar,
            // nickName: userInfo.nickname,
        }
        
        uni.showLoading({
            title: '授权中'
        })
        auth.getPhone(queryData).then(async data => {
            data.openId = params.openid
            let info = await setUserInfo(data)
            
            data.nickname = userInfo.nickname
            data.avatar = userInfo.avatar
            
            appStore.storeUserInfo(data)
            emit('authed', data)
            close()
        }).finally(() => {
            uni.hideLoading()
        })
    }
    
    function setUserInfo(info) {
        return new Promise((resolve, reject) => {
            let params = {
                token: info.token,
                nickname: userInfo.nickname,
                avatar: userInfo.avatar
            }
            auth.updateUserInfo(params).then(data => {
                resolve(data)
            }).catch(err => {
                reject(err)
            })
        })
    }

    function chooseAvatar(e) {
        let tempPath = e.detail.avatarUrl
        userInfo.avatar = tempPath
        uni.uploadFile({
            url: `${config.REQUEST_URL}/api/common/upload`,
            name: 'file',
            filePath: tempPath,
            success: fileRes => {
                let data = JSON.parse(fileRes.data)
                userInfo.avatar = data.code === 200 ? data.fileName : ''
                console.log(888, userInfo.avatar);
            },
            fail: err => {
                uni.showToast({
                    icon: 'none',
                    title: '头像上传失败'
                })
            }
        })
    }
    
    function goProtocol(type) {
        uni.navigateTo({
            url: `/pages/mine/protocol?type=${type}`
        })
    }

    defineExpose({
        open
    })
</script>

<style lang="scss" scoped>
    .auth-wrap {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        height: 100vh;
        z-index: 999;

        .mask {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            background-color: rgba(0, 0, 0, 0.5);
            animation: showMask 0.25s ease 0.1s forwards;
        }

        .auth-cont {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            background-color: #FFFFFF;
            border-radius: 20rpx 20rpx 0 0;
            padding: 50rpx 40rpx 40rpx;
            // padding-bottom: calc(constant(safe-area-inset-bottom) + 20rpx);
            // padding-bottom: calc(env(safe-area-inset-bottom) + 20rpx);
            transform-origin: center bottom;
            transform: scaleY(0);
            animation: showWrapper 0.25s ease 0.1s forwards;
            z-index: 1000;
        }

        .title {
            font-size: 36rpx;
        }

        .intro {
            font-size: 26rpx;
            color: #AAAAAA;
            margin-top: 16rpx;
            padding-bottom: 30rpx;
        }

        .avatar-wrap {
            width: 100%;
            margin-top: 30rpx;
            display: flex;
            align-items: center;
            justify-content: center;

            .button-shadow {
                border: 8rpx solid rgba(255, 255, 255, 0.05);
                box-shadow: 0rpx 0rpx 80rpx 0rpx rgba(0, 0, 0, 0.15);
                border-radius: 50%;
            }

            .button-wrap {
                position: relative;
                width: 160rpx;
                height: 160rpx;
                border-radius: 50%;
                background-image: repeating-linear-gradient(45deg, #E4E9EC, #F8F7F8);
                color: #FFFFFF;
                background-color: transparent;
                padding: 0;
                margin: 0;
                font-size: inherit;
                line-height: inherit;
                border: none;
                overflow: hidden;

                &::after {
                    border: none;
                }

                .tip {
                    width: 100%;
                    height: 100%;
                }

                .tip {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #999;
                    font-size: 26rpx;
                }
            }
        }

        .nickname-wrap {
            margin-top: 40rpx;
            width: 100%;
            padding: 20rpx;
            border-radius: 16rpx;
            background-color: #F8F7F8;

            .input {
                color: #333;
                font-size: 34rpx;
            }
        }

        .submit-btn {
            width: 100%;
            height: 100rpx;
            color: #FFFFFF;
            background: #E6212B;
            margin-top: 60rpx;
            border-radius: 10rpx;
            font-size: 34rpx;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
    
    .protocal-wrap {
    	display: flex;
    	text-align: center;
    	justify-content: center;
    	flex-flow: wrap row;
        align-items: center;
    	margin-top: 30rpx;
    
    	text {
    		font-size: 26rpx;
    		letter-spacing: 0;
    	}
    	.protocol {
    		color: #FF623D;
    		text-decoration: underline;
    	}
    }

    @keyframes showMask {
        0% {
            opacity: 0;
        }

        100% {
            opacity: 1;
        }
    }

    @keyframes showWrapper {
        0% {
            transform: scaleY(0);
        }

        100% {
            transform: scaleY(1);
        }
    }
</style>