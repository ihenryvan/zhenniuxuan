<template>
    <view class="page-wrap">
        <app-navbar title=" " />

        <app-img src="/static/index/top-bg.png" w="750" h="678"></app-img>

        <view class="page-cont">
            <app-img :src="imgPath" w="686" h="890" radius="16"></app-img>

            <view class="btn">
                <app-img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAAXNSR0IArs4c6QAAA4dJREFUWEftmE+IVlUYxn8PtHDRoiDBRQsHClwoJtROKGmGBJUUdBFtDAJnIejQCEVFQYIDOqAY1C7BZUUTTZiUMEJLQRcDCgbOokWgoAsXLoI3HngvXIa59557vxli4DvL7zv3vr/z3PfvEZtsaZPxMgbe6C82Vnis8CoFRnaJiHgOeBOYBF4HXgFeAP4CpiQ9WU/VBwNHxPPAR8BxYHsD1ISkleq/iNgm6Z9RDjAIOCIOAN8CL9eMW8k/gWXgEbAi6cca7KfAWeCCpDNDoXsDR8Q54OOawSVDANcl/dsEEhGXgZP5/0VJM0OgewFHxPfA0TT0t91B0o0SwxGxBfgJ2D8KdDFwRHwFfJbG/gCO9Q2o9YAuAo6Id4GFhP0NOCLpWYmy9T0RsRt4C5gDrLhXL/foBE5V7meAOeL3DFD2feDLTHlrnXOfJMdC5yoBPmUV8k2TpT7r/Zn6rgKHayQOTKe2KkAtwiFJTztpob1by6LwINVdkHSk5KUJ609+LV3APznd2RV+LoVby1arwhHxNuAA89ov6XoP4G+A6dz/NTDTlvZK39sFXOVcF4WtpQYj4jXgdkJckfRBKVDXvi7g37NH6OsO32XJdsVzeS7yzy5Y/98FbP91n9CrnEbE42yA+j63I0t6Y8rsAq4Mz0qaL1EgInxAH9TL0b9Y+Jz7E+9dlrSr6ZmNAK777xuSbhUCu/NzT/JE0otDgSuXmJP0SaHhOrCLzJ3C584Ds+kSE0OBq6BblHSo0PBQ4F+Ag06jkqaGAvdOaxHhacMHdeGwS3T2HFmgHmagtn7NLh+uF46Dkn4tUbnvnoh4B3BT5dVa/ruAPa+58XHkL0na1xemZH9EuE92v+Ee23m7cRAoaX6+yE6r8/QlcKv3rCr/pyVdantPCbCHzbvZAFmBXX3byyaA9HeXcH9Bv/vVLp/vBLaxHDqrAuBmyAWhM5jalFpj+iiKkSLghK4Pnw6Q94Yqncp6PvRdhtdZSZ+XuFQxcELXh1A33h/2aejzHc48V2pXBD9IOlYC6z29gNNgfRj1T571fEdxoym6M886dbmSeaarVnEFrR7oDVzz6aaLlHs5AnnrS8BOYG8WhcquA2x6SF4fBJzQrmQnUrX6DVDb17Ub2R3mh/bIg4ErqpbLQG/xpOJLQXdszi43S6eWplOPDFwaLOu1bwy8XkqOXWKjlRwr/H8p/B9UOV08TEFl7AAAAABJRU5ErkJggg=="
                    w="48" h="48"></app-img>
                <text>转发</text>
                <button open-type="share"></button>
            </view>
        </view>
    </view>
</template>

<script setup>
    // import { ref, reactive } from 'vue'
    // import { onLoad, onShareAppMessage } from '@dcloudio/uni-app'

    // let imgName = ref('')
    // let imgPath = ref('')

    // onLoad(param => {
    //     imgName.value = param.name
    //     imgPath.value = param.path
    // })
</script>
<script>
    import config from '@/config'
    
    export default {
        onShareAppMessage(res) {
            return {
                title: this.imgName,
                // path: `/pages/index/share?name=${this.imgName}&path=${this.imgPath}`,
                imageUrl: `${config.IMAGE_URL}/${this.imgPath}`,
                // desc: this.imgName,
                success() {
                    uni.showToast({
                        icon: 'none',
                        title: '分享成功'
                    })
                }
            };
        },
        onLoad(param) {
            this.imgName = param.name
            this.imgPath = param.path
        },
        data() {
            return {
                imgName: '',
                imgPath: ''
            }
        }
    }
</script>

<style lang="scss">
    page {
        background: #f7f8fa;
    }
</style>
<style scoped lang="scss">
    .page-cont {
        position: relative;
        margin-top: -276rpx;
        padding: 0 32rpx;

        .btn {
            position: relative;
            background: #3A8F96;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 32rpx;
            color: #fff;
            height: 88rpx;
            border-radius: 16rpx;
            margin-top: 30rpx;
            
            button {
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                top: 0;
                z-index: 1;
                background: transparent;
            }
        }
    }
</style>