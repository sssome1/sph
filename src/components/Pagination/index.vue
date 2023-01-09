<template>
  <div class="pagination">
    <button @click="prePage">上一页</button>
    <button
      @click="changePage($event)"
      value="1"
      :class="isActive(1)"
      v-show="totalPages >= 2">
      1
    </button>
    <button
      @click="changePage($event)"
      :value="isTwo"
      :class="isActive(isTwo)"
      v-show="totalPages > 2"
    >
      {{ isTwo }}
    </button>
    <!-- 中间五个动态的按钮 -->
    <button
      v-for="ste in steArr"
      :key="ste"
      @click="changePage($event)"
      :value="ste"
      :class="isActive(ste)"
    >
      {{ ste }}
    </button>

    <button
      @click="changePage($event)"
      :value="isReTwo"
      :class="isActive(isReTwo)"
      v-show="totalPages >= 9"
    >
      {{ isReTwo }}
    </button>
    <button
      @click="changePage($event)"
      :value="totalPages"
      :class="isActive(totalPages)"
    >
      {{ totalPages }}
    </button>
    <button @click="nextPage">下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Pagination",
  props: ["pageNo", "total", "totalPages"],
  computed: {
    ...mapState("search", ["searchResult"]),
    isTwo() {
      return this.pageNo > 5 ? "..." : 2;
    },
    isReTwo() {
      return this.pageNo < this.totalPages - 4 ? "..." : this.totalPages - 1;
    },
    steArr() {
      let arr = [];
      if (this.totalPages >= 9) {
        if (this.pageNo <= 5) {
          return [3, 4, 5, 6, 7];
        } else if (this.pageNo <= this.totalPages - 4) {
          for (let i = 0; i < 5; i++) {
            arr[i] = this.pageNo - 2 + i;
          }
        } else {
          for (let i = 0; i < 5; i++) {
            arr[i] = this.totalPages - 6 + i;
          }
        }
      } else {
        for (let i = 0; i < this.totalPages - 3; i++) {
          arr[i] = 3 + i;
        }
      }
      return arr;
    },
  },
  methods: {
    isActive(value) {
      return this.pageNo === value ? "active" : "";
    },
    prePage() {
      this.$emit("changePageNo", "pre");
    },
    changePage(e) {
      if (e.target.value !== "...") {
        this.$emit("changePageNo", Number(e.target.value));
      }
    },
    nextPage() {
      this.$emit("changePageNo", "next");
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>