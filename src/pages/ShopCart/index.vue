<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="(cart, index) in cartInfoList"
          :key="cart.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cart.isChecked"
              @click="changeIsChecked(cart)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">
              {{ cart.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.cartPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <button class="mins" @click="updateSkuNum($event, 'mins', cart)">
              -
            </button>
            <input
              autocomplete="off"
              type="text"
              :value="cart.skuNum"
              minnum="1"
              class="itxt"
              @blur="updateSkuNum($event, 'input', cart)"
              onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"
            />
            <button class="plus" @click="updateSkuNum($event, 'plus', cart)">
              +
            </button>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ subTotal(cart.cartPrice, cart.skuNum) }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="javascript:;" class="sindelet" @click="deleteCart(cart.skuId)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="checkedAll"
          @click="checkALl($event)"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:;" @click="deleteCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ checkedNum }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice() }} 元</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import _ from "lodash";
export default {
  name: "ShopCart",
  data() {
    return {
      checkedNum: 0,
      checkedAll: true,
    };
  },
  methods: {
    getCartList() {
      this.$store.dispatch("cart/getCartList");
    },
    subTotal(price, num) {
      return price * num;
    },
    totalPrice() {
      let tp = 0;
      if(this.cartList.cartInfoList){
        this.cartList.cartInfoList.forEach((ele) => {
          if(ele.isChecked==1){
            tp+=ele.cartPrice*ele.skuNum
          }
        });
      }
      return tp;
    },
    changeIsChecked(cart) {
      let isChecked = cart.isChecked;
      cart.isChecked = isChecked == 1 ? 0 : 1;
    },
    checkALl(e) {
      if (this.cartList.cartInfoList) {
        this.cartList.cartInfoList.forEach((ele) => {
          ele.isChecked = e.target.checked;
        });
      }
    },
    updateSkuNum(e, type, goods) {
      let num = goods.skuNum;
      switch (type) {
        case "mins":
          if (num <= 1) return;
          num = -1;
          break;
        case "plus":
          if (num >= 99) return;
          num = 1;
          break;
        case "input":
          if (e.target.value < 1 || e.target.value > 99) {
            e.target.value = num;
            return;
          }
          num = e.target.value - num;
          break;
      }
      const res = this.$store.dispatch("detail/updateCart", {
        skuId: goods.skuId,
        skuNum: num,
      });
      res.then(
        () => {
          this.getCartList();
        },
        (reason) => {
          alert("操作失败");
        }
      );
    },
    deleteCart(skuId) {
      this.$store.dispatch("cart/deleteCart", skuId);
      this.getCartList();
    },
    deleteCheckedCart() {
      if (this.cartList.cartInfoList) {
        this.cartList.cartInfoList.forEach((ele) => {
          if (ele.isChecked == 1) {
            this.$store.dispatch("cart/deleteCart", ele.skuId);
          }
        });
      }
      this.getCartList();
    },
  },
  computed: {
    ...mapGetters("cart", ["cartList"]),
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },
  },
  watch: {
    cartList: {
      deep: true,
      handler() {
        let num = 0;
        this.checkedAll = true;
        if(this.cartList.cartInfoList){
          this.cartList.cartInfoList.forEach((ele) => {
            ele.isChecked == 1 ? num++ : num;
            if (ele.isChecked == 0) {
              this.checkedAll = false;
            }
          });
        }
        this.checkedNum = num;
      },
    },
  },
  mounted() {
    this.getCartList();
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 15%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 35%;
      }

      .cart-th3 {
        width: 10%;
      }
      .cart-th4 {
        width: 17%;
      }
      .cart-th5 {
        width: 10%;
      }
      .cart-th6 {
        width: 13%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 200px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 10%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 36px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>