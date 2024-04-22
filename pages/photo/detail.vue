<template>
    <view class="page-wrap">
        <app-navbar title=" " />
        
        <app-img src="/static/index/top-bg.png" w="750" h="678"></app-img>
        
        <view class="page-cont" v-if="info.videoUrl">
            <!-- <app-img src="https://p.qqan.com/up/2024-2/17070166557261213.jpg" w="686" h="890" radius="16"></app-img> -->
            <video id="myVideo" :src="`${config.IMAGE_URL}/${info.videoUrl}`"></video>
            <view class="btn" v-if="type == 1">
                <app-img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAAAXNSR0IArs4c6QAAA4dJREFUWEftmE+IVlUYxn8PtHDRoiDBRQsHClwoJtROKGmGBJUUdBFtDAJnIejQCEVFQYIDOqAY1C7BZUUTTZiUMEJLQRcDCgbOokWgoAsXLoI3HngvXIa59557vxli4DvL7zv3vr/z3PfvEZtsaZPxMgbe6C82Vnis8CoFRnaJiHgOeBOYBF4HXgFeAP4CpiQ9WU/VBwNHxPPAR8BxYHsD1ISkleq/iNgm6Z9RDjAIOCIOAN8CL9eMW8k/gWXgEbAi6cca7KfAWeCCpDNDoXsDR8Q54OOawSVDANcl/dsEEhGXgZP5/0VJM0OgewFHxPfA0TT0t91B0o0SwxGxBfgJ2D8KdDFwRHwFfJbG/gCO9Q2o9YAuAo6Id4GFhP0NOCLpWYmy9T0RsRt4C5gDrLhXL/foBE5V7meAOeL3DFD2feDLTHlrnXOfJMdC5yoBPmUV8k2TpT7r/Zn6rgKHayQOTKe2KkAtwiFJTztpob1by6LwINVdkHSk5KUJ609+LV3APznd2RV+LoVby1arwhHxNuAA89ov6XoP4G+A6dz/NTDTlvZK39sFXOVcF4WtpQYj4jXgdkJckfRBKVDXvi7g37NH6OsO32XJdsVzeS7yzy5Y/98FbP91n9CrnEbE42yA+j63I0t6Y8rsAq4Mz0qaL1EgInxAH9TL0b9Y+Jz7E+9dlrSr6ZmNAK777xuSbhUCu/NzT/JE0otDgSuXmJP0SaHhOrCLzJ3C584Ds+kSE0OBq6BblHSo0PBQ4F+Ag06jkqaGAvdOaxHhacMHdeGwS3T2HFmgHmagtn7NLh+uF46Dkn4tUbnvnoh4B3BT5dVa/ruAPa+58XHkL0na1xemZH9EuE92v+Ee23m7cRAoaX6+yE6r8/QlcKv3rCr/pyVdantPCbCHzbvZAFmBXX3byyaA9HeXcH9Bv/vVLp/vBLaxHDqrAuBmyAWhM5jalFpj+iiKkSLghK4Pnw6Q94Yqncp6PvRdhtdZSZ+XuFQxcELXh1A33h/2aejzHc48V2pXBD9IOlYC6z29gNNgfRj1T571fEdxoym6M886dbmSeaarVnEFrR7oDVzz6aaLlHs5AnnrS8BOYG8WhcquA2x6SF4fBJzQrmQnUrX6DVDb17Ub2R3mh/bIg4ErqpbLQG/xpOJLQXdszi43S6eWplOPDFwaLOu1bwy8XkqOXWKjlRwr/H8p/B9UOV08TEFl7AAAAABJRU5ErkJggg==" w="48" h="48"></app-img>
                <text>转发</text>
                <button open-type="share"></button>
            </view>
        </view>
    </view>
</template>

<script setup>
// import { reactive } from 'vue'
// import { onLoad } from '@dcloudio/uni-app'
// import { videoDetail, transmitVideo } from '@/api/photo'

// onLoad(param => {
//     console.log(123, param.id);
// })

</script>
<script>
    import config from '@/config'
    import { getVideo, videoDetail, transmitVideo } from '@/api/photo'
    
    export default {
        onShareAppMessage(res) {
            return {
                title: this.info.videoName,
                path: `/pages/photo/detail?no=${this.info.videoNo}`,
                // imageUrl: `${config.IMAGE_URL}/${this.imgPath}`,
                desc: '',
                success() {
                    uni.showToast({
                        icon: 'none',
                        title: '分享成功'
                    })
                }
            };
        },
        onLoad(param) {
            let no = param.no
            this[no ? 'getInfo' : 'getVideo'](no)
            this.type = no ? 1 : 2
        },
        data() {
            return {
                no: '',
                type: 0,
                info: {},
            }
        },
        methods: {
            // 我的
            getVideo() {
                getVideo({videoType: 'model'}).then(data => {
                    if (data?.length) {
                        this.info = data[0]
                    }
                })
            },
            // 详情
            getInfo(videoNo) {
                videoDetail({videoNo}).then(data => {
                    this.info = data
                })
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
        video {
            width: 100%;
        }
        .btn {
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