import { reqGoodDetail, reqUpdateCart } from '@/api';
import {getUUID} from '../utils/uuid';
export default {
    namespaced: true,
    actions: {
        async getGoodDetail({ commit }, id) {
            const result = await reqGoodDetail(id)
            if (result.code == 200) {
                commit('GETGOODDETAIL', result.data)
            }
        },
        async updateCart({ commit }, { skuId, skuNum }) {
            const result = await reqUpdateCart(skuId, skuNum)
            return result.code == 200 ? 'success' : Promise.reject('failed')
        }
    },
    mutations: {
        GETGOODDETAIL(state, data) {
            state.goodDetail = data
        },
    },
    state: {
        goodDetail: {},
        uuid:getUUID()
    },
    getters: {
        categoryView(state) {
            return state.goodDetail.categoryView || {}
        },
        skuInfo(state) {
            return state.goodDetail.skuInfo || {}
        },
        spuSaleAttrList(state) {
            return state.goodDetail.spuSaleAttrList || {}
        }
    }
}