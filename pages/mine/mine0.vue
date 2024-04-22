<template>
    <view class="box">
        <Logo></Logo>
        <view class="header">
            <image src="/static/mine0/background.png" mode="" />
            <view class="userInfo flex-center">
                <template v-if="appStore.hasLogin">
                    <view class="user">
                        <!-- <image src="/static/mine0/photo.png" mode="" /> -->
                        <app-img type="avatar" :src="appStore.userInfo.headPath" w="108" h="108" margin="0 20rpx 0 0" />
                        <view>
                            <text>{{appStore.userInfo.nickname}}</text>
                            <text>{{appStore.userInfo.mobileNo}}</text>
                        </view>
                    </view>
                    <view class="center" @click="toPersonalCenter">
                        <image src="/static/mine0/personal.png" mode="" />
                        <text>个人中心</text>
                    </view>
                </template>
                <!-- <view v-else class="user" @click="authRef.open()">
                    <image src="/static/mine0/photo.png" mode="" />
                    <view>
                        <text>点击登录</text>
                    </view>
                </view> -->
                <button v-else open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">asdf</button>
            </view>
        </view>
        <view class="warp data" v-if="appStore.hasLogin">
            <view @click="toWallet">
                <text>{{canUseBalance}}</text>
                <text>个人钱包</text>
            </view>
            <view @click="toCard">
                <text>0</text>
                <text>优惠卷</text>
            </view>
            <view @click="toOrder">
                <text>{{statistics.orderNum}}</text>
                <text>本月订单</text>
            </view>
        </view>
        <view class="warp type">
            <view v-for="item in centerJump" :key="item.id" @click="jump(item.url)">
                <image :src="item.image" mode="" />
                <text>{{item.text}}</text>
            </view>
        </view>
        <view class="advertising warp">
            <image src="/static/mine0/advertising.png" mode="" />
        </view>
        <view class="warp list">
            <view class="item flex-center" v-for="item in Jumplist" :key="item.id" @click="jump(item.url)">
                <button v-if="item.text.indexOf('客服') >= 0" open-type="contact" class="contact"></button>
                <view class="flex-center">
                    <image :src="item.image" mode="" />
                    <text>{{ item.text }}</text>
                </view>
                <u-icon name="arrow-right" color="#939393" size="28rpx"></u-icon>
            </view>
        </view>
    </view>

    <auth ref="authRef"></auth>
</template>

<script setup>
    import Logo from "/components/Logo.vue"
    import { ref, defineComponent, reactive } from "vue"
    import { userAppStore } from '@/store/app'
    import auth from '@/components/auth'
    import { memberStatistics } from '@/api/fund'
    import { centerInfo } from '@/api/user'
    import { onShow } from "@dcloudio/uni-app"

    let appStore = userAppStore()
    let authRef = ref(null)
    let statistics = ref({})
    let canUseBalance = ref(0)
    
    const Jumplist = reactive([{
            id: 0,
            image: "/static/mine0/icon1.png",
            text: "兑换卡卷",
            url: "exchange-card"
        },
        {
            id: 1,
            image: "/static/mine0/icon2.png",
            text: "客服中心",
            url: ""
        },
        {
            id: 2,
            image: "/static/mine0/icon3.png",
            text: "常见问题",
            url: "problem"
        },
        {
            id: 3,
            image: "/static/mine0/icon4.png",
            text: "客户热线",
            url: "hotLine"
        },
        {
            id: 4,
            image: "/static/mine0/icon5.png",
            text: "意见反馈",
            url: "feedback"
        },
        {
            id: 5,
            image: "/static/mine0/icon6.png",
            text: "设置中心",
            url: "setup"
        },
    ]);
    const centerJump = [{
            id: 0,
            image: "/static/mine0/invoice.png",
            text: "我的发票",
            url: "invoice"
        },
        {
            id: 1,
            image: "/static/mine0/car.png",
            text: "我的车辆",
            url: "car"
        },
        {
            id: 2,
            image: "/static/mine0/card.png",
            text: "充电卡",
            url: ""
        },
    ];
    
    onShow(() => {
        if (appStore.hasLogin) {
            getMemberStatistics()
        }
    })
    
    function getPhoneNumber(a) {
        console.log(a);
    }
    
    function getMemberStatistics() {
        memberStatistics().then(data => {
            calCanUseBalance(data.balance, data.balanceAmtFreeze)
            // data.balance = data.balance / 100
            statistics.value = data
        })
    }
    
    function calCanUseBalance(total, freeze) {
        let amount = total - freeze
        amount = amount > 0 ? amount : 0
        canUseBalance.value = (amount / 100).toFixed(2)
    }
    
    function toPersonalCenter() {
        uni.navigateTo({
            url: "/pages/mine0/personal-center"
        });
    }
    
    function toWallet() {
        uni.navigateTo({
            url: "/pages/mine0/wallet"
        });
    }

    function toCard() {
        uni.navigateTo({
            url: "/pages/mine0/card"
        });
    }
    
    function toOrder() {
        uni.navigateTo({
            url: "/pages/mine0/order"
        });
    }

    function jump(url) {
        if (!appStore.hasLogin) {
            return uni.showToast({
                icon: 'none',
                title: '请先登录'
            })
        }
        if (url == 'hotLine') {
            return centerInfo().then(data => {
                uni.makePhoneCall({
                	phoneNumber: data.introduction
                });
            })
        }
        uni.navigateTo({
            url: "/pages/mine0/" + url
        });
    }
</script>

<style lang="scss" scoped>
    .box,
    html,
    page {
        background: #f5f9ff;
        margin-bottom: 40rpx;
    }

    .header {
        position: relative;
        margin-bottom: 40rpx;

        &>image {
            position: absolute;
            width: 100%;
            height: 318rpx;
        }

        .userInfo {
            position: relative;
            justify-content: space-between;
            padding: 44rpx 48rpx 26rpx;

            .user {
                display: inline-flex;
                align-items: center;
                margin-left: 36rpx;

                &>image {
                    width: 108rpx;
                    height: 108rpx;
                    border-radius: 100%;
                    margin-right: 36rpx;
                }

                view {
                    text {
                        font-weight: 500;
                        color: #ffffff;
                        display: block;

                        &:first-child {
                            font-size: 32rpx;
                            margin-bottom: 16rpx;
                        }

                        &:last-child {
                            font-size: 28rpx;
                            font-weight: 500;
                        }
                    }
                }
            }

            .center {
                width: 160rpx;
                height: 52rpx;
                background: #ffffff;
                border-radius: 16rpx;
                text-align: center;

                image {
                    vertical-align: middle;
                    width: 24rpx;
                    margin-right: 12rpx;
                    height: 24rpx;
                }

                text {
                    line-height: 52rpx;
                    font-size: 24rpx;
                    font-weight: 400;
                    color: #188bfc;
                }
            }
        }
    }

    .warp {
        position: relative;
        margin: 28rpx;
        background: #ffffff;
        border-radius: 16rpx;
    }

    .data {
        padding: 44rpx 0;
        display: flex;
        align-items: center;
        justify-content: space-around;

        view {
            text {
                text-align: center;
                display: block;

                &:first-child {
                    font-size: 32rpx;
                    font-weight: 500;
                    color: #2227b6;
                }

                &:last-child {
                    margin-top: 28rpx;
                    font-size: 24rpx;
                    font-weight: 400;
                    color: #333333;
                }
            }
        }
    }

    .type {
        padding: 44rpx 0;
        display: flex;
        align-items: center;
        justify-content: space-around;

        view {
            text-align: center;

            text {
                text-align: center;
                display: block;
                font-size: 26rpx;
                font-weight: 400;
                color: #222222;
                margin-top: 28rpx;
            }

            image {
                width: 84rpx;
                height: 84rpx;
            }
        }
    }

    .advertising {
        image {
            width: 100%;
            height: 230rpx;
        }
    }

    .list {
        padding: 32rpx 28rpx;

        .item {
            position: relative;
            justify-content: space-between;
            margin-bottom: 52rpx;

            &:last-child {
                margin-bottom: 0;
            }

            image {
                width: 48rpx;
                height: 48rpx;
            }

            text {
                margin-left: 16rpx;
                font-size: 26rpx;
                font-weight: 400;
                color: #222222;
            }
            
            .contact {
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                opacity: 0;
            }
        }
    }
</style>