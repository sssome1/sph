import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import store from '@/store';

Vue.use(VueRouter)

const OriginalPush = VueRouter.prototype.push
const OriginalReplace = VueRouter.prototype.replace

VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        OriginalPush.call(this, location, resolve, reject)
    } else {
        OriginalPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        OriginalReplace.call(this, location, resolve, reject)
    } else {
        OriginalReplace.call(this, location, () => { }, () => { })
    }
}

let router = new VueRouter({
    routes,
    scrollBehavior(to, from, savePosition) {
        return { y: 0 }
    }
})

router.beforeEach((to, from, next) => {
    if (to.path == '/login' && localStorage.getItem('token')) {
        alert('请先退出当前账号')
        next('/home')
    } else if ((to.path.indexOf('/trade')!=-1||to.path.indexOf('/shopCart')!=-1||to.path.indexOf('/addToCartSuccess')!=-1||to.path.indexOf('/pay')!=-1||to.path.indexOf('/center')!=-1) && !localStorage.getItem('token')) {
        alert('请登录账号')
        next(`/login?redirect=${to.path}`)
    } else {
        if (localStorage.getItem('token')) {
            if (!store.state.user.userInfo) {
                store.dispatch("user/getUserInfo").then(()=>{
                    next()
                },()=>{
                    alert('请登录账号')
                    next('/login')
                })
            } else {
                next()
            }
        } else {
            if(store.state.user.userInfo){
                store.state.user.userInfo=''
            }
            next()
        }
    }
})

export default router