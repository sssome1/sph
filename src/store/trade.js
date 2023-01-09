import {reqGetAddressInfo , reqGetTradeInfo} from '../api';

export default {
    namespaced:true,
    actions:{
        async getAddressInfo({commit}){
            const result=await reqGetAddressInfo()
            if(result.code==200){
                commit('GETADDRESSINFO',result.data)
            }else{
                return Promise.reject('请求失败')
            }
        },
        async getTradeInfo({commit}){
            const result=await reqGetTradeInfo()
            if(result.code==200){
                commit('GETTRADEINFO',result.data)
            }else{
                return Promise.reject('请求失败')
            }
        }
    },
    mutations:{
        GETADDRESSINFO(state,data){
            state.addressList=data
        },
        GETTRADEINFO(state,data){
            state.tradeInfo=data
        }
    },
    state:{
        addressList:[],
        tradeInfo:''
    },
    getters:{
        totalAmount(state){
            return state.tradeInfo.totalAmount
        },
        totalNum(state){
            return state.tradeInfo.totalNum
        },
        orderList(state){
            return state.tradeInfo.detailArrayList
        },
        tradeNo(state){
            return state.tradeInfo.tradeNo
        },
        
    }
}