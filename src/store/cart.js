import { reqCartList , reqDeleteCart,reqUpdateChecked} from '@/api';

export default {
    namespaced: true,
    actions: {
        async getCartList({commit}){
            const result=await reqCartList()
            if(result.code==200){
                commit('GETCARTLIST',result.data)
            }
        },
        async deleteCart({commit},skuId){
            const result=await reqDeleteCart(skuId)
            if(result.code==200){
                return 'ok'
            }else{
                return Promise.reject('请求失败')
            }
        },
        async updateChecked({commit},{skuId,isChecked}){
            const result=await reqUpdateChecked(skuId,isChecked)
            if(result.code==200){
                return 'ok'
            }else{
                return Promise.reject('请求失败')
            }
        }
    },
    mutations: {
        GETCARTLIST(state,data){
            state.cartList=data
        }
    },
    state: {
        cartList:[]
    },
    getters: {
        cartList(state){
            return state.cartList[0]||{}
        }
    }
}