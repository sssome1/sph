<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li
              class="with-x"
              v-if="searchParams.categoryName"
              @click="removeTag(1)"
            >
              {{ searchParams.categoryName }}<i>×</i>
            </li>
            <li
              class="with-x"
              v-if="searchParams.keyword"
              @click="removeTag(2)"
            >
              {{ searchParams.keyword }}<i>×</i>
            </li>
            <li
              class="with-x"
              v-if="searchParams.trademark"
              @click="removeTag(3)"
            >
              {{ searchParams.trademark.split(":")[1] }}<i>×</i>
            </li>
            <li
              class="with-x"
              v-for="(attr, index) in searchParams.props"
              :key="attr"
              @click="removeTag(4, index)"
            >
              {{ attr.split(":")[1] }}<i>×</i>
            </li>
          </ul>
        </div>
        <!--selector-->
        <SearchSelector
          @changeTrademark="changeTrademark"
          @changeProps="changeProps"
        />
        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="isOne" @click="changeOrder('1:desc')">
                  <a href="javascript:void(0);"
                    >综合<span
                      v-show="isOne"
                      class="iconfont"
                      :class="arrowType"
                    ></span
                  ></a>
                </li>
                <li :class="isTwo" @click="changeOrder('2:desc')">
                  <a href="javascript:void(0);"
                    >价格<span
                      v-show="isTwo"
                      class="iconfont"
                      :class="arrowType"
                    ></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${goods.id}`">
                      <img v-lazy="goods.defaultImg"/>
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i>{{ goods.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ goods.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <Pagination
            :pageNo="searchParams.pageNo"
            :total="total"
            :totalPages="totalPages"
            @changePageNo="changePageNo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  name: "Search",
  data() {
    return {
      searchParams: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        order: "1:asc",
        pageNo: 1,
        pageSize: 10,
        props: [],
        trademark: "",
      },
    };
  },
  components: {
    SearchSelector,
  },
  computed: {
    ...mapGetters("search", [
      "attrsList",
      "goodsList",
      "trademarkList",
      "total",
      "totalPages",
    ]),
    isOne() {
      return this.searchParams.order.indexOf(1) != -1 ? "active" : "";
    },
    isTwo() {
      return this.searchParams.order.indexOf(2) != -1 ? "active" : "";
    },
    arrowType() {
      return this.searchParams.order.indexOf("desc") !== -1
        ? "icon-xiajiantou"
        : "icon-shangjiantou";
    },
  },
  methods: {
    getSearchResult() {
      this.$store.dispatch("search/getSearchResult", this.searchParams);
    },
    changeSearchParams() {
      Object.assign(this.searchParams, this.$route.query);
      if (this.$route.query.categoryLayer === "1") {
        this.searchParams.category2Id = "";
        this.searchParams.category3Id = "";
        this.searchParams.category1Id = this.$route.query.categoryId;
      } else if (this.$route.query.categoryLayer === "2") {
        this.searchParams.category1Id = "";
        this.searchParams.category3Id = "";
        this.searchParams.category2Id = this.$route.query.categoryId;
      } else if (this.$route.query.categoryLayer === "3") {
        this.searchParams.category1Id = "";
        this.searchParams.category2Id = "";
        this.searchParams.category3Id = this.$route.query.categoryId;
      }
    },
    changeTrademark(trademark) {
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      this.searchParams.pageNo=1
      this.getSearchResult();
    },
    changeProps(attr, attrValue) {
      let prop = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      if (this.searchParams.props.indexOf(prop) == -1) {
        this.searchParams.props.push(prop);
      }
      this.searchParams.pageNo=1
      this.getSearchResult();
    },
    removeTag(tagIndex, index) {
      let query = {};
      if (tagIndex == 1) {
        this.searchParams.categoryName = "";
        if (this.$route.query.categoryLayer === "1") {
          this.searchParams.category1Id = "";
        } else if (this.$route.query.categoryLayer === "2") {
          this.searchParams.category2Id = "";
        } else if (this.$route.query.categoryLayer === "3") {
          this.searchParams.category3Id = "";
        }
        this.getSearchResult()
        query=this.searchParams.keyword===''?undefined:{keyword:this.searchParams.keyword}
        this.$router.push({ path: "/search", query });
      } else if (tagIndex == 2) {
        this.searchParams.keyword = "";
        query =
          this.searchParams.categoryName == ""
            ? undefined
            : {
                categoryName: this.$route.query.categoryName,
                categoryId: this.$route.query.categoryId,
                categoryLayer: this.$route.query.categoryLayer,
              };
        this.$router.push({ path: "/search", query });
        this.$bus.$emit("clearKeyword");
      } else if (tagIndex == 3) {
        this.searchParams.trademark = "";
        this.getSearchResult();
      } else if (tagIndex == 4) {
        this.searchParams.props.splice(index, 1);
        this.getSearchResult();
      }
    },
    changeOrder(order) {
      if (this.searchParams.order === order) {
        let num = order.split(":")[0];
        this.searchParams.order =
          this.searchParams.order.indexOf("desc") !== -1
            ? `${num}:asc`
            : `${num}:desc`;
      } else {
        this.searchParams.order = order;
      }
      this.getSearchResult();
    },
    changePageNo(flag) {
      let { pageNo } = this.searchParams;
      if (flag === "pre") {
        this.searchParams.pageNo = pageNo > 1 ? pageNo - 1 : pageNo;
      } else if (flag === "next") {
        this.searchParams.pageNo =
          pageNo < this.totalPages ? pageNo + 1 : pageNo;
      } else {
        this.searchParams.pageNo = flag;
      }
      this.getSearchResult();
    },
  },
  watch: {
    $route: {
      handler() {
        this.changeSearchParams();
        this.getSearchResult();
      },
    },
  },
  beforeMount() {
    this.changeSearchParams();
  },
  mounted() {
    this.getSearchResult();
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 10px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>