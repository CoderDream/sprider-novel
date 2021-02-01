<template>
  <div class="toplist">
    <div>
      <h3>最热小说</h3>
      <hr>
      <el-row>
        <el-col v-for="item in topList" :key="item._id" style="text-align: center" :xs="{span:12}" :sm="{span:8}" :md="{span:8}" :lg="{span:6}">
          <el-card class="card">
            <div>
              <img
                :src="item.img"
                class="image"
                alt="图片未找到"
              >
            </div>
            <div>
              <div class="novelName"><span @click="handleClick(item)">{{ item.name }}</span></div>
              <div class="novelAuthor"><em>{{ item.author }}</em>著</div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { top } from '@/api/novel'
import store from '@/store'
export default {
  name: 'TopList',
  data() {
    return {
      topList: []
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      top().then((response) => {
        this.topList = response.data
      })
    },
    handleClick(novel) {
      store.dispatch('readnovel/setNovel', novel)
      this.$router.push({ name: 'chapter' })
    }
  }
}
</script>

<style scoped>
  img{
    width: 100px;
    height: 150px;
    transition: all 0.6s;
  }
  img:hover{
    transform: scale(1.2);
  }
  .card{
    height: 250px;
    margin-top: 10px;
    border: none;
    padding-bottom: 10px;
  }
  .novelName , .novelAuthor{
     overflow:hidden;
     text-overflow:ellipsis;
     white-space:nowrap;
   }
</style>
