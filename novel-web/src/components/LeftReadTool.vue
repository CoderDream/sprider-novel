<template>
  <div class="left-bar-list">
    <dl>
      <dd>
        <span style=" border-radius:5px 5px 0 0;" @click="showChapter">
          <span class="iconfont iconCategory" />
          <br>
          <span>目录</span>
        </span>
      </dd>
      <dd>
        <span @click="showSite">
          <span class="iconfont iconshezhi" />
          <br>
          <span>设置</span>
        </span>
      </dd>
      <dd>
        <span>
          <span class="iconfont iconshouji" />
          <br>
          <span>手机</span>
        </span>
      </dd>
      <dd>
        <span>
          <span class="iconfont iconyouxi" />
          <br>
          <span>游戏</span>
        </span>
      </dd>
      <dd>
        <span style=" border-radius:0 0 5px 5px ;" @click="fullScreen">
          <span class="iconfont iconyouxi" />
          <br>
          <span>全屏</span>
        </span>
      </dd>
    </dl>
  </div>
</template>
<script>
export default {
  name: 'ReadTool',
  methods: {
    fullScreen() {
      this.$parent.$parent.$parent.fullScreen()
    },
    showChapter() {
      this.$parent.$parent.$parent.dialogRegisterFormVisible = true
    },
    showSite() {
      this.$parent.$parent.$parent.siteVisible = true
    }
  }
}
</script>

<style scoped>
    .left-bar-list dd >span{
        text-decoration:none;
        out-line: none;
        text-align: center;
        padding-top: 12px;
        font: 12px/16px PingFangSC-Regular,'-apple-system',Simsun;
        display: block;
        width: 58px;
        height: 58px;
        transition: none;
        border:0.2px solid #F8F1DA ;
        background-color: #F8F1DA;
       cursor: pointer;
       -webkit-user-select:none;
       -moz-user-select:none;
       -ms-user-select:none;
       user-select:none;
    }
    span {
        font-family: "Microsoft YaHei";
        font-size: large;
    }
</style>
