<template>
  <div>
    <div class="read-main">
      <el-row>
        <el-col :xs="{span:0}" :sm="{span:24}" :md="{span:24}" :lg="{span:24}">
          <div>
            <left-read-tool style="position: fixed;margin-top: 50px;" />
          </div>
          <div>
            <right-read-tool style="position: fixed; margin-top: 60px; margin-left: 90% " />
          </div>
        </el-col>
        <el-col :md="{span:24}" :lg="{span:20,offset:2}">
          <div class="headbar">
            <el-breadcrumb
              separator-class="el-icon-arrow-right"
              style="font-size: larger;margin-left: 3%"
            >
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>{{ novel.type }}</el-breadcrumb-item>
              <el-breadcrumb-item :to="{path:'chapter'}">{{ novel.name }}</el-breadcrumb-item>
              <el-breadcrumb-item>{{ chapter.name }} </el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <el-row v-loading="contentLoading">
            <div ref="content" class="content" :style="{backgroundColor:backgroundColor,fontSize:fontSize+'px',fontFamily:fontFamily}">
              <p style="white-space: pre-line; padding: 10px" :style="{lineHeight:lineHeight+'px',fontFamily:fontFamily}">
                {{ contentInfo.content }}</p>
            </div>
          </el-row>
          <el-col :xs="{span:24}" :sm="{span:0}" :md="{span:0}" :lg="{span:0}" :xl="{span:0}" style="text-align: center;padding-top: 10px">
            <el-row>
              <el-col :span="10" :offset="1">
                <el-button style="width: 100%" type="primary" @click="previous">上一页</el-button>
              </el-col>
              <el-col :span="10" :offset="1">
                <el-button style="width: 100%" type="primary" @click="nextPage">下一页</el-button>
              </el-col>
            </el-row>
          </el-col>
          <NovelComment />
        </el-col>
      </el-row>
    </div>

    <!--    目录弹出框-->
    <el-dialog title="目录" :visible.sync="dialogRegisterFormVisible">
      <div v-for="chapter in chapterList" :key="chapter.url">
        <a style="display: inline-block" class="chapterUrl" href="#" :style="{backgroundColor:bgColor(chapter.url)}" @click="read(chapter.url)">{{ chapter.name }}</a>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogRegisterFormVisible= false">关闭</el-button>
      </div>
    </el-dialog>
    <!--    阅读设置-->
    <el-dialog
      title="阅读设置"
      :visible.sync="siteVisible"
      class="site"
    >
      <div class="setting-list-wrap">
        <ul>
          <li id="j_themeList" class="theme-list">
            <span> 阅读主题 </span>
            <el-button title="牛皮纸" circle style="background-color: #f2dede" @click="chageBc('#f2dede')" />
            <el-button title="淡绿色" circle style="background-color: #475669" @click="chageBc('#475669')" />
            <el-button title="淡蓝色" circle style="background-color: #f5f5f5" @click="chageBc('#f5f5f5')" />
            <el-button title="夜间模式" style="background: #495057;text-align: center" circle @click="chageBc('duck')"><span class="iconfont iconyueliang" /></el-button>
          </li>
          <li class="font-family">
            <span>正文字体</span>
            <span>
              <el-button style="font-family: ‘Microsoft YaHei’" @click="fontFamily='Microsoft YaHei'">雅黑</el-button>
              <el-button style="font-family: ‘STSong’" @click="fontFamily='STSong'">宋体</el-button>
              <el-button data-eid="qd_R47" style="font-family: ‘STKaiti’" @click="fontFamily='STKaiti'">楷书</el-button>
            </span>
          </li>
          <li id="j_fontSize" class="font-size">
            <span>字体大小</span>
            <el-button type="primary" style="background: #007bff" circle @click="fontSize--">A-</el-button>
            <span class="lang">{{ fontSize }}</span><b />
            <el-button type="primary" circle style="background: #007bff" @click="fontSize++">A+</el-button>
          </li>
          <li id="j_pageWidth" class="page-width">
            <span>行高间距</span>
            <el-button type="primary" style="background: #007bff" circle @click="lineHeight--">H-</el-button>
            <span class="lang">{{ lineHeight }}</span><b />
            <el-button type="primary" circle style="background: #007bff" @click="lineHeight++">H+</el-button>
          </li>
        </ul>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import { getContent } from '@/api/novel'
import LeftReadTool from '@/components/LeftReadTool'
import RightReadTool from '@/components/RightReadTool'
import NovelComment from '@/components/NovelComment'
import { mapGetters } from 'vuex'
import store from '@/store'

export default {
  name: 'Read',
  components: { LeftReadTool, RightReadTool, NovelComment },
  computed: {
    ...mapGetters([
      'novel',
      'chapter',
      'chapterList'
    ])
  },
  data() {
    return {
      chapterUrl: {},
      contentInfo: {},
      dialogRegisterFormVisible: false,
      chapters: [],
      siteVisible: false,
      backgroundColor: '#f2dede',
      fontSize: 18,
      fontFamily: 'Microsoft YaHei',
      lineHeight: 30,
      contentLoading: true
    }
  },
  mounted() {
    this.loadContent(this.chapter.url)
  },
  beforeDestroy() {
    this.$parent.backgroundColor = '#FFF'
  },
  methods: {
    loadContent(contentUrl) {
      this.contentLoading = true
      getContent(contentUrl).then((response) => {
        this.contentInfo = response.data
        this.contentLoading = false
        if (this.chapter.name === '') {
          this.changeChapterName(contentUrl)
        }
      })
    },
    read(chapterUrl) {
      this.contentLoading = true
      getContent(chapterUrl).then((response) => {
        this.contentInfo = response.data
        this.dialogRegisterFormVisible = false
        scrollTo(0, 0)
        this.contentLoading = false
        this.changeChapterName(chapterUrl)
      })
    },
    changeChapterName(chapterUrl) {
      this.chapterList.map(chapter => {
        if (chapter.url === chapterUrl) {
          store.dispatch('readnovel/setChapter', chapter)
        }
      })
    },
    fullScreen() {
      this.$refs.content.requestFullscreen()
    },
    chageBc(color) {
      if (color === 'duck') {
        this.$parent.backgroundColor = this.$parent.backgroundColor === '#000' ? '#FFF' : '#000'
      } else {
        this.backgroundColor = color
      }
    },
    previous() {
      if (this.contentInfo.prePage === '') {
        this.$router.push({ name: 'chapter' })
      }
      this.read(this.contentInfo.prePage)
    },
    nextPage() {
      if (this.contentInfo.nextPage === '') {
        this.$router.push({ name: 'chapter' })
      }
      this.read(this.contentInfo.nextPage)
    },
    bgColor(chapterUrl) {
      if (this.chapter.url === chapterUrl) { return 'red' }
      return '#FFF'
    }
  }
}
</script>

<style scoped>

    .pull-right {
        font-size: larger;
        line-height: 1;
    }

    .headbar {
        background: white;
        padding-top: 20px;
        margin-top: 10px;
        margin-bottom: 10px;
        display: flex;
        border-radius: 5px;
        padding-bottom: 10px;
    }

    select {
        border: solid 1px #ccc;
        appearance: none; /*清除select下拉框默认样式*/
        -moz-appearance: none;
        -webkit-appearance: none;
        padding-right: 14px; /*为下拉小箭头留出一点位置，避免被文字覆盖*/
        /*background: url("img/arrow.png") no-repeat scroll right center transparent;!*自定义图片覆盖原有的下三角符号*!*/
    }

    select {
        background: #fafdfe;
        border: 1px solid #9bc0dd;
        -moz-border-radius: 2px;
        -webkit-border-radius: 2px;
        border-radius: 2px;
    }
    .content{
      background-color:transparent;
      overflow: auto;
    }
    li, ol, ul {
      list-style: none outside none;
    }
    li{
      margin-top: 10px;
      margin-bottom: 10px;
    }
    li >.el-button{
      margin-left: 20px;
      width: 50px;
      height: 50px;
      background-color: #ed4259;
    }
    li > span{
      font-family: "Microsoft YaHei";
      margin-left: 20px;
    }
    .chapterUrl{
      margin-top: 40px;
    }
</style>
