import { reqGetCode , reqRegister ,reqLogin , reqGetUserInfo , reqLogout} from '@/api';

export default {
    namespaced: true,
    actions: {
        async getCode({commit},phone){
            const result=await reqGetCode(phone)
            if(result.code==200){
                commit('GETCODE',result.data)
            }else{
                return Promise.reject('请求失败')
            }
        },
        async register({commit},data){
            const result=await reqRegister(data)
            if(result.code==200){
                return 'ok'
            }else{
                return Promise.reject('请求失败')
            }
        },
        async login({commit},data){
            const result=await reqLogin(data)
            if(result.code==200){
                commit('LOGIN',result.data)
                localStorage.setItem('token',result.data.token)
                return 'ok'
            }else{
                return 'failed'
            }
        },
        async getUserInfo({commit}){
            const result=await reqGetUserInfo()
            if(result.message=='未登陆'){
                localStorage.removeItem('token')
                return Promise.reject('getUserInfo failed')
            }
            if(result.code==200){
                commit('GETUSERINFO',result.data)
                return 'ok'
            }else{
                return Promise.reject('failed')
            }
        },
        async Logout({commit}){
            const result=await reqLogout()
            if(result.code==200){
                commit('LOGOUT')
                return 'ok'
            }else{
                return Promise.reject('failed')
            }
        }
    },
    mutations: {
        GETCODE(state,data){
            state.code=data
        },
        LOGIN(state,data){
            state.token=data.token
        },
        GETUSERINFO(state,data){
            state.userInfo=data
        },
        LOGOUT(state){
            state.token=''
            state.userInfo=''
            localStorage.removeItem('token')
        }
    },
    state: {
        code:'',
        token:'',
        userInfo:''
    },
    getters: {
        
    }
}