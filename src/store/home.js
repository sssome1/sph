import { reqCategoryList, mockBanner,mockFloor } from '@/api';

export default {
    namespaced: true,
    actions: {
        async categoryList({ commit }) {
            let result = await reqCategoryList()
            if (result.code == 200) {
                commit('CATEGORYLIST', result.data)
            }
        },
        async getBanners({ commit }) {
            let result = await mockBanner()
            if (result.code == 200) {
                commit('GETBANNERS', result.data)
            }
        },
        async getFloors({ commit }) {
            let result = await mockFloor()
            if (result.code == 200) {
                commit('GETFLOORS', result.data)
            }
        },
    },
    mutations: {
        CATEGORYLIST(state, data) {
            state.categoryList = data
        },
        GETBANNERS(state, data) {
            state.banners = data
        },
        GETFLOORS(state,data){
            state.floors=data
        }
    },
    state: {
        categoryList: [],
        banners:[],
        floors:[]
    },
    getters: {

    }
}