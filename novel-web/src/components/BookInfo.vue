<template>
  <div class="book">
    <el-row>
      <el-col :xs="{span:10,offset:5}" :sm="{span:10}" :md="{span:4}" :lg="{span:4}">
        <div class="novel-img">
          <img :src="novel.img">
        </div>
      </el-col>
      <el-col :lg="{span:20}" :md="{span:24}">
        <div class="novel-info">
          <h1 style="margin-block-start: 0;margin-block-end: 0">{{ novel.name }}</h1>
          <div>
            <p class="tags">
              <a>{{ novel.type }}</a>
            </p>
            <p>最新章节：{{ novel.lastChapter }}（{{ novel.updateTime }}）</p>
            <el-button type="primary"><span class="iconfont icondianzan" />投票推荐</el-button>
            <el-button v-show="novel._id" type="success" @click="handAddShelf(novel._id)"><span class="iconfont iconjia1" />加入书架</el-button>
            <span class="iconfont iconliuyan" style="float:right; margin-right: 3%;padding-top: 20px">留言反馈</span>
          </div>
          <hr style="margin-right: 3%">
          <p class="introduction">
            {{ novel.synopsis }}
          </p>
        </div>
        <shelf-row-form />
      </el-col>
    </el-row>
  </div>
</template>

<script>

import store from '@/store'
import ShelfRowForm from '@/components/ShelfRowForm'
import { mapGetters } from 'vuex'

export default {
  name: 'BookInfo',
  components: { ShelfRowForm },
  computed: {
    ...mapGetters([
      'novel'
    ])
  },
  methods: {
    handAddShelf(novelId) {
      console.log(novelId)
      store.dispatch('shelf/show', novelId)
    }
  }

}
</script>

<style scoped>
    .tags {
        font: 12px/22px PingFangSC-Regular, '-apple-system', Simsun;
        display: inline-block;
        overflow: hidden;
        padding: 0 10px;
        margin-top: 20px;
        text-align: center;
        vertical-align: middle;
        border-width: 1px;
        border-style: solid;
        border-radius: 15px;
    }

    .book {
        margin-top: 20px;
        border-radius: 25px;
        background: white;

    }

    .novel-img img {
        width: 200px;
        margin-left: 10%;
        padding: 20px;
    }

    .novel-info {
        padding-top: 20px;
        padding-left: 3%;
    }
    .introduction{
        color: #777;
    }
    p{
      word-wrap: break-word;
      word-break: break-all;
      overflow: hidden;
    }
</style>
