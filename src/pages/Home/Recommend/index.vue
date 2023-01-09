<template>
  <div id="recom" class="center clearfix">
    <div class="recom_hd">
      <h3>闪购倒计时</h3>
      <span class="cutdown"></span>
    </div>
    <div class="recom_bd">
      <ul>
        <li><img src="./images/recom_03.jpg" alt="" /></li>
        <li><img src="./images/recom_03.jpg" alt="" /></li>
        <li><img src="./images/recom_03.jpg" alt="" /></li>
        <li><img src="./images/recom_03.jpg" alt="" /></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Recommend",
};
</script>

<style>
#recom {
  margin-top: 12px;
}

.recom_hd {
  float: left;
  width: 205px;
  height: 163px;
  line-height: 130px;
  text-align: center;
  background-color: #5c5251;
}

.recom_hd h3 {
  height: 50px;
  font-size: 28px;
  color: rgb(218, 219, 210);
}

.recom_hd .cutdown {
  text-align: center;
  font-size: 28px;
  color: rgb(231, 56, 56);
}

.recom_bd {
  float: left;
}

.recom_bd li {
  position: relative;
  float: left;
}

.recom_bd li:nth-child(-n + 3):after {
  content: "";
  position: absolute;
  right: 0;
  top: 19px;
  width: 1px;
  height: 145px;
  border-right: 1px solid #e4e4e4;
}
</style>