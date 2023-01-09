<template>
  <div class="type-nav">
    <div class="container" @mouseleave="initCurrentIndex">
      <h2 class="all" @mouseenter="isShowNav = true">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <transition name="sort" >
        <div class="sort" v-show="isShowNav">
          <div class="all-sort-list2" @click="goSearch($event)">
            <div
              class="item"
              v-for="(c1, index) in categoryList"
              :key="c1.categoryId"
              v-show="index < 15"
              @mouseenter="changeCurrentIndex(index)"
              :class="{ activeBgColor: currentIndex === index }"
            >
              <h3>
                <a
                  :class="{ activeFontColor: currentIndex === index }"
                  :data-categoryName="c1.categoryName"
                  :data-categoryId="c1.categoryId"
                  :data-categoryLayer="1"
                >
                  {{ c1.categoryName }}
                </a>
              </h3>
              <div class="item-list clearfix">
                <div class="subitem">
                  <dl
                    class="fore"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dt>
                      <a
                        :data-categoryName="c2.categoryName"
                        :data-categoryId="c2.categoryId"
                        :data-categoryLayer="2"
                        >{{ c2.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a
                          :data-categoryName="c3.categoryName"
                          :data-categoryId="c3.categoryId"
                          :data-categoryLayer="3"
                          >{{ c3.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      isShowNav: true,
    };
  },
  methods: {
    changeCurrentIndex(index) {
      this.currentIndex = index;
    },
    initCurrentIndex() {
      this.currentIndex = -1;
      if(this.$route.path !== "/home"){
        this.isShowNav = false; 
      }
    },
    //节流
    // changeCurrentIndex:throttle(function (index) {
    //     this.currentIndex = index;
    //   },50)
    goSearch(e) {
      let element = e.target;
      const { categoryname, categoryid, categorylayer } = element.dataset;
      if (categoryname) {
        this.$router.push({
          path: "/search",
          query: {
            ...this.$route.query,
            categoryName:categoryname,
            categoryId:categoryid,
            categoryLayer:categorylayer,
          },
        });
      }
    },
  },
  computed: {
    ...mapState("home", ["categoryList"]),
  },
  mounted() {
    this.isShowNav = this.$route.path === "/home" ? true : false;
  },
};
</script>

<style>
.all-sort-list2 .item {
  background-color: brown;
}

.all-sort-list2 .item a {
  display: block;
  color: #fff;
}
.all-sort-list2 .subitem a {
  color: #333;
}

.all-sort-list2 .subitem a:hover {
  color: brown;
}

.all-sort-list2 .activeBgColor {
  background-color: rgb(236, 236, 236);
}

.all-sort-list2 .item .activeFontColor {
  color: #333;
}

.sort-enter,.sort-leave-to{
  opacity: 0;
}
.sort-enter-to,.sort-leave{
  opacity: 1;
}

.sort-enter-active,.sort-leave-active{
  transition: 0.5s;
}
</style>