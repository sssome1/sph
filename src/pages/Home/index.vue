<template>
  <section>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Floor v-for="floor in floors" :key="floor.id" :floor="floor"></Floor>
  </section>
</template>

<script>
import ListContainer from "./ListContainer/index";
import Recommend from "./Recommend/index";
import Floor from "./Floor/index";
import { mapState } from "vuex";
export default {
  name: "Home",
  components: { ListContainer, Recommend, Floor },
  computed: {
    ...mapState("home", ["floors"]),
  },
  mounted() {
    this.$store.dispatch("home/getFloors");
    // this.$store.dispatch("user/getUserInfo")
  },
};
</script>

<style>
</style>