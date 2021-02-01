<template>
  <div class="search">
    <el-row>
      <el-col :md="{span:24}" :lg="{span:22,offset:1}">
        <div class="headbar">
          <h3><strong>{{ key }}</strong> 搜索结果：</h3>
        </div>
        <div v-for="(item,index) in novelList" :key="index" class="novelItem">
          <el-row>
            <el-col :lg="{span:5}">
              <img
                :src="item.img"
                style="padding-left: 3%"
                onerror="this.src='https://www.23wx.cc/files/article/image/144/144178/144178s.jpg'"
                alt="显示错误"
              >
            </el-col>
            <el-col :lg="{span:13}">
              <div style="display: inline-block;padding-left: 3%">
                <h4>{{ item.name }}</h4>
                <div>
                  <span>{{ item.author }}|</span>
                  <span>{{ item.status }}|</span>
                  <span>{{ item.website }}</span>
                </div>
                <strong>简    介：</strong><p>{{ item.synopsis }}</p>
                <strong>最新章节：</strong> <a :href="item.lastChapterUrl">{{ item.lastChapter }}</a>
              </div>
            </el-col>
            <el-col :lg="{span:6}">
              <div style="display: inline-block;padding-left: 3%">
                <div style="padding-bottom: 50px;">
                  <span><strong>更新时间：</strong>{{ item.updateTime }}</span>
                  <br>
                  <span><strong>小说类别：</strong>{{ item.type }}</span>
                </div>
                <div style=" position: absolute;bottom: 0;">
                  <el-button type="primary" round @click="handleClick(item)"><span class="iconfont iconCategory" />章节列表</el-button>
                  <el-button type="success" round @click="handAddShelf(item._id)"><span class="iconfont iconjia1" />加入书架</el-button>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div v-if="ifupkey" style="text-align: center">
          <h5>如果没有检索到适合的数据，请提交关键字 <em>{{ key }}</em>,进行全网搜索，等待3分钟后搜索即可！！</h5>
          <el-button @click="upkey">提交</el-button>
        </div>
        <shelf-row-form />

      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getNovelsByTypeName, search } from '@/api/novel'
import ShelfRowForm from '@/components/ShelfRowForm'
import store from '@/store'

export default {
  name: 'SearchList',
  components: { ShelfRowForm },
  data() {
    return {
      key: '',
      type: '',
      novelList: null,
      ifupkey: false,
      showDialog: true

    }
  },
  mounted() {
    // 初始化数据
    const base64 = this.$Base64
    const query = this.$route.query
    this.key = query.key !== undefined ? base64.decode(query.key) : undefined
    this.type = query.type !== undefined ? base64.decode(query.type) : undefined
    if (this.type !== undefined) {
      getNovelsByTypeName(this.type)
        .then((response) => {
          this.novelList = response.data
        }
        )
    } else {
      search(1, this.key).then((response) => {
        this.novelList = response.data
        if (this.novelList.length < 3) {
          this.ifupkey = true
        }
      })
    }
  },
  methods: {
    handleClick(novel) {
      store.dispatch('readnovel/setNovel', novel)
      this.$router.push({ name: 'chapter' })
    },
    upkey() {
      search(2, this.key).then((response) => {
        this.$message({
          message: '恭喜你，提交成功',
          type: 'success'
        })
      })
    },
    handAddShelf(novelId) {
      store.dispatch('shelf/show', novelId)
    }
  }
}
</script>

<style scoped>
  p{
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
  }
  .novelItem{
    margin-top: 30px;
    background: LightYellow;
    border-radius: 12px;
  }
  img{
    height: 230px;
    width: 210px;
    transition: all 0.6s;/*图片放大过程的时间*/
  }
  img:hover{
    transform: scale(1.2);
  }
</style>
