<template>
    <u-popup :show="isShow" @close="close">
        <view class="good-detail">
            <app-img src="aaaa" w="750" h="480"></app-img>
            <view class="good-cont">
                <view class="title">2024款 原切澳洲谷饲眼肉盖</view>
                <view class="info">
                    <view class="row app-flex">
                        <view class="label">库存：</view>
                        <view class="value">77</view>
                    </view>
                </view>
                <view class="specs">
                    <view class="label">规格</view>
                    <view class="value">120g</view>
                </view>
                
                <view class="intro">规格规格打发的撒规格打发的撒规格打发的撒规格打发的撒规格打发的撒规格打发的撒规格打发的撒规格打发的撒规格打发的撒规格打发的撒规格打发的撒规格打发的撒打发的撒</view>
                
            </view>
        </view>
    </u-popup>
</template>

<style lang="scss" scoped>
    .good-detail {
        position: relative;
        .good-cont {
            padding: 0 30rpx 20rpx;
            .title {
                font-size: 46rpx;
                padding-top: 30rox;
            }
        }
    }
</style>

<script setup>
    import { ref, reactive } from 'vue'
    import * as auth from '@/api/auth'
    import config from '@/config'
    import { userAppStore } from '@/store/app'

    let appStore = userAppStore()
    let emit = defineEmits(['authed'])
    let isShow = ref(false)
    let userInfo = reactive({})
    let params = {}
    let agreeVal = ref([])
    
    
    function open() {
        isShow.value = true
    }

    function close() {
        isShow.value = false
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

