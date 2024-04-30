import { defineStore } from 'pinia'
import { orderList } from '@/api/order'

export const userAppStore = defineStore('app', {
    state: () => {
        return {
            hasLogin: false,
            userInfo: {},
            payOrderNum: 0,
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
        },
        
        updatePayOrderNum() {
            // orderList({pageNum: 1, pageSize: 100}).then(data => {
            //     if (data.total > 0) {
            //         let num = data.rows.filter(item => ['paid', 'verified', 'complete'].includes(item.orderStatus)).length
            //         if (num == 0) return
            //         this.payOrderNum = num
            //     }
            // })
        }
    },
});