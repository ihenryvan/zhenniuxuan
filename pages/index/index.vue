<template>
    <view class="page-wrap">
        <app-img src="/static/index/top-bg.png" w="750" h="678"></app-img>
        
        <view class="list">
            <view class="item" v-for="item in list" @click="onPreview(item)">
                <view class="item-title">{{item.imageName}}</view>
                <app-img :src="item.imageUrl" w="328" h="428" radius="16"></app-img>
            </view>
        </view>
        
        <view class="contact" @click="onCall">
            <app-img src="/static/index/contact.png" w="717" h="130"></app-img>
            <text>此刻团队：{{phone}} , 现场3D拍摄、视频制作</text>
        </view>
    </view>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { getIndexList } from '@/api/index'

let phone = ref('15338841454')
let popup = reactive({
    show: false,
})
let list = ref([])

getIndexList().then(data => {
    if (data?.length) {
        list.value = data
    }
})

function onPreview(data) {
    // popup.show = true
    uni.navigateTo({
        url: `/pages/index/share?name=${data.imageName}&path=${data.imageUrl}`
    })
}

function onCall() {
    uni.makePhoneCall({
    	phoneNumber: phone.value
    });
}
</script>

<style lang="scss">
    page {
        background: #f7f8fa;
    }
</style>
<style scoped lang="scss">
    .page-wrap {
        .list {
            display: grid;
            gap: 30rpx;
            grid-template-columns: repeat(2, 328rpx);
            padding-left: 32rpx;
            margin-top: -280rpx;
            .item {
                position: relative;
            }
            .item-title {
                position: absolute;
                left: -14rpx;
                top: 14rpx;
                z-index: 1;
                padding: 10rpx 20rpx;
                max-width: 98%;
                // background: black;
                background: linear-gradient( 146deg, #EFFFE8 0%, #D0E6FF 100%);
                color: #2697FF;
                border-radius: 34rpx 12rpx 34rpx 0rpx;
                &::after {
                    position: absolute;
                    left: 4rpx;
                    bottom: -12rpx;
                    content: '';
                    z-index: 1;
                    border: solid 12rpx transparent;
                    // border-color: transparent transparent red transparent;
                    border-color: transparent transparent #4893B6 transparent;
                    transform: rotate(45deg);
                }
            }
        }
        
        .contact {
            position: relative;
            margin: 30rpx 0 0 20rpx;
            text {
                position: absolute;
                left: 0rpx;
                right: 0rpx;
                top: 60rpx;
                font-size: 26rpx;
                text-align: center;
            }
        }
    }
</style>