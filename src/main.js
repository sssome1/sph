import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import TypeNav from './components/TypeNav';
import Carousel from './components/Carousel';
import Pagination from './components/Pagination';
import '@/mock/mockServe'
// import '@/plugins/validate';
import '@/plugins/lazyload';
import 'swiper/css/swiper.css'
import * as API from '@/api';
import { MessageBox , Form , FormItem , Input} from 'element-ui';

Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
Vue.component(MessageBox.name, MessageBox)

Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input)

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  }
}).$mount('#app')
