import { defineStore } from 'pinia'

export const userAppStore = defineStore('app', {
    state: () => {
        return {
            hasLogin: false,
            userInfo: {},
            shopInfo: {
                id: '',
                storeName: '45店铺'
            }
        }
    },
    actions: {
        storeUserInfo(info) {
            this.hasLogin = true
            this.userInfo = info
            uni.setStorageSync('userInfo', info)
        },
        
        storeShopInfo(info) {
            this.shopInfo = info
        }
        
    },
});