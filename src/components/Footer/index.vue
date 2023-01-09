<template>
  <div id="footer">
    <div class="center">
      <div class="mod_service">
        <ul>
          <li>
            <i></i>
            <div class="service_txt">
              <h4>正品保障</h4>
              <span>正品保障,提供发票</span>
            </div>
          </li>
          <li>
            <i></i>
            <div class="service_txt">
              <h4>正品保障</h4>
              <span>正品保障,提供发票</span>
            </div>
          </li>
          <li>
            <i></i>
            <div class="service_txt">
              <h4>正品保障</h4>
              <span>正品保障,提供发票</span>
            </div>
          </li>
          <li>
            <i></i>
            <div class="service_txt">
              <h4>正品保障</h4>
              <span>正品保障,提供发票</span>
            </div>
          </li>
        </ul>
      </div>

      <div class="mod_help">
        <dl>
          <dt>服务指南</dt>
          <dd><a href="#">购物流程</a></dd>
          <dd><a href="#">会员介绍</a></dd>
          <dd><a href="#">生活旅行/团购</a></dd>
          <dd><a href="#">常见问题</a></dd>
          <dd><a href="#">大家电</a></dd>
          <dd><a href="#">联系客服</a></dd>
        </dl>
        <dl>
          <dt>服务指南</dt>
          <dd><a href="#">购物流程</a></dd>
          <dd><a href="#">会员介绍</a></dd>
          <dd><a href="#">生活旅行/团购</a></dd>
          <dd><a href="#">常见问题</a></dd>
          <dd><a href="#">大家电</a></dd>
          <dd><a href="#">联系客服</a></dd>
        </dl>
        <dl>
          <dt>服务指南</dt>
          <dd><a href="#">购物流程</a></dd>
          <dd><a href="#">会员介绍</a></dd>
          <dd><a href="#">生活旅行/团购</a></dd>
          <dd><a href="#">常见问题</a></dd>
          <dd><a href="#">大家电</a></dd>
          <dd><a href="#">联系客服</a></dd>
        </dl>
        <dl>
          <dt>服务指南</dt>
          <dd><a href="#">购物流程</a></dd>
          <dd><a href="#">会员介绍</a></dd>
          <dd><a href="#">生活旅行/团购</a></dd>
          <dd><a href="#">常见问题</a></dd>
          <dd><a href="#">大家电</a></dd>
          <dd><a href="#">联系客服</a></dd>
        </dl>
        <dl>
          <dt>服务指南</dt>
          <dd><a href="#">购物流程</a></dd>
          <dd><a href="#">会员介绍</a></dd>
          <dd><a href="#">生活旅行/团购</a></dd>
          <dd><a href="#">常见问题</a></dd>
          <dd><a href="#">大家电</a></dd>
          <dd><a href="#">联系客服</a></dd>
        </dl>
        <dl>
          <dt>帮助中心</dt>
          <dd>
            <img src="./images/wx_cz.jpg" alt="" />
            品优购客户端
          </dd>
        </dl>
      </div>

      <div class="mod_copyright">
        <div class="about">
          <a href="#">关于我们</a> | <a href="#">联系我们</a> |
          <a href="#">联系客服</a> | <a href="#">商家入驻</a> |
          <a href="#">营销中心</a> | <a href="#">手机品优购</a> |
          <a href="#">友情连接</a> | <a href="#">销售联盟</a> |
          <a href="#">品优购社区</a> | <a href="#">品优购公益</a> |
          <a href="#">English Site</a> |
          <a href="#">Contact U</a>
        </div>
        <div class="copyright">
          地址：北京市昌平区建材城西路金燕龙办公楼一层 邮编：100096
          电话：400-618-4000 传真：010-82935100 邮箱: zhanghj+itcast.cn
          <br />
          京ICP备08001421号京公网安备110108007702
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style>
#footer{
    height: 415px;
    padding-top: 30px;
    background-color: #f5f5f5;
}

/* mod_service */
#footer .mod_service{
    height: 80px;
    border-bottom: 1px solid #ccc;
}

#footer .mod_service ul li{
    float: left;
    padding-left: 35px;
    width: 300px;
    height: 50px;
}

#footer .mod_service ul li i{
    float: left;
    margin-right: 8px;
    width: 50px;
    height: 50px;
    background: url(./images/icons.png) no-repeat -252px -2px;
}

.service_txt h4{
    font-size: 14px;
}

.service_txt span{
    font-size: 12px;
}

/* mod_help */
#footer .mod_help{
    height: 185px;
    padding-top: 20px;
    padding-left: 50px;
    border-bottom: 1px solid #ccc;
}

.mod_help dl{
    float: left;
    margin-right: 120px;
}

.mod_help dl dt{
    font-size: 16px;
    margin-bottom: 10px;
}

.mod_help dl:last-child{
    margin-right: 0;
    width: 90px;
    text-align: center;
}

/* mod_copyright */
#footer .mod_copyright{
    text-align: center;
}

.about{
    padding: 20px 0;
    text-align: center;
}

.about ul li{
    float: left;
}

.copyright{
    text-align: center;
}
</style>