<template>
  <div id="app" class="outer">
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.isShowFooter"></Footer>
  </div>
</template>

<script>
import Header from './components/Header/index';
import Footer from './components/Footer/index';

export default {
  name: 'App',
  components:{Header,Footer},
  methods:{
  },
  mounted(){
    this.$store.dispatch("home/categoryList");
  },
}
</script>

<style>
@font-face {
    font-family: 'icomoon';
    src:  url('./fonts/icomoon.eot?tomleg');
    src:  url('./fonts/icomoon.eot?tomleg#iefix') format('embedded-opentype'),
      url('./fonts/icomoon.ttf?tomleg') format('truetype'),
      url('./fonts/icomoon.woff?tomleg') format('woff'),
      url('./fonts/icomoon.svg?tomleg#icomoon') format('svg');
    font-weight: normal;
    font-style: normal;
    font-display: block;
  }

.center{
    width: 1200px;
    margin: 0 auto;
}

.red{
    color: brown;
}
</style>
