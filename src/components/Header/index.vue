<template>
  <header>
    <div id="shortcut">
      <div class="center">
        <div class="lf">
          <span>品优购欢迎您！</span>
          <span v-if="!userInfo"
            >请 <router-link to="/login">登录 </router-link>|
            <router-link to="/register" class="red">免费注册</router-link>
          </span>
          <span v-show="userInfo"
            >您好! {{ userInfo.name }}
            <router-link to="/home"
              ><span @click="quit">退出登录</span></router-link
            ></span
          >
        </div>
        <div class="rf">
          <ul>
            <li><router-link to="/center">我的订单</router-link></li>
            <li>|</li>
            <li class="arrow-icon"><a href="#">我的品优购</a></li>
            <li>|</li>
            <li><a href="#">品优购会员</a></li>
            <li>|</li>
            <li><a href="#">企业采购</a></li>
            <li>|</li>
            <li class="arrow-icon"><a href="#">关注品优购</a></li>
            <li>|</li>
            <li class="arrow-icon"><a href="#">客户服务</a></li>
            <li>|</li>
            <li class="arrow-icon"><a href="#">网站导航</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div id="header" class="center">
      <div class="pyg-logo">
        <router-link to="/home">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </div>
      <div class="search">
        <input type="search" placeholder="" ref="keywords" />
        <button @click="goSearch">搜索</button>
      </div>
      <div class="hotwords">
        <ul>
          <li><a href="#" class="red">优惠购首发</a></li>
          <li><a href="#">亿元优惠</a></li>
          <li><a href="#">9.9元包邮</a></li>
          <li><a href="#">每满99减30</a></li>
          <li><a href="#">办公用品</a></li>
          <li><a href="#">电脑</a></li>
          <li><a href="#">通信</a></li>
        </ul>
      </div>
      <div class="shoppingcar">
        <router-link to="/shopCart">
          <span>我的购物车</span>
        </router-link>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  methods: {
    goSearch() {
      let keyword =
        this.$refs.keywords.value == "" ? undefined : this.$refs.keywords.value;
      // ||this.$refs.keywords.placeholder
      this.$router.push({
        path: "/search",
        query: { ...this.$route.query, keyword },
      });
    },
    clearKeyword() {
      this.$refs.keywords.value = "";
    },
    quit() {
      this.$store.commit("user/LOGOUT");
    },
  },
  watch: {
    $route: {
      handler(oldValue, newValue) {
        if (oldValue.path != newValue.path) {
          this.clearKeyword();
        }
      },
    },
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo;
    },
  },
  mounted() {
    this.$bus.$on("clearKeyword", this.clearKeyword);
  },
};
</script>

<style>
#shortcut {
  height: 31px;
  line-height: 31px;
  background-color: #f1f1f1;
}

#shortcut .lf {
  float: left;
}

#shortcut .rf {
  float: right;
}

#shortcut .rf ul li {
  float: left;
  padding: 0 6px;
}

.arrow-icon::after {
  font-family: icomoon;
  content: "\e91e";
  margin-left: 6px;
}

#header {
  position: relative;
  height: 105px;
  padding-top: 25px;
}

/* logo */
.pyg-logo {
  float: left;
}

/* search */
#header .search {
  margin-left: 346px;
}

#header .search {
  position: relative;
  width: 536px;
  height: 36px;
  border: 2px solid brown;
}

#header .search input {
  float: left;
  width: 454px;
  height: 100%;
  text-indent: 10px;
}

#header .search button {
  position: absolute;
  width: 80px;
  /*如果用浮动 heigth不能是100% 否则浏览器缩放的时候 父盒子的border值会变化 导致button的位置发生变动 */
  height: 100%;
  color: white;
  background-color: #b1191a;
}

/* hotwords */
#header .hotwords {
  margin-left: 346px;
  margin-top: 5px;
}

#header .hotwords ul li {
  float: left;
  margin: 0 10px;
}

/* shoppingcar */
.shoppingcar {
  position: absolute;
  top: 25px;
  right: 60px;
  padding-left: 15px;
  width: 140px;
  height: 35px;
  line-height: 35px;
  border: 1px solid #dfdfdf;
  background-color: #f7f7f7;
}

.shoppingcar::before {
  margin-right: 5px;
  font-family: icomoon;
  content: "\e93a";
  color: brown;
}

.shoppingcar::after {
  margin-left: 10px;
  font-family: icomoon;
  content: "\e920";
}

.count {
  position: absolute;
  top: -5px;
  left: 105px;
  width: 17px;
  height: 14px;
  line-height: 14px;
  text-align: center;
  color: white;
  background-color: #e60012;
  border-radius: 7px 7px 7px 0px;
}
</style>