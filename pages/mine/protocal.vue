<template>
    <view class="page-wrap">
        <!-- <u-navbar bgColor="#fff" :title="title" :auto-back="true" :placeholder="true" /> -->
        <view class="page-cont">
            <web-view :src="config.REQUEST_URL+url"></web-view>
        </view>
    </view>
</template>

<script setup>
    import { ref } from 'vue'
    import { onLoad } from '@dcloudio/uni-app'
    import config from '@/config'
    
    let url = ref('')
    let title = ref('')
    onLoad(option => {
        url.value = option.url
        title.value = option.title
    })
</script>

<style lang="scss">
    page {
        background: #f7f8fa;
    }
</style>
<style scoped lang="scss">
    .page-cont {
        position: relative;
        margin-top: -376rpx;
        
        .center {
            display: flex;
            justify-content: center;
        }
        .gap {
            margin-top: 36rpx;
        }
        
        
        .name {
            font-size: 36rpx;
            font-weight: bold;
        }
        .co {
            font-size: 32rpx;
        }
        .copy {
            font-size: 28rpx;
            color: #999;
        }
    }
</style>