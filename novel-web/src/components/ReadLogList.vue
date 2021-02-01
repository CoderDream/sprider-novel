<template>
  <div>
    <h3>小说列表</h3>
    <el-table
      v-loading="loading"
      :data="novelList"
      element-loading-text="Loading"
      fit
      highlight-current-row
    >
      <el-table-column label="小说icon">
        <template slot-scope="scope">
          <img :src="scope.row.novelDocumnet.img" style="height: 50px">
        </template>
      </el-table-column>
      <el-table-column label="小说名">
        <template slot-scope="scope">
          {{ scope.row.novelDocumnet.name }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        min-width="200px"
      >
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.readLog.chapterUrl===null"
            type="success"
            @click="chapters(scope.row.novelDocumnet)"
          >章节列表
          </el-button>
          <el-button
            v-if="scope.row.readLog.chapterUrl!==null"
            type="success"
            @click="read(scope.row.novelDocumnet,scope.row.readLog.chapterUrl)"
          >继续阅读
          </el-button>
          <el-button
            type="danger"
            @click="handleDelete(scope.$index,scope.row.readLog.id)"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { deleteReadLog, getNovelsOfReadLog } from '@/api/readLog'
import store from '@/store'
import { getChapters } from '@/api/novel'

export default {
  name: 'ShelfList',
  data() {
    return {
      novelList: [],
      loading: true
    }
  },
  mounted() {
    this.getNovelsOfReadLog()
  },
  methods: {
    getNovelsOfReadLog() {
      getNovelsOfReadLog().then((response) => {
        this.novelList = response.data
        this.loading = false
      })
    },
    read(novel, chapterUrl) {
      store.dispatch('readnovel/setNovel', novel)
      const chapter = {}
      chapter.url = chapterUrl
      chapter.name = ''
      store.dispatch('readnovel/setChapter', chapter)
      getChapters(novel.chaptersUrl).then((response) => {
        const chapterList = response.data
        store.dispatch('readnovel/setChapterList', chapterList)
      })
      this.$router.push({ name: 'read' })
    },
    chapters(novel) {
      store.dispatch('readnovel/setNovel', novel)
      this.$router.push({ name: 'chapter' })
    },
    handleDelete(index, readLogId) {
      console.log(index)
      this.$confirm('此操作将永久删除记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true,
        type: 'warning'
      }).then(() => {
        deleteReadLog(readLogId).then(() => {
          this.$message({
            message: '用户删除成功',
            type: 'success'
          })
        })
        this.novelList.splice(index, 1)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
