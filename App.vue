<script>
    import { storeToRefs } from 'pinia'
    import { userAppStore } from '@/store/app'
    import { getSession } from '@/api/auth'
    import { getShopList } from '@/api/home'
    
    export default {
        onLaunch: function() {
            getShopInfo() // 临时
            reStoreInfo()
        },
        onShow: function() {
        },
        onHide: function() {
        },
    };
    
    function reStoreInfo() {
        let appStore = userAppStore()
        uni.login({
            provider: 'weixin',
            success: res => {
                if (res.errMsg != "login:ok") {
                    return
                }
                getSession({ code: res.code }).then(data => {
                    if (data && data.user && data.user.token) {
                        data.openId = data.openid
                        appStore.storeUserInfo(data.user)
                    }
                })
            }
        })
    }
    
    function getShopInfo() {
        getShopList({latitude: 22, longitude: 114}).then(data => {
            let info = data.find(item => item.id == 10000)
            if (info && info.id) {
                let appStore = userAppStore()
                appStore.storeShopInfo(info)
            } else {
                uni.showToast({
                    title: '缺少店铺信息',
                    icon: 'none'
                })
            }
        })
    }
</script>

<style lang="scss">
    // 引入uview-plus基础样式
    @import "@/uni_modules/uview-plus/index.scss";

    text {
        font-family: PingFang SC-Regular, PingFang SC;
    }

    view {
        box-sizing: border-box;
    }

    .flex-center {
        display: flex;
        align-items: center;
    }

    image {
        vertical-align: middle;
    }

    button {
        padding: 0;

        &::after {
            border: none !important;
        }
    }

    .box,
    html,
    page {
        // background: #f5f9ff;
    }

    .fixed-footer {
        border-top: 2rpx solid #e5e7eb;
        justify-content: space-between;
        width: 100%;
        padding: 22rpx 28rpx;
        background: #ffffff;
        position: fixed;
        bottom: 0;
        z-index: 99;

        button {
            height: 88rpx;
            border-radius: 16rpx;
            border: 2rpx solid #e5e7eb;
            font-size: 30rpx;
            font-weight: 400;
            line-height: 88rpx;
            width: 446rpx;
            background: #0066ff;
            color: #ffffff;
            width: 670rpx !important;
        }
    }
</style>