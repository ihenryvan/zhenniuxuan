<template>
    <u-navbar bgColor="#fff" title="设置" :auto-back="true" :placeholder="true" />
    <view class="page-wrap">
        <app-img src="/static/mine/member.png" w="750" h="760"></app-img>
    </view>
    
</template>

<script setup>
import { reactive, ref } from 'vue'
import { getVideo } from '@/api/photo'

let popup = reactive({
    show: false,
})

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
        padding-top: 30rpx;
        background: #fff;
    }
</style>