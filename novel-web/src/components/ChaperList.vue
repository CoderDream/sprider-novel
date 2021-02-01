<template>
  <div>
    <el-row v-loading="loading">
      <div class="chapterList1">
        <div class="table-head">
          <span class="iconfont iconzuixin" />
          <h4 style="display: inline-block">{{ novel.name }} 最新章节</h4>
        </div>
        <div class="chapterList2">
          <el-row>
            <el-col v-for="(chapter,index) in newChapters" :key="index" class="item" :xs="{span:24}" :sm="{span:12}" :md="{span:8}">
              <a href="#" @click="read(chapter)">{{ chapter.name }}</a>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="chapterList1">
        <div class="table-heada">
          <i class="iconfont iconCategory" />
          <h4 style="display: inline-block">{{ novel.name }} 所有章节</h4>
        </div>

        <div class="chapterList2">
          <el-row>
            <el-col v-for="(chapter,index) in showChapters" :key="index" class="item" :xs="{span:24}" :sm="{span:8}" :md="{span:6}">
              <a href="#" @click="read(chapter)">{{ chapter.name }}</a>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
import { getChapters } from '@/api/novel'

export default {
  name: 'ChaperList',
  computed: {
    ...mapGetters([
      'novel',
      'chapter'
    ])
  },
  data() {
    return {
      chapterList: [],
      loading: true,
      showChapters: [],
      newChapters: []
    }
  },
  mounted() {
    getChapters(this.novel.chaptersUrl).then((response) => {
      this.chapterList = response.data
      this.loadChapters()
    })
  },
  methods: {
    loadChapters() {
      store.dispatch('readnovel/setChapterList', this.chapterList)
      this.showChapters = this.chapterList
      this.newChapters = this.chapterList.slice(-8).reverse()
      this.loading = false
    },
    read(chapter) {
      store.dispatch('readnovel/setChapter', chapter)
      this.$router.push({ name: 'read' })
    }
  }
}
</script>

<style scoped>

    .table-head {
        padding-left: 3%;
        color: #ac2925;
        background: #f2dede;
        border-radius: 25px 25px 0 0;
    }
    .table-heada {
        padding-left: 3%;
        color: #333;
        background-color: #f5f5f5;
        border-radius: 25px 25px 0 0;
    }
    .chapterList1 {
        margin-bottom: 20px;
        margin-top: 20px;
        border-radius: 25px;
        background: white;
        padding-bottom: 25px;
    }
    .item{
      padding-top: 20px;
      padding-bottom: 10px;
      border-width: 0 0 1px 0;
      border-bottom: dashed #dddddd
    }
    .item a{
      padding-left: 20px;
    }

</style>
