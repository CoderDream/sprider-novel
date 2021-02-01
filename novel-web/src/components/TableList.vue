<template>
  <div>
    <h3>小说排行榜</h3>
    <hr>
    <template>
      <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="最新更新" name="first">
            <el-table
              :data="tableData1"
              @row-click="handleClick"
            >
              <el-table-column
                prop="name"
                label="小说名"
              />
              <el-table-column
                prop="author"
                label="作者"
              />
              <el-table-column
                prop="lastChapter"
                label="最新章节"
                show-overflow-tooltip
              />
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="最多热度" name="second">
            <el-table
              :data="tableData2"
            >
              <el-table-column
                prop="date"
                label="小说名"
              />
              <el-table-column
                prop="name"
                label="作者"
              />
              <el-table-column
                prop="address"
                label="最新章节"
              />
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="字数最多" name="third">
            <el-table
              :data="tableData3"
            >
              <el-table-column
                prop="name"
                label="小说名"
                show-overflow-tooltip
              />
              <el-table-column
                prop="author"
                label="作者"
                show-overflow-tooltip
              />
              <el-table-column
                prop="wordCount"
                label="字数"
              />
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </template>
  </div>
</template>

<script>
import { updateTop, wordCountTop } from '@/api/novel'
import store from '@/store'

export default {
  name: 'TableList',
  data() {
    return {
      activeName: 'first',
      tableData1: [],
      tableData2: [],
      tableData3: []
    }
  },
  mounted() {
    this.loadUpdateData()
    this.loadWordCountData()
  },
  methods: {
    handleClick(novel) {
      store.dispatch('readnovel/setNovel', novel)
      this.$router.push({ name: 'chapter' })
    },
    loadUpdateData() {
      updateTop().then((response) => {
        this.tableData1 = response.data
      })
    },
    loadWordCountData() {
      wordCountTop().then(response => {
        this.tableData3 = response.data
      })
    }
  }
}
</script>

<style scoped>

</style>
