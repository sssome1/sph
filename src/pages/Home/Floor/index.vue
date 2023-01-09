<template>
  <div class="floor">
    <div class="py-container">
      <div class="title clearfix">
        <h3 class="fl">{{ floor.name }}</h3>
        <div class="fr">
          <ul class="nav-tabs clearfix">
            <li class="active" v-for="nav in floor.navlist" :key="nav.text">
              <a :href="nav.url" data-toggle="tab">{{ nav.text }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="tab-content">
        <div class="tab-pane">
          <div class="floor-1">
            <div class="blockgary">
              <ul class="jd-list">
                <li v-for="keyword in floor.keywords" :key="keyword">
                  {{ keyword }}
                </li>
              </ul>
              <img :src="floor.imgUrl" />
            </div>
            <div class="floorBanner">
              <Carousel :data-carousel="floor.carouselList"></Carousel>
            </div>
            <div class="split">
              <span class="floor-x-line"></span>
              <div
                class="floor-conver-pit"
                v-for="(recommend, index) in floor.recommendList"
                :key="recommend"
                v-show="index < 2"
              >
                <img :src="recommend" />
              </div>
            </div>
            <div class="split center">
              <img :src="floor.bigImg" />
            </div>
            <div class="split">
              <span class="floor-x-line"></span>
              <div
                class="floor-conver-pit"
                v-for="(recommend, index) in floor.recommendList"
                :key="recommend"
                v-show="index > 1"
              >
                <img :src="recommend" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Floor",
  props: ["floor"],
};
</script>

<style>
.floor a {
  color: #333;
}
</style>  