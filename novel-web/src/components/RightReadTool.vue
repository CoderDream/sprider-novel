<template>
  <div class="right-bar-list">
    <dl>
      <dd>
        <span style=" border-radius:5px 5px 0 0;" @click="previous">
          <span class="iconfont iconshangyiye" />
          <br>
          <span>上一页</span>
        </span>
      </dd>
      <dd>
        <span>
          <span class="iconfont iconpinglun" />
          <br>
          <span>看评论</span>
        </span>
      </dd>
      <dd>
        <span @click="nextPage">
          <span class="iconfont iconxiayiye" />
          <br>
          <span>下一页</span>
        </span>
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  name: 'RightReadTool',
  methods: {
    previous() {
      this.$parent.$parent.$parent.previous()
    },
    nextPage() {
      this.$parent.$parent.$parent.nextPage()
    }
  }
}
</script>

<style scoped>
  .right-bar-list dd >span{
    text-decoration:none;
    out-line: none;
    text-align: center;
    padding-top: 12px;
    font: 12px/16px PingFangSC-Regular,'-apple-system',Simsun;
    display: block;
    width: 58px;
    height: 72px;
    transition: none;
    border:0.2px solid #F8F1DA ;
    background-color: #F8F1DA;
    cursor: pointer;
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none; user-select:none;
  }
  .right-bar-list dd >span>span {
    font-family: "Microsoft YaHei";
    font-size: large;
    padding-top:5px ;
  }
</style>
