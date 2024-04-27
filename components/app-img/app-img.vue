<template>
	<view class="image-wrap" :style="customStyleObj" @click="onClick">
        <u-image
            :src="fullSrc"
            :width="parseVal(w)"
            :height="parseVal(h)"
            :radius="radiusVal"
            :mode="mode"
            :fade="fade" />
	</view>
</template>
<script>
    import config from '@/config'
    
	export default {
		name: "AppAvatar",
		props: {
            type: {
                type: String,
                default: 'normal' // avatar
            },
			w: {
				type: [String, Number],
				required: true
			},
			h: {
				type: [String, Number],
			},
			src: {
				type: String,
				default: ''
			},
            radius: {
				type: String,
				default: '0'
			},
            mode: {
				type: String,
				default: 'aspectFill',
			},
            fade: {
				type: Boolean,
				default: true,
			},
            margin: {
                type: String,
                default: '0 0',
            },
			isStaff: { // 企业员工
				type: Boolean,
				default: false,
			},
			isServicer: { // 客服
				type: Boolean,
				default: false,
			},
            customStyle: {
                type: Object,
                default() {
                    return {}
                }
            }
		},
		data() {
			return {
			}
		},
        computed: {
            customStyleObj() {
                return {
                    width: this.parseVal(this.w),
                    height: this.parseVal(this.h),
                    margin: this.margin,
                    backgroundColor: this.isServicer ? '#019FE6' : '',
                    borderRadius: this.radiusVal,
                    ...this.customStyle
                }
            },
            
            fullSrc() {
                let src = this.src
                if (this.type === 'avatar' && !src) {
                    return '/static/common/default-avatar.png'
                }
                return (
                    !src ? '' : (src.startsWith('http') || src.startsWith('data') || src.indexOf('static/') > 0) ? src : `${config.IMAGE_URL}/${src}`
                )
            },
            
            radiusVal() {
                if (this.type === 'avatar' && parseInt(this.radius) === 0) {
                    return '50%'
                }
                return this.parseVal(this.radius)
            },
        },
		methods: {
			onClick() {
				console.log(this.src);
				console.log(this.fullSrc);
                this.$emit('click')
			},
			
			parseVal(val) {
				const valNum = parseFloat(val)
				return String(valNum) === (val+'') ? (val + 'rpx') : val
			}
		}
	}
</script>

<style lang="scss" scoped>
	.image-wrap {
		display: flex;
		align-items: center;
		justify-content: center;
        overflow: hidden;
	}
</style>
