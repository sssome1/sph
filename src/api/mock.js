//二次封装axios
import axios from 'axios';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css'

const mock = axios.create({
    baseURL:'/mock',
    timeout:5000
})

mock.interceptors.request.use((config)=>{
    nprogress.start()
    return config
},(err)=>{
    return Promise.reject(err)
})

mock.interceptors.response.use((response)=>{
    nprogress.done()
    return response.data
},(error)=>{
    return Promise.reject(error)
})

export default mock