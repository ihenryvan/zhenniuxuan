<template>
    <view class="layout-cont">
        <index v-if="tabIndex == 0" />
        <photo v-else-if="tabIndex == 1" />
        <mine v-else-if="tabIndex == 2" />
    </view>
    
    <u-tabbar
    	:value="tabIndex"
    	@change="onChange"
    	:fixed="true"
    	:placeholder="true"
        :border="false"
    	activeColor="#182D46"
        inactiveColor="#BAC3CD"
    >
    	<u-tabbar-item text="首页">
    		<template #active-icon>
    			<app-img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAABStJREFUaEPtWl1oXEUU/s7MzdZoE0zz3yZooG3SNmu6SYwiIlWqfYg02ipWELqL/6hYtfhb/GkTohUNBmNbbVGh/tTWx0A1ir5IWqxE8cE+KKQQ2o31QYypouLImTuzuVnvJnc3e6OBnYfc3Jm5d77vnPOdc3IJYYEPWuD4ESaBCwH0AXAA3Ang9zCMFRaBywAcBLDcgB4FsAXA8XyTyDcBtvYjALqN5b142QM8/wKAv/JFJJ8Elhmrr5sF3OcA4gBO5YNEvgh0GvAc90HGTwDuAfBhkM0z7ZkrgfOMUBmM33jVhFKm9b0AHpqLwOdCoAXA+wCafJCzhTlMBs1aFwAGW+Oz96QR+De5eCNXAlao7IH0cdSkzbG0hToAbwJY7/MMC3w7gIFsSWRLoBrAfgDX+xzEmeVxAK/MkmVmIr8DQE82JLIhsMGAZ0umj+8B3JZFnm8DcATAxZ4Xca24FACHX+ARhACHyS7jYr8XvwXgAQC/Bj7V3cjv3WO0wiHE6TfrQjcbgUYj1LU+4H42qfBQlsDTt98CgNPvvrQFFvwbALYB+CHTGTMR2Goyh59QjwG4GUC6UOfIZdrjQ0bw7J37ARzwe3kmAocB3JRBqM8DeC6f7YDPOU+ZtsO7xCn71vS9mQgon5eytbkh+yKfZvZ5F3v8W08j6N3yL7xBCXDG4JaY434+BmuCa8YNaYflTOBqANyEzefgrPRZgYCxQMEDOcReIYS8RiuEUCGEXAvkVgeu27df1XZ0QEgBIQQJ6SghBZGUSjgSQko9T9JRkucdvQ5B5ndHggTfE2yJN0iIgPhOord9PJQ/Ea9/ba+qbWs3wAxgTUYS8VUD9hBxZOqezLyUgklo0saUpAAlgEToBK7pH1A1be1wwbAHpgBaD5DQa/hzchLnxpMkFy1CaX29ipSUQHuFn7VEhQDY9gDmhcC6vn5V3drqhorU4UAaDFvUcdS55Bl89967NPrpJ/jl1PTPPUx8RWcniisrVfLEl5g4fRpbBgfdd5Ee4YfQVbtfRnUsBje2pfGEG/ds9fGvR9TR2xOz/XGUCvNNhz5QjV0btWbIkYmesDVwZe+LqFwbc+OaRastL5WUDrQGhMRHd99B41+dCJQtq6JRbB0etjpJ9EYi4Yr4iu5eVLYwATFlfVcPIOno648jIzR0712BCPCmroPvYGXXRkVEid2LF4dL4PJnu1FxSYuOeR1CRRz/xhs6hZKeH+7ZhZKly1C2YiWU+htnjh9To0Mf0x8TE5oYC7sm1oqGazeops03Uml9PUg48ZfKSsMl0LFjpyqPNmuQVrx85TTvTaEmS0FyejWplOd+O3sWMhLBBRXlxFetJZsIiBJ9VRXhEmh/4mlV3hx1M5AtZlycuKBZIJxeuVhpYiZLTWmGnzOZy3rOhKNwEv21VeESiD36JMrXRN3qarOQF6QuUAa8lJCpyqzBTpE0addWdO0xIeMDF9WFS6Dl4cfUktXNbqyz+21rYOsCg7bgNDFTL6RU7rwGClFkwk7rx3ivSMT3NDSESyD64HYsaVplY5cPT6VS2wdZfWhPGA+kCp/tjew8h1lK/E789cbl4RJYc982Vda0ejpo31ByPeTpf9wWQsrUHBPk+sGOMWvxA82rwiVw/tI6OMXFIO5fiNw2xv2R+p2409XLZo97r3hCz+lH7PP6nmsATYyNnZwcTyZ9Cgh/Wkn/pJlbOx24OoW/sUAgfBvPfEJgDzzzXyPNcD5/VJ42ArfA/1NCof6vxLxwXvAe+AdkZEhAT5ctJwAAAABJRU5ErkJggg==" w="48" h="48"></app-img>
    		</template>
    		<template #inactive-icon>
    			<app-img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAA4xJREFUaEPtmU1oE0EUx9/bbKG9lN4smDadWUOEHjSI6M0GBBEFe1CsINhLoQcFpR4EBSlW0JMIioqVeuihYgUFBcFDvAj11IoWhJiZLK2X0kMLHkKT2ZGhSVnXTbLZbNIWdq/z9f+9r7yZIOzyD3e5fmgaAOe8y7KsB4ioI+IIISTfDGM1BYBzfsSyrGlE3FcSnUPEIULI16AhAgVIp9N6X1/fmGVZE8ryDrHKAxOmad5PpVLFoEACA1haWtpbKBSmAWCghrjPADBMKTWDgAgEIJfLnVIhAwBdXkRJKVcBYNQwjDde5leb0xAA57y9lKijFQ55JKVUSew6LqV8qmnatUYS3DcAY+wAAMwAwH6n+JKFhw3D+KDGOOdnlFgA6HYB/QkAQ5TSb3684QuAMTamEhIA2l0O/SiEGInH48v2sUwmE41EIlMAcNxljUrw65TSx/VC1AXAGNsDAJMAcNrF6kVEvGGa5sNqVaYG/C1K6d16IDwDcM5PWJY1iYhRF/G/NE276LXOm6Z5SAgxCwB9tr1yhULhcCKRUAnu+asJoBJVSnlHudhtVynly3w+f6W/v/+P51M380IVgCeIOAwAeUQc8GoA+zlVARhjiVKiHnQRt6aqCyHkVT3CnXM55+dV+SWEPLOPLS4udnd0dDzXdf1qb29vttIZFQE455dKlcMtUeeEEOecidoIiHMtY+xTKeFVgl+mlL5w298VgDH2GgDOVkjUe6ZpjgfZDriIv1mqcltDUsoZwzAuOOdWApAu4pd1XR+KxWJfgrS0S0ip3PhuawS3plBK/9PrFWB2fX19JJlMrjVTfHnv+fn5rs7OzilEHLSf5xtACJGKx+OqCWvZl8lkBiKRSDoEUBYIPeAj8MIQshstDKEwhDYtEP4O+IgE30u2rQqpFzkhRFQIUSwWi8v13hPKxC0FYIzFVMsrpRx0acLmEPFt6aJ/FACilNKTtVzTUgDO+TEppedeSTVphJB31SBaCqCEMMZU41XrVa6seYFSmtxRAEF7oeUeUNbMZrNTmqapl+gf6kVOSqnegNTNrvzkqK6HcwDwvq2tbaanp+d3JS9sC0AVMdGNjY3iysrKqter6I4CqFVx3MZDgLAb9RM3tjVhCDkMuAAALXlSsZ2rSu8/T5q+2+kGoyGw5SFAYKb0uZFnD3DOb/s8o6nLCCHjzgNq/sHRVEUBbB4CBGDEhrb4C+LvZE+ViZIQAAAAAElFTkSuQmCC" w="48" h="48"></app-img>
    		</template>
    	</u-tabbar-item>
    	<u-tabbar-item text="4D相册">
            <template #active-icon>
            	<app-img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAABCNJREFUaEPtWV1rFFcYfs55z5gP1zBWCyZUqFJMvNJCL9RC2aghVWmN1kiSXrQ/wUtJKfQiJTcteO/FChZFRVZv/MaoqTFZBQ1emKuWmm0aNB/VCEZDOOU9Z2Yc19Uk7M6ErTswzMfOnPM87/O87zk7R6DEN1Hi+PG/I+AC2FgCqtwB8Ixx5iqQBNBTAgQ+BXCvTGARlXq/FDgAYHARo70BwKGc/hekQCOAa4tIIF9hKROIU5CyAuUcKNBvZQstyELJnh61YvrltzNPp+AsXYqa1ashiUAkAUmYmfoX1R+uAvjeEgJBQjpkr6UEkT2XjgMC8Ht3d8PVzs6DcYwDPOD8BOAzAB/5HVa4Luo2bdaJ2loxMTSER4P30Hrugl6+Zo2QSmkppZCOd2TgigxhqRwtSOKv69dxNJnMnXRGMg58AuABADWX5+u/2Yetv/yqLVCClCSkIi2VgiQJSXxkIhIPe3txtLExFgKMOwXg+7kICCK0XbqC5WvXQrAKDJaVMOdCGALe/eHeG+K37dtzm4xEAe5k3iqsb+vAF10/ayIPuG8lIjBBQ4gIw3039bGmptgUgKpO/LCutbWr0nX17IsXYvR2Bk/+/AOzL2ewrK4WH9Q3oG7L5/rjrdtQ6bqvPC+lECYXTMILQ0Ipne27iePNzfERaEmnXVGRmAiS0YsoKRtZrjJBhBmw8boC4w+SWSltniFCtq8PJ3buiJeAVlWTJimD5PRAeonJ9hDK0TaBrVU88D5JLx+kyPbf0id37YqXwKysmLCRDe1Kvqo2pspItgi4VNqqw0eyZPxdKf13/y2c+vqr+AgkU2k3UUOTPghTZWykDeDXifmVxyrBzxqreRWJz7P9/TjdsjteAtUJYRXwgAh/cHotuqHSGZRQS8j3PyfzSCajT+/dEyeBlFtZVZPHQl6UHYdHX1tp/DHAVhzfRqExgcTIwADS+/fFNg4gmUq5S5xqayFO1MDbxkJe1SEewAxgMkmsYEtoyFImRwj/DGTEmbb98RJQVDURlMtgumABBQnLBHyL2YmcVSRsN0UYzWTE2Y62gghcADCa00IWwI/5pgyswPjtu5Pj9wcBISC83ZzL4FrzhfnNuxd+VkgZvPt8bAzDvTcKIpAPJ3/W4/nIG9u69vaVDy9dfjw9PjbXlKiQ3xc0F1oQAQC7AZwpBN083o2UwN0YvnC/lQD/GTk8jwgMAWjP81wzAM6Z8Mb5k5tD8+jinY9w34yh6Asc5wF8mdM1rzdE9mmymCs0DJTtE96uAGgqNNzver+YBNIAWnI6YzUulgKBet+TIbBvLbXFJFQsBbh0HgHAa2z+xmqcLSbYfG0ViwC3zeC/A8DfcKYBrPeOkXIoJgEfaCWABn8RLlL0EZTRqPG+0X4UCsRKokwg1nDn6ayswGIr8B+/0DpABQ/W+gAAAABJRU5ErkJggg==" w="48" h="48"></app-img>
            </template>
            <template #inactive-icon>
            	<app-img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAApFJREFUaEPtmT+LE0EYxt+X2+KKFCktLNzZ/PGI4C1YWGohXiEoWF2llnaCjY3gR7AULLxvoBbiCQH9AELO6o4kO5vCwuIKCRKO7C6PTHAlFxIms5lsEt0t93135vm9z/zbXaYNv3jD9dO/BdBqtcqlUml33V0ZDodfG43GL6XznAOdTufG1tbW53UHiOPYr9VqRwXAqpz6vxxg5idxHH9bVbUdx7kK4OV4/0YOJElys1qtflkVwLSFpQDI043CgWIOLDjeiiGUZQiFYbhNRNuDwSBOD12pESrmuu7ZvMbk5oCUUm04L4joGjNfTAUCOCWiJjN/B6BOutcB+JVKpTsPRG4A3W63wszHzOzohAE48DzvkS5PxXMDUJ0FQfCGmR/qhAGIAezM40KuAIYuvPI877EONlcAJUZK+VRNYGY+BVAioj0iuqLuEVEPgHoRafb7/Q++7/9cOwCdINN47g6YCtTlFwBZNjJdVU3ihQOFAybjZUpuMYSI6BDAj/HiqIOZEOL5rOL2er37SZLcWbD4o8eZ+cKfzfBvc0Yv9TNEHAkh/GkxdVwGcExEl2wATGtj2QB3AbxblnjV7lIBpJQtIlrqF+6ZAEEQqJeR17rqATjxPG9/Mi8Mw9sADifuq/lzbg7p2tfFoyjar9frJ6M5oks2iUspP05OOOWGEGJpnyatAbTb7V3HcdTwGb+aQohbJkUwzbUGEATBW2a+N7Hc7rmu+8lUlEm+FQApZZ2IRmNy7Jq51JoI1OVaAQjDUC2dB0RUTjtUbriu+14nYNG4FQAlQv0gLJfLDwA8I6IzZt4x+f6TFcQaQCpA7cRRFF1Of8JlFTbvc9YB5u3YVl4BYKuSWdspHMhaOVvPbbwDvwHjO1lPTna4EQAAAABJRU5ErkJggg==" w="48" h="48"></app-img>
            </template>
        </u-tabbar-item>
    	<u-tabbar-item text="我的">
            <template #active-icon>
            	<app-img src="data:image/png;base64,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" w="48" h="48"></app-img>
            </template>
            <template #inactive-icon>
            	<app-img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAABP1JREFUaEPtWU1oHVUUPmfee9CFkAguFBLezL2SH1BMoCJSwYa604VihRYEKxZ0obSi0oKKFRQsVNqiCwsR60IsGKEbwUUhLSoWDCSiCxN778yLEYQu+h64SPLmzZFTZsrkZt6beW9mlGIGZjX3nvt95++ecwbhNn/wNscPOwT+awvuWCCygFJqt2VZ+4hoNxFNIOIIAAzntNBco9E4ODMz43eTk8sCrusywBeDIDiMiPfmBGtuTwXPGwYiMD8/X63X60cA4K0CtJzEOxP4gQhorccB4AIATBWs8UhcInitdV0I0TDP7MsCnuc9HgTBHADs6gaeiNYAYAERryHi332S/MvzvE9Nn2fwAHBZCOEMTMDzvKc7nc4FRKwmgGoCwKzv+1+MjY0t9Qm65/IIPADYQohtCs9kAdZ8p9O5aIInIh8Rz7Rarfenp6eZRKHP6uqq9H3/EoNnwQMRCH2etbrFbdhVqtXqgXq9/kOhqENh4bmXAeDuSH7fBFzX3UVEPyYErLexsTEzOTnplQGeZbqu+w4RnYjLH4TAESI6Y4AsHXwhBBYXF4eHhobceJ5nn7cs6zHHca6UpflIbm4LaK1fA4BTBtCPhRCvlA2+EAtorVn7N6M/fJqtVstJyjZa6zeJ6CUA8BCR37Vms3kyWhve3N+F1uS4WUPEBcdxznVTRi4LcGGGiD/FhXMsSClfNQ90Xfe5IAhmjRTbRMR7HMdZDxPBVwDwhCHvvJTy+VIIuK57jIg+iAv3fX/avKRWVlamqtUqZynzZj4lhHiD9yuljiHiFlmh3CkhxM+lENBas8b2R8I550spR83DlFKfIeIhM0sh4mSk/SAI/kDEu/qNpbwu9Asi3hc7dE4I8UwcROjX141qdEuKVUrtQ0S+SeNPpkozFwGt9Q0D2C2XiJAwAdu29wRBMIKIHOw2EX0rpfw6WsOpeHh4+KEwGfD3kVqtdnx0dPTPtEyWlwDFD0DEE47jvJt2aJHf//cEUl2oSG0nyXJd9zQRHY3fQ0KIO821ieW0UmpLEBPRRSnlU2WDjstPyIS/Sinvz0Qgaxotk5BSitMvTzaiZ1sm5A+JFkiqg5IusrIIhBfkYlw+ER2XUp7MZIGkUoILu+h2LQt4JFcpdRoR4/4Pm5ubD05MTCxkIsCLlFK/G7OersVckYSSynguEpMa+q4uxB+S6qF/wwpa648A4GVDKa8LIT5MUlTXpr5bQ1OtVveW1Qe7rvtoEASXzMq2Wxnf0wL8MSmYubBDxEeShkx5XInHJ0T0vZF5gGPBcZyz3WT3HKuEBRv3BeYUjpuSvUWRiM9+DKBLiPgwV7YDEeBNy8vLE7VajVOaWfNz53Uob3/caDT2+L7PA7N4zuej19vt9vT4+PhvvSxbxGDrk1ar9Xa/gy2ebBMRt6JHkwZmlUrlSdu2v0lzy0wEWEjaaJGIznc6nc/TRota6wcA4FkAOJw02ebJR6VSOWDb9q2yPLcFIgFZh7uIeJUbewC4OW4kojuIiP8fcK9tukoc37plWfuzaD7alNkC0YYwJr4sYby+1G63D6b5fOabuJfZeNLAf2bC0V/e30hspfcajcbZXr+SBs5CvYiEl90L4c0ZnyGlxR671TXLsmabzea5fhNAXHjfLtQNWcpPPtYyxwSnxKtEdEVKua0wS2WdsKAwAoMcXsSeHQJFaDGPjB0L5NFeEXv/AfDQvk+snbWgAAAAAElFTkSuQmCC" w="48" h="48"></app-img>
            </template>
        </u-tabbar-item>
    </u-tabbar>
    
    <u-modal
        :show="locModal.show"
        :title="locModal.title"
        :content='locModal.content'
        @confirm="openWxSetting"
    ></u-modal>
    
    <app-auth ref="authRef" />
</template>

<script setup>
    import Index from "@/pages/index/index"
    import Photo from "@/pages/photo/photo"
    import Mine from "@/pages/mine/mine"
    import { getSiteList, geocode } from '@/api/home'
    import Logo from '@/components/Logo.vue'
    import { userAppStore } from '@/store/app'
    import { reactive, ref, nextTick } from "vue"

    let appStore = userAppStore()
    let userInfo = appStore.userInfo
    let siteList = ref([])
    let searchContTxt = ref('')
    let locModal = reactive({
        show: false,
        title: '请求授权位置信息',
        content: '请您开启位置信息授权，可以为您找到最近的充电桩。'
    })
    let cityName = ref('')
    let tabIndex = ref(0)
    let authRef = ref(null)
    
    // getList()
    // isGetLocation()
    
    function onChange(index) {
        if (index == 1 && !appStore.hasLogin) {
            return authRef.value.open()
        }
        tabIndex.value = index
    }
    
    
    
    
    
    
    // 获取电站列表
    function getList(lng = '', lat = '') {
        nextTick(() => {
            let siteName = searchContTxt.value || ''
            getSiteList({lng, lat, siteName}).then(data => {
                if (data.rows.length === 0) return
                data.rows.forEach(item => {
                    item.distance = item.distance ? (item.distance / 1000).toFixed(2) : 0
                    item.tagArr = item.tag ? item.tag.split(',') : []
                })
                siteList.value = data.rows
            })
            if (lng && lat) {
                geocode(`114.06031,22.72174`).then(data => {
                    let val = data.addressComponent && data.addressComponent.city
                    if (val) {
                        cityName.value = val
                    }
                })
            }
        })
    }
    
    // 判断是否授权
    function isGetLocation() {
        let scopeType = 'scope.userLocation'
        uni.getSetting({
            success(res) {
                if (res.authSetting[scopeType]) { // 已同意
                    getLocInfo()
                } else { // 未授权 || 已拒绝
                    uni.authorize({
                    	scope: scopeType,
                    	success() { // 选择同意
                    		getLocInfo()
                    	},
                        fail() { // 已拒绝 || 选择拒绝
                    		locModal.show = true
                    	}
                    })
                }
            }
        })
    }
    
    function openWxSetting() {
        locModal.show = false
        uni.openSetting({
        	success(res) {
        		if (res.authSetting['scope.userLocation']) {
                    getLocInfo()
        		} else {
                    uni.showToast({
                        icon: 'none',
                        title: '您没有授权位置信息，将无法为您查到到最近的充电站',
                        duration: 3000
                    })
        		}
        	}
        });
    }
    
    function getLocInfo() {
        uni.getLocation({
            type: 'wgs84',
            geocode: true,
            success: function(res) {
                getList(res.longitude, res.latitude)
            },
            fail() {
                uni.showToast({
                    icon: 'none',
                    title: '获取位置失败，请检查是否打开手机定位',
                    duration: 3000
                })
            },
        })
    }
    
    function toChargingStation(item) {
        uni.navigateTo({
            url: "/pages/index/charging-station?siteNo=" + item.siteNo
        });
    }

    function toFiltrate(params) {
        uni.navigateTo({
            url: "/pages/index/filtrate"
        });
    }
</script>

<style scoped lang="scss">
    .layout-cont {
        padding-bottom: 30rpx;
    }

</style>