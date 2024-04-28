<template>
    <u-navbar bgColor="#fff" title="设置" :auto-back="true" :placeholder="true" />
    <view class="page-wrap">
        <view class="list">
            <!-- <view class="item" v-for="(item,idx) in addressList" :key="item.id" @click="select(item)"> -->
            <view class="item" v-for="(item,idx) in 3" :key="item.id" @click="select(item)">
                <view class="app-flex item-top">
                    <view class="app-flex-item info">
                        <view class="app-flex" style="align-items: flex-end;">
                            <view class="name">{{item.linkName || '艾弗森地方'}}</view>
                            <view class="phone">{{item.mobile || '15522232111'}}</view>
                        </view>
                        <view class="address">{{item.areaAddress}}{{item.addressDetail}}打发打发是的</view>
                    </view>
                    <!-- <view class="app-flex-center select">
                        <u-icon name="checkbox-mark" size="20" color="#007AB5" v-if="item.isSelected" />
                    </view> -->
                </view>
        
                <view class="app-flex space-between item-bottom" v-if="type != 'select'">
                    <view class="app-flex-item">
                        <view class="app-flex set-default" :class="{'is-default': item.isDefault}">
                            <u-icon size="18" :name="`checkmark-circle${item.isDefault == 1 ? '-fill' : '-fill'}`"
                                :color="item.isDefault || true ? '#E6212B' : '#E6212B'" />
                            <text>{{item.isDefault ? '默认地址' : '默认地址'}}</text>
                        </view>
                    </view>
                    <view class="app-flex action-panel">
                        <view class="app-flex-center edit" @click="edit(item)">
                            <u-icon name="edit-pen" size="20" color="#939393" />
                            <text>编辑</text>
                        </view>
                        <view class="app-flex-center del" @click="del(item,idx)">
                            <u-icon name="trash" size="20" color="#939393" />
                            <text>删除</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
    
</template>

<script setup>
import { reactive, ref } from 'vue'

let popup = reactive({
    show: false,
})

let addressList = ref([])

function updateCarNum(e) {
    let indexArr = e.name.split('-')
    let val = e.value
    
    // goodsList.value[indexArr[0]].list[indexArr[1]].num = val
}

function onPreview(no) {
    // popup.show = true
    uni.navigateTo({
        url: `/pages/photo/detail?no=${no}`
    })
}
</script>

<style lang="scss">
    page {
        background: #f7f8fa;
    }
</style>
<style scoped lang="scss">
    .page-wrap {
        // padding-top: 30rpx;
        .list {
            padding: 24rpx;
        }
        
        .item {
            background: #fff;
            border-radius: 10rpx;
            padding: 22rpx;
            margin-bottom: 24rpx;
        
            .item-top {
                padding-bottom: 16rpx;
                border-bottom: solid 1px #F8F8F8;
        
                .name {
                    color: #0F0F0F;
                    font-size: 32rpx;
                }
        
                .phone {
                    color: #939393;
                    font-size: 26rpx;
                    padding-left: 10rpx;
                }
        
                .address {
                    color: #939393;
                    font-size: 24rpx;
                    padding-top: 8rpx;
                }
        
                .select {
                    min-width: 70rpx;
                    padding-left: 20rpx;
                }
            }
        
            .item-bottom {
                padding-top: 16rpx;
        
                .set-default {
                    &.is-default {
                        // color: $app-theme-color;
                    }
        
                    text {
                        color: #939393;
                        font-size: 26rpx;
                        padding-left: 10rpx;
                    }
                }
        
                .action-panel {
                    color: #939393;
                    font-size: 26rpx;
        
                    .del {
                        margin-left: 20rpx;
                    }
                }
            }
        }
    }
</style>