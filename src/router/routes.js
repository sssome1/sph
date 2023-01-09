import Detail from '../pages/Detail';
// import AddCartSuccess from '../pages/AddCartSuccess';
// import ShopCart from '../pages/ShopCart';
// import Login from '../pages/Login';
// import Register from '../pages/Register';
// import Trade from '../pages/Trade';
// import Pay from '../pages/Pay';
// import PaySuccess from '../pages/PaySuccess';
// import Center from '../pages/Center';
// import MyOrder from '../pages/Center/MyOrder';
// import GroupOrder from '../pages/Center/GroupOrder';

export default [
    {
        path: '/home',
        component: () => import('@/pages/Home'),
        meta: { isShowFooter: true }
    },
    {
        path: '/search',
        component: () => import('@/pages/Search'),
        meta: { isShowFooter: true }
    },
    {
        path: '/detail/:id',
        component: () => import('@/pages/Detail'),
        meta: { isShowFooter: true }
    },
    {
        path: '/addToCartSuccess',
        component: () => import('@/pages/AddCartSuccess'),
        meta: { isShowFooter: true }
    },
    {
        path: '/shopCart',
        component: () => import('@/pages/ShopCart'),
        meta: { isShowFooter: true }
    },
    {
        path: '/login',
        component: () => import('@/pages/Login'),
        meta: { isShowFooter: false }
    },
    {
        path: '/register',
        component: () => import('@/pages/Register'),
        meta: { isShowFooter: false }
    },
    {
        path: '/trade',
        component: () => import('@/pages/Trade'),
        meta: { isShowFooter: true },
        beforeEnter: (to, from, next) => {
            if (from.path.indexOf('/shopCart') != -1) {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: '/pay',
        component: () => import('@/pages/Pay'),
        meta: { isShowFooter: true },
        beforeEnter: (to, from, next) => {
            if (from.path.indexOf('/trade') != -1) {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: '/paysuccess',
        component: () => import('@/pages/PaySuccess'),
        meta: { isShowFooter: true },
        beforeEnter: (to, from, next) => {
            if (from.path.indexOf('pay') != -1) {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: '/center',
        component: () => import('@/pages/Center'),
        meta: { isShowFooter: true },
        children: [
            {
                path: 'myOrder',
                component: () => import('@/pages/Center/MyOrder'),
            },
            {
                path: 'groupOrder',
                component: () => import('@/pages/Center/GroupOrder')
            }, 
            {
                path: '/center',
                redirect: '/center/myOrder',
            }
        ]
    },
    {
        path: '*',
        redirect: '/home'
    }
]