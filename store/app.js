import { defineStore } from 'pinia'

export const userAppStore = defineStore('app', {
    state: () => {
        return {
            hasLogin: false,
            userInfo: {}
        }
    },
    actions: {
        storeUserInfo(info) {
            this.hasLogin = true
            this.userInfo = info
            uni.setStorageSync('userInfo', info)
        },
    },
});