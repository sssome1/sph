//二次封装axios
import axios from 'axios';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css'
import store from '../store';


let cancel=null
const request = axios.create({
    baseURL:'/api',
    timeout:5000,
    cancelToken:new axios.CancelToken(function(c){
        cancel=c
    })
})

request.interceptors.request.use((config)=>{
    nprogress.start()
    // setTimeout(() => {
    //     cancel()
    // }, 200);
    if(store.state.detail.uuid){
        config.headers.userTempId=store.state.detail.uuid
    }
    if(localStorage.getItem('token')){
        config.headers.token=localStorage.getItem('token')
    }
    return config
},(err)=>{
    return Promise.reject(err)
})

request.interceptors.response.use((response)=>{
    nprogress.done()
    return response.data
},(error)=>{
    return Promise.reject(error)
})

export default request