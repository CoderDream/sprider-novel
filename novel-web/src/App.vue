<template>
  <div id="app" :style="{background:backgroundColor}">
    <div style="width:100%;height:100%;">
      <el-backtop :bottom="60" />
    </div>
    <Header />
    <router-view :key="$route.fullPath" />
    <Footer class="footer" />
  </div>
</template>
<script>
import Header from '@/views/header/Header'
import Footer from '@/views/footer/Footer'

export default {
  name: 'App',
  components: { Footer, Header },
  data() {
    return {
      backgroundColor: '#FFF'
    }
  },
  created() {
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
    }

    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })
  }
}
</script>
<style>
    * {
        font-family: 'Segoe UI', Helvetica, Arial, sans-serif;
    }

    *, ::after, ::before {
        box-sizing: border-box
    }

    html {
        font-family: sans-serif;
        line-height: 1.15;
        -webkit-text-size-adjust: 100%;
        -webkit-tap-highlight-color: transparent
    }

    body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        text-align: left;
    }

    a {
        color: #007bff;
        text-decoration: none;
        background-color: transparent
    }

    a:hover {
        color: #0056b3;
        text-decoration: underline
    }

    a:not([href]):not([tabindex]) {
        color: inherit;
        text-decoration: none
    }

    a:not([href]):not([tabindex]):focus, a:not([href]):not([tabindex]):hover {
        color: inherit;
        text-decoration: none
    }

    a:not([href]):not([tabindex]):focus {
        outline: 0
    }

    button, input, optgroup, select, textarea {
        margin: 0;
        font-family: inherit;
        font-size: inherit;
        line-height: inherit
    }

    button, input {
        overflow: visible
    }

    button, select {
        text-transform: none
    }

    select {
        word-wrap: normal
    }

    select:focus::-ms-value {
        color: #495057;
        background-color: #fff
    }

    .footer {
        margin-top: 50px;
        text-align: center;
        text-color: #FFF;
        border: #212529;
    }
    .el-message-box {
      width: auto;
    }
    .el-dialog{
      width: 70%;
    }
</style>
