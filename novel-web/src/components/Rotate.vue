<template>
  <div class="block">
    <el-carousel height="350px">
      <el-carousel-item v-for="item in novel_list" :key="item.id">
        <img :src="item.imgUrl" style="height: 100%;width: 100%" @click="handleClick(item.novelUrl)">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { getList } from '@/api/carousel'
import { getNovelByNovelId } from '@/api/novel'

export default {
  name: 'Rotate',
  data() {
    return {
      novel_list: []
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      getList().then((response) => {
        this.novel_list = response.data
      })
    },
    handleClick(novelId) {
      getNovelByNovelId(novelId).then((response) => {
        this.$router.push({ name: 'chapter', query: { novel: this.$Base64.encode(JSON.stringify(novelId)) }})
      })
    }
  }
}
</script>

<style scoped>
    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 150px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>
