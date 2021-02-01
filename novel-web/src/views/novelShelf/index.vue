<template>
  <div>
    <el-row class="tac">
      <el-col :md="{span:24}" :lg="{span:22,offset:1}">
        <h3 class="title">我的书架</h3>
        <div class="toolbox">
          <el-button type="primary" style="float: right;margin-right: 10%" @click="addNovelShelf">添加书架</el-button>
        </div>
        <el-col :lg="{span:4,offset: 1}">
          <el-menu
            default-active="10"
            class="el-menu-vertical-demo"
          >
            <el-menu-item
              index="10"
              @click="showLog=true"
            >
              <i class="el-icon-menu" />
              <span slot="title">阅读记录</span>
            </el-menu-item>
            <el-menu-item v-for="item in shelfList" :key="item.id" :index="item.id+''" @click="selectBookshelf(item.id)">
              <i class="el-icon-document" />
              <span slot="title">{{ item.name }}</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :lg="{span:18,offset: 1}">
          <readLog-list v-show="showLog" />
          <book-shelf-list v-show="!showLog" ref="bookshelflist" />
        </el-col>
      </el-col>
    </el-row>
    <el-dialog :fullscreen="true" title="书架添加" :visible.sync="dialogNovelShelfFormVisible" style=" margin-bottom: 100px">
      <el-form :model="shelfForm">
        <el-form-item label="书架名:">
          <el-input v-model="shelfForm.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="书架介绍">
          <el-input v-model="shelfForm.introduction" rows="5" type="textarea" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button @click="shelfCancel">取 消</el-button>
        <el-button type="primary" @click="shelfSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getNovelShelf, save } from '@/api/novelshelf'
import ReadLogList from '@/components/ReadLogList'
import BookShelfList from '@/components/BookShelfList'
import store from '@/store'

export default {
  name: 'Index',
  components: { BookShelfList, ReadLogList },
  data() {
    // eslint-disable-next-line no-mixed-spaces-and-tabs
    return {
      listLoading: false,
      shelfList: [],
      shelfForm: {},
      dialogNovelShelfFormVisible: false,
      shelfId: '',
      showLog: true
    }
  },
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'userId',
      'token'
    ])
  },
  mounted() {
    this.loadData()
  },
  methods: { loadData() {
    getNovelShelf().then(
      (response) => {
        this.shelfList = response.data
      }
    )
  },
  addNovelShelf() {
    this.dialogNovelShelfFormVisible = true
  },
  shelfCancel() {
    this.dialogNovelShelfFormVisible = false
  },
  shelfSave() {
    save(this.shelfForm).then((response) => {
      this.loadData()
      if (this.token) {
        store.dispatch('shelf/initShelfList')
      }
      this.$message({
        message: '书架创建成功',
        type: 'success'
      })
    })
    this.dialogNovelShelfFormVisible = false
  },
  selectBookshelf(shelfId) {
    this.showLog = false
    this.$refs.bookshelflist.getNovelsOfShelf(shelfId)
  }

  }
}
</script>

<style scoped>
</style>
