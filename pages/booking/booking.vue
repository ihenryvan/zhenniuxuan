<template>
    <view class="page-wrap">
        <u-navbar bgColor="#fff" title="点肉" leftIcon="" :placeholder="true" />
        <view class="info-wrap">
            <view class="shop-info app-flex">
                <view class="app-flex align-center" @click="goMap">
                    <app-img src="/static/booking/icon-shop.png" w="40" h="40"></app-img>
                    <view class="name">{{shopInfo.storeName}}</view>
                    <u-icon class="icon" name="arrow-right" size="16" color="#333" />
                </view>
            </view>
            <!-- <view class="doc-info app-flex align-center">
                <u-icon name="map" size="18" color="#666" />
                <text>距离您14.10km</text>
            </view> -->
        </view>
        
        <u-transition :show="isShowRefer" mode="slide-down">
            <view class="work-info" id="reference">
                <app-img src="/static/booking/info-bg.png" w="680" h="114"></app-img>
                <view class="work-info-cont app-flex space-between align-center">
                    <view class="left">
                        <view class="item1">营业时间：{{shopInfo.openTime}}-{{shopInfo.closeTime}}</view>
                        <view class="item2 app-ellipsis">地址：{{shopInfo.address}}</view>
                    </view>
                    <view class="right" @click="onCall">
                        <view class="app-flex-center">
                            <u-icon name="phone" size="26" color="#333" />
                        </view>
                        <view class="label">联系门店</view>
                    </view>
                </view>
            </view>
        </u-transition>
        
        <view class="scroll-wrap" :style="`top: ${isShowRefer ? referInfo.bottom+referInfo.gap : referInfo.bottom-referInfo.height}px; transition: all ${isInitial ? 0.3 : 0}s;`">
            <view class="nav-list">
                <scroll-view scroll-y class="scroll-cont" :scroll-top="cateScrollTop" scroll-with-animation>
                    <view class="item" :id="`cate${cateIndex}`" :class="{active: cateIndex == currCateIndex}" v-for="(cate, cateIndex) in cateList" @click="onChangeCate(cateIndex)">
                        <view class="img app-flex-center">
                            <!-- <app-img :src="`/static/booking/${cateIndex == 0 ? 'icon-hot' : 'icon-meat'+cateIndex%4}.png`" w="64" h="64"></app-img> -->
                            <app-img :src="cate.categoryImage" w="64" h="64"></app-img>
                        </view>
                        <view class="name">{{cate.categoryName}}</view>
                    </view>
                    <u-gap height="20rpx" />
                    <u-gap v-if="cartLen > 0" height="130rpx" />
                </scroll-view>
            </view>
            
            <view class="goods-list">
                <scroll-view scroll-y class="scroll-cont" @scroll="onRightScroll" :scroll-top="goodsScrollTop" scroll-with-animation>
                    <view class="goods-cate" v-for="(cate, cateIndex) in goodsList">
                        <view class="cate-title" :id="`title${cateIndex}`">{{cate.categoryName}}</view>
                        <view class="no-goods" v-if="!cate.gList || cate.gList.length === 0">该分类下暂无商品</view>
                        <view class="list" v-else>
                            <view class="good-item" v-for="(good, goodIndex) in cate.gList">
                                <app-img class="img" radius="8" @click="onGoodDetail(good)" :src="good.image" w="176" h="176"></app-img>
                                <view class="intro">
                                    <view class="name" @click="onGoodDetail(good)">{{good.title}}</view>
                                    <view class="m-price app-flex" @click="onGoodDetail(good)">
                                        <view class="left">臻会员价</view>
                                        <view class="right">￥{{good.vipPirce ?? '--'}}</view>
                                    </view>
                                    <view class="bottom app-flex align-center space-between">
                                        <view class="price app-flex">
                                            <text>￥</text>
                                            <view class="val">{{good.sellPrice}}</view>
                                        </view>
                                        
                                        <u-number-box :min="0" :value="good.num">
                                            <template #minus v-if="good.num > 0">
                                                <view class="minus" @click="updateCarNum(1, cateIndex, goodIndex, good)">
                                                    <u-icon name="minus-circle" color="#999" size="24"></u-icon>
                                                </view>
                                            </template>
                                            <template #input v-show="good.num > 0">
                                                <text class="amount">{{good.num || ''}}</text>
                                            </template>
                                            <template #plus>
                                                <view class="plus" @click="updateCarNum(0, cateIndex, goodIndex, good)">
                                                    <u-icon name="plus-circle-fill" color="#E6212B" size="24"></u-icon>
                                                </view>
                                            </template>
                                        </u-number-box>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                    <u-gap height="20rpx" />
                    <u-gap v-if="cartLen > 0" height="110rpx" />
                </scroll-view>
            </view>
        </view>
        
        <u-transition :show="cartLen > 0" mode="fade">
            <view class="cart-warp app-flex align-center">
                <view class="cart" @click="cartPopup.isShow = !cartPopup.isShow">
                    <view class="num">
                        <u-badge :value="cartLen" bgColor="#E6212B"></u-badge>
                    </view>
                    <app-img src="/static/booking/icon-cart.png" w="110" h="110"></app-img>
                </view>
                <view class="price app-flex app-flex-item">
                    <text>￥</text>
                    <view class="val">{{costAmount}}</view>
                </view>
                <view class="btn app-flex-center" @click="goPay">立即下单</view>
            </view>
        </u-transition>
        
        <u-popup :show="cartPopup.isShow" @close="closeCartPopup" zIndex="110" :safeAreaInsetBottom="false" overlayStyle="z-index: 100">
            <view class="cart-popup">
                <view class="title app-flex align-center space-between">
                    <view class="left">
                        <view class="main">{{shopInfo.storeName}}</view>
                        <view class="sub">已选{{cartLen}}件</view>
                    </view>
                    <view class="right app-flex-center" @click="clearTip.isShow = true">
                        <u-icon name="trash" size="18" color="#E6212B" />
                        <text>清空购物车</text>
                    </view>
                </view>
                <view class="list">
                    <view class="good-item" v-for="(good, goodIndex) in cartList">
                        <app-img class="img" radius="8" :src="good.image" w="136" h="136"></app-img>
                        <view class="intro">
                            <view class="name">{{good.title}}</view>
                            <!-- <view class="m-price app-flex">
                                <view class="left">臻会员价</view>
                                <view class="right">￥{{good.discountPrice ?? '--'}}</view>
                            </view> -->
                            <view class="bottom app-flex align-center space-between">
                                <view class="price app-flex">
                                    <text>￥</text>
                                    <view class="val">{{good.discountPrice}}</view>
                                </view>
                                
                                <u-number-box :min="0" :value="good.num">
                                    <template #minus v-if="good.num > 0">
                                        <view class="minus" @click="updateCarData(1, good)">
                                            <u-icon name="minus-circle" color="#999" size="24"></u-icon>
                                        </view>
                                    </template>
                                    <template #input v-show="good.num > 0">
                                        <text class="amount">{{good.num || ''}}</text>
                                    </template>
                                    <template #plus>
                                        <view class="plus" @click="updateCarData(0, good)">
                                            <u-icon name="plus-circle-fill" color="#E6212B" size="24"></u-icon>
                                        </view>
                                    </template>
                                </u-number-box>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </u-popup>
    </view>
    
    <app-goods-detail ref="detailRef" @closed="onDetailPopupClosed" @changed="onPopupCartChanged" />
    
    <u-modal
        asyncClose
        showCancelButton
        confirmColor="#E6212B"
        :show="clearTip.isShow"
        title="提示"
        :overlay="false"
        :content='clearTip.cont'
        @confirm="sureClear"
        @cancel="clearTip.isShow = false"
    />
</template>

<script setup>
import { reactive, ref, computed, watch, nextTick } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { userAppStore } from '@/store/app'
import * as api from '@/api/booking'

let appStore = userAppStore()
let shopInfo = appStore.shopInfo
let isInitial = ref(false)
let currCateIndex = ref(0)
let cateScrollTop = ref(0)
let goodsScrollTop = ref(0)
let referInfo = reactive({
    gap: 14,
    bottom: 0,
    height: 0,
})
let isShowRefer = ref(true)
let cateList = ref([])
let goodsList = ref([])
let isNotRunScroll = false
// let cateList = computed(() => {
//     return goodsList.value.map(item => ({ name: item.name }))
// })
let cartList = computed(() => {
    let list = []
    goodsList.value.forEach(cate => {
        cate.gList.forEach(good => {
            if (good.num > 0) {
                list.push({...good})
            }
        })
    })
    return list
})
let costAmount = computed(() => {
    let isVip = appStore.userInfo.memberGrade == 1
    let total = cartList.value.reduce((t, c) => {
        return t + c.num * c.discountPrice * 100
    }, 0)
    return (total / 100).toFixed(2)
})
let cartLen = computed(() => {
    return cartList.value.reduce((t, g) => {
        return t + g.num
    }, 0)
})
let detailRef = ref(null)
watch(currCateIndex, index => {
    let calTop = cateList.value[index].calTop
    console.log(calTop);
    if (calTop > 198) {
        cateScrollTop.value = calTop - 250
    } else if (calTop < 100) {
        cateScrollTop.value = 0
    }
})
let cartPopup = reactive({
    isShow: false,
    list: []
})
let clearTip = reactive({
    isShow: false,
    cont: '确认清空购物车吗？'
})

onShow(() => {
    if (appStore.hasLogin && goodsList.value.length) {
        updateCartData()
    }
})

initPage()

function initPage() {
    getListData(shopInfo.id)
    
    uni.createSelectorQuery().select('#reference').fields({
        size: true,
        rect: true,
    }, data => {
        referInfo.bottom = data.bottom
        referInfo.height = data.height
    }).exec()
}

function getListData(storeId) { // 原来叫getCateList
    api.getShopCate({storeId}).then(list => {
        if (list.length === 0) return
        
        cateList.value = JSON.parse(JSON.stringify(list))
        
        let pArr = []
        list.forEach((item, i) => {
            pArr.push(api.getGoods({ storeId, cateId: item.id }).then(gList => {
                gList.forEach(g => {
                    g.num = 0
                })
                item.gList = gList
            }))
        })
        
        Promise.all(pArr).then(() => {
            isInitial.value = true
            goodsList.value = list
            
            nextTick(() => {
                setTimeout(() => {
                    calTitleLoc()
                    calCateLoc()
                }, 500)
            })
            
            if (appStore.hasLogin) {
                updateCartData()
            }
        })
    })
}

async function updateCartData() {
    let cartList = await initCartList()
    goodsList.value.forEach((cate, cateIndex) => {
        cate.gList.forEach((good, goodIndex) => {
            let cartGood = cartList.find(cg => cg.spId == good.id)
            let indexData = `${cateIndex}-${goodIndex}`
            good.indexData = indexData
            good.num = cartGood ? cartGood.spNum : 0
        })
    })
}

function initCartList() {
    return new Promise((resolve, reject) => {
        api.cartGoods({storeId: shopInfo.id}).then(data => {
            resolve(data)
        })
    })
}

function calTitleLoc() {
    goodsList.value.forEach((item, index) => {
        let view = uni.createSelectorQuery().select(`#title${index}`)
        view.fields({
            size: true,
            rect: true,
        }, data => {
            // console.log(`top: ${data.top-referInfo.bottom-referInfo.gap} ||| bottom: ${data.bottom} ||| left: ${data.left} ||| height: ${data.height}`);
            item.calTop = index == 0 ? 0 : data.top-referInfo.bottom-referInfo.gap+6
            // if (data && data.height >= 0) {
            //     item.top = h
            //     h += data.height
            //     item.bottom = h
            // }
        }).exec()
    })
}

function calCateLoc() {
    cateList.value.forEach((item, index) => {
        let view = uni.createSelectorQuery().select(`#cate${index}`)
        view.fields({
            rect: true,
        }, data => {
            item.calTop = index == 0 ? 0 : data.top-referInfo.bottom-referInfo.gap-10
        }).exec()
    })
}

function onRightScroll(e) {
    let {scrollTop} = e.detail
    if (scrollTop > 10 && isShowRefer.value) {
        isShowRefer.value = false
    } else if (scrollTop <= 10 && !isShowRefer.value) {
        isShowRefer.value = true
    }
    
    if (isNotRunScroll) return
    let index = goodsList.value.findIndex(item => item.calTop > scrollTop)
    console.log(index);
    currCateIndex.value = index == 0 ? 0 : index - 1
}

function onChangeCate(index) {
    currCateIndex.value = index
    goodsScrollTop.value = goodsList.value[index].calTop
    
    isNotRunScroll = true
    setTimeout(() => {
        isNotRunScroll = false
    }, 500)
}

function goMap() {
    uni.openLocation({
        latitude: Number(shopInfo.latitude),
        longitude: Number(shopInfo.longitude),
        name: shopInfo.storeName,
        address: shopInfo.address
    })
}

function onCall() {
    uni.makePhoneCall({
    	phoneNumber: shopInfo.telephone
    })
}

function closeCartPopup() {
    cartPopup.isShow = false
}

// uni.getSystemInfo({
//     success(data) {
//         console.log(456, data);
//         console.log('windowHeight', data.windowHeight);
//         console.log('statusBarHeight', data.statusBarHeight);
//         console.log('screenTop', data.screenTop);
//         console.log('screenHeight', data.screenHeight);
//     }
// })

// getVideo().then(data => {
//     if (data?.length) {
//         list.value = data
//     }
// })

function onGoodDetail(info) {
    if (!appStore.hasLogin) {
        uni.showToast({
            title: '请先登录',
            icon: 'none'
        })
        setTimeout(() => {
            uni.switchTab({
                url: '/pages/mine/mine'
            })
        }, 600)
        return
    }
    
    uni.hideTabBar()
    detailRef.value.open(info.id)
}

function onDetailPopupClosed() {
    uni.showTabBar()
}

function onPopupCartChanged(id, num) {
    updateCartData()
}

function goPay() {
    uni.navigateTo({
        url: `./pay?storeId=${shopInfo.id}`
    })
}
function updateCarData(type, row) {
    console.log(type, row);
    let indexArr = row.indexData.split('-')
    updateCarNum(type, indexArr[0], indexArr[1], row)
}
function updateCarNum(type, cateIndex, goodIndex, row) {
    if (!appStore.hasLogin) {
        uni.showToast({
            title: '请先登录',
            icon: 'none'
        })
        setTimeout(() => {
            uni.switchTab({
                url: '/pages/mine/mine'
            })
        }, 600)
        return
    }
    
    let isAdd = type !== 1
    
    api[isAdd ? 'addCart' : 'deductCart']({spId: row.id, storeId: shopInfo.id, spNum: 1}).then(() => {
        // row.num = isAdd ? ++row.num : --row.num
        // api.cartNum({storeId: shopInfo.id}) 查看数量
        goodsList.value[cateIndex].gList[goodIndex].num = isAdd ? ++row.num : --row.num
    })
}

function sureClear() {
    api.clearCart({storeId: shopInfo.id}).then(() => {
        cartList.value.forEach(item => {
            clearTip.isShow = false
            cartPopup.isShow = false
            let indexArr = item.indexData.split('-')
            goodsList.value[indexArr[0]].gList[indexArr[1]].num = 0
        })
    })
}
</script>

<style lang="scss">
    page {
        // background: #f7f8fa;
    }
</style>
<style scoped lang="scss">
    .detail-popup {
        position: relative;
        .close {
            position: absolute;
            top: 20rpx;
            right: 0;
            z-index: 1;
            width: 200rpx;
            height: 60rpx;
            // border: solid 1px red;
        }
    }
    .page-wrap {
        .cart-popup {
            padding-bottom: 110rpx;
            .title {
                padding: 20rpx 30rpx;
                .left {
                    .main {
                        font-size: 30rpx;
                    }
                    .sub {
                        color: #bbb;
                        font-size: 26rpx;
                    }
                }
                .right {
                    padding: 20rpx 10rpx;
                    margin-right: -10rpx;
                    text {
                        color: #E6212B;
                        font-size: 28rpx;
                        margin-left: 4rpx;
                    }
                }
            }
            .list {
                padding: 24rpx 30rpx 10rpx;
                border-top: solid 1px #eee;
                max-height: 50vh;
                overflow-y: scroll;
                .good-item {
                    min-height: 160rpx; // 136+24
                }
                .intro {
                    padding-left: 160rpx;
                }
            }
        }
        .info-wrap {
            position: relative;
            padding: 24rpx 30rpx;
            background: #fff;
            z-index: 10;
            .shop-info {
                .name {
                    font-size: 30rpx;
                    padding-left: 16rpx;
                }
                .icon {
                    position: relative;
                    top: 4rpx;
                }
            }
            .doc-info {
                padding-top: 16rpx;
                padding-left: 2rpx;
                text {
                    color: #939393;
                    font-size: 28rpx;
                    margin-left: 14rpx;
                }
            }
        }
        .work-info {
            position: relative;
            margin: 0rpx 30rpx 0;
            .work-info-cont {
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                padding: 0 20rpx;
                .left {
                    max-width: 500rpx;
                }
                .item1 {
                    font-size: 26rpx;
                }
                .item2 {
                    font-size: 24rpx;
                    padding-top: 10rpx;
                }
                .label {
                    font-size: 24rpx;
                }
            }
        }
        .scroll-wrap {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: #fff;
            .scroll-cont {
                height: 100%;
            }
        }
        .nav-list {
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            min-width: 160rpx;
            background: #F6F6F6;
            padding-top: 10px;
            .item {
                padding: 20rpx 0;
                &.active {
                    .name {
                        color: #E6212B;
                        font-weight: bold;
                    }
                }
                .name {
                    font-size: 28rpx;
                    text-align: center;
                    padding-top: 10rpx;
                }
            }
        }
        .goods-list {
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            width: 564rpx;
            padding-right: 24rpx;
            .cate-title {
                padding: 30rpx 0;
                font-size: 32rpx;
            }
            .no-goods {
                color: #666;
                font-size: 28rpx;
                text-align: center;
            }
            .goods-cate:first-child .cate-title {
                padding-top: 10rpx;
            }
        }
        
        .good-item {
            position: relative;
            min-height: 200rpx; // 176+24
            &:not(:last-child) {
                // padding-bottom: 24rpx;
                margin-bottom: 24rpx;
                border-bottom: solid 1px #F7F8FA;
            }
            
            .img {
                position: absolute;
                left: 0;
                top: 0;
            }
            .intro {
                padding-left: 196rpx;
                .name {
                    font-size: 30rpx;
                    min-height: 40rpx;
                    padding-top: 4rpx;
                }
                .m-price {
                    overflow: hidden;
                    border-radius: 8rpx;
                    margin-top: 10rpx;
                    .left {
                        color: #EBFF00;
                        background: #000000;
                        font-size: 24rpx;
                        padding: 4rpx 10rpx;
                    }
                    .right {
                        color: #E6212B;
                        background: #F7F8FA;
                        font-size: 28rpx;
                        padding: 2rpx 10rpx 0 6rpx
                    }
                }
                .bottom {
                    margin-top: 10rpx;
                    .price {
                        align-items: baseline;
                        text {
                            font-size: 24rpx;
                        }
                        .val {
                            font-size: 32rpx;
                        }
                    }
                    .amount {
                        min-width: 60rpx;
                        text-align: center;
                    }
                }
            }
        }
        
        .cart-warp {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 120;
            height: 110rpx;
            background: #F6F6F6;
            .cart {
                position: relative;
                margin-left: 24rpx;
                top: -24rpx;
                .num {
                    position: absolute;
                    top: 0;
                    right: 0;
                    z-index: 1;
                }
            }
            .price {
                align-items: baseline;
                padding-left: 30rpx;
                margin-bottom: 6rpx;
                text {
                    font-size: 24rpx;
                }
                .val {
                    font-size: 34rpx;
                }
            }
            .btn {
                width: 222rpx;
                height: 100%;
                color: #fff;
                background: #E6212B;
            }
        }
    }
</style>