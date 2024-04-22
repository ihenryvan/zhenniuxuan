<template>
	<u-navbar
        leftText="返回"
        bgColor="transparent"
        :title="title"
        :safeAreaInsetTop="true"
        :autoBack="false"
        @leftClick="onLeftClick"
    >
        <template #left>
            <view
                class="u-nav-slot"
            >
                <app-img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAABAxJREFUaEPdWk1IVFEU/s7ORYsWCkYOjNBQixYGCUoLg1wIIzQLF0VCSQUuWhgFBQk6MAMGiUmBQYUGgS1aJNhCRHIRKCTUooVR4ERChTMQ5MKFcOIb3pvejDO+/6d1V8PMveec7/zee84IAliq2gTgDICTAI4DiAOoB3DAIL8J4AeAdQAfASwDeCsiX/2yF68EVPUggMsAzhmCeyFFIC8BPBORvBcCrgGo6mEAwwB6AdR5YVrlzBaARwBGROSnG5qOAagqhb0BYDBAwStlJZARAHdFhJ9tlyMAqnrUMDX9O4r1ga4pIp/smNkCUNWzAF6EqPVaMtICPSLyejcQuwJQVbrMPTsthPz7TREZrcWjJoB9Irwpd00QVQGoahLAbMiadUs+JSIzlYd2ADAClkEUVIp0K+huMdFSGdhlAIxUuQSgJSiuAdNhFW+1pthKAENGkQqYb6DkBkUka1IsAVDVRgBr+9B1qhW7hIjwXgUrgDEAA4HqKjxiT0TkagmAqvLm+M2P9jOZDLLZLOLxOKanp9HSEmoYscgdEpFfRQv4zfm5XA7Nzc0lfSeTSczOhp6Fi7XBBMDM0+bV4lNTU+jr6ysd7+zsxPz8vFdyTs+tiEirqCofHwxezyuVSmFm5m+NGRoawvAwb9yhrxgBXADw3CurfD6PWCyGra2/t9+lpSW0tXk2qBtRLhHAAwDX3Jyy7qWm0+l06SsG8dqaL4O6EeUhAbwBcNrNKXPv+vo6EolEmfbHxsYwMBBZNl4kgM8AjrgFsL29ja6uLiwsLJSONjY2FrVfVxfZNSpHAL8t3QPHOKjl8fHxsv0TExPo7+93TCOAjZsEoG4Ira6uFl1kbm6u7FhHRwcWFxfdkApkr2MALEzM9cw6Ya76+npMTk6iu7vbERvHLkTChULBEVG/m8hrY2PDCZmiCzHnsZjtuhoaGkLXvimACwBfHKfRfepCxTTqq5DZWS7k34uF7CKAqZAZhUW+lwDYWeZb4F9ccfM6/c5Hh3mvgC+LSHsgD5o9QlD2oGGv/7ufJ2XEIHh3bxKRgvVR/xjAlYgF8cruvohc52ErAAYzb6aRXSU9Sk/tx81BSGVj6w6AjEfCUR0bFpHSC6paa5EZKapBhlvQ7Nm212wtkpqqHgPwfh+6El3nhIisWlHXaq9zKvPKrXpC3t9dbVrzfw44TE367dgFZBFvIyYLCE5rOIyOOr3S5zmp3DGVsY2BSs0ZgT0d4eCD2eZ8ZcBWs6jtmNViCVrgFoDbIVqDWmcdGg100G1FbgxCCIT9k6DcioKzvZk2BxdO48exBaq4FWcKfAz1+OhsrxhD9Kfs9TsV2nUM2BE2OtynDCCs4rxXcWRl/bsN+zE54+82FHzBrbaryfEHAH9xTd1am/kAAAAASUVORK5CYII=" w="48" h="48"></app-img>
            </view>
      </template>
</u-navbar>
</template>
<script>
	export default {
		name: "AppNavBar",
		props: {
            title: {
				type: String,
				default: '标题',
			},
		},
		data() {
			return {
			}
		},
        computed: {
        },
		methods: {
			parseVal(val) {
				const valNum = parseFloat(val)
				return String(valNum) === (val+'') ? (val + 'rpx') : val
			},
            onLeftClick() {
                let pages = getCurrentPages()
                if (pages.length == 1) {
                    uni.redirectTo({
                        url: '/pages/layout/layout'
                    })
                } else {
                    uni.navigateBack()
                }
            }
		}
	}
</script>

<style lang="scss" scoped>
	.image-wrap {
	}
</style>
