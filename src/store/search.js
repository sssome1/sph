import { reqSearchResult } from '@/api';

export default {
    namespaced: true,
    actions: {
        async getSearchResult({ commit }, data) {
            const result = await reqSearchResult(data)
            if (result.code == 200) {
                commit('GETSEARCHRESULT', result.data)
            }
        }
    },
    mutations: {
        GETSEARCHRESULT(state, data) {
            state.searchResult = data
        }
    },
    state: {
        searchResult: {},
    },
    getters: {
        attrsList(state) {
            return state.searchResult.attrsList
        },
        goodsList(state) {
            return state.searchResult.goodsList
        },
        trademarkList(state) {
            return state.searchResult.trademarkList
        },
        total(state) {
            return state.searchResult.total
        },
        totalPages(state) {
            return state.searchResult.totalPages
        },
    }
}