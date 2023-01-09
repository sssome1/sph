import requests from './request';
import mock from './mock';

export const reqCategoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'get' })
export const reqSearchResult = (params) => requests({ url: '/list', method: 'post' ,data:params})
export const reqGoodDetail = (id) => requests({url:`/item/${id}`,method:'get'})
export const reqUpdateCart=(skuId,skuNum)=>requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})
export const reqDeleteCart=(skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})
export const reqUpdateChecked=(skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})
export const reqCartList=()=>requests({url:'/cart/cartList',method:'get'})
export const reqGetCode=(phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get'})
export const reqRegister=(data)=>requests({url:`/user/passport/register`,data,method:'post'})
export const reqLogin=(data)=>requests({url:'/user/passport/login',data,method:'post'})
export const reqGetUserInfo=()=>requests({url:'/user/passport/auth/getUserInfo',method:'get'})
export const reqLogout=()=>requests({url:'/user/passport/logout',method:'get'})
export const reqGetAddressInfo=()=>requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})
export const reqGetTradeInfo=()=>requests({url:'/order/auth/trade',method:'get'})
export const reqSubmitOrder=(tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})
export const reqPayInfo=(orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})
export const reqPayStatus=(orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})
export const reqGetMyOrderList=(page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'})
export const mockBanner = () => mock({ url: '/banner', method: 'get' })
export const mockFloor = () => mock({ url: '/floor', method: 'get' })


