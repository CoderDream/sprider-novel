<template>
  <div class="app-container">
    <div class="filter-container">

      <el-input v-model="listQuery.title" placeholder="小说名" style="width: 200px;" class="filter-item" />

      <el-input v-model="listQuery.author" placeholder="小说作者" style="width: 200px;" class="filter-item" />

      <el-select v-model="listQuery.type" placeholder="小说类型" style="width: 200px;" class="filter-item">
        <el-option :value="undefined">所有类型</el-option>
        <el-option
          v-for="item in novelTypes"
          :key="item.value"
          :label="item.value"
          :value="item.value"
        />
      </el-select>
      <el-select v-model="listQuery.site" placeholder="小说站点" style="width: 200px;" class="filter-item">
        <el-option :value="undefined">所有站点</el-option>
        <el-option
          v-for="item in sites"
          :key="item.value"
          :label="item.value"
          :value="item.value"
        />
      </el-select>

      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      fit
      highlight-current-row
    >
      <el-table-column label="小说图片" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.img" style="width: 40px;height: 50px" onerror="https://www.23wx.cc/images/no_photo.jpg">
        </template>
      </el-table-column>
      <el-table-column align="center" label="小说名">
        <template slot-scope="scope">
          <a :href="scope.row.url">{{ scope.row.name }}</a>
        </template>
      </el-table-column>

      <el-table-column align="center" label="小说作者">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="小说类别" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="小说简介" align="center">
        <template slot-scope="scope">
          <el-button type="info" @click="showsynopsis(scope.row.synopsis)">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column label="小说章节" align="center" width="160">
        <template slot-scope="scope">
          <a :href="scope.row.lastChapterUrl"><span>{{ scope.row.lastChapter }}</span></a>
        </template>
      </el-table-column>
      <el-table-column label="最后更新时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.updateTime }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="小说作者" align="center">
        <template slot-scope="scope">
          {{ scope.row.author }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="字数">
        <template slot-scope="scope">
          <span>{{ scope.row.wordCount }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="站点">
        <template slot-scope="scope">
          <span>{{ scope.row.website }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="状态">
        <template slot-scope="scope">
          <span>{{ scope.row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="260px"
        align="center"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="handleEdit(scope.row)"
          >编辑
          </el-button>
          <el-button
            type="danger"
            @click="handleDelete(scope.row)"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>listQuery.limit"
      class="pagination"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="fetchData"
    />
    <el-dialog
      title="小说简介"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <span>{{ synopsis }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!--修改表单-->
    <el-dialog title="小说信息修改" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="小说名：" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="小说图片：" :label-width="formLabelWidth">
          <img :src="form.img">
          <el-input v-model="form.img" autocomplete="off" />
        </el-form-item>
        <el-form-item label="小说类别：" :label-width="formLabelWidth">
          <el-input v-model="form.type" autocomplete="off" />
        </el-form-item>
        <el-form-item label="小说简介：" :label-width="formLabelWidth">
          <el-input v-model="form.synopsis" type="textarea" autocomplete="off" style="rows:20" />
        </el-form-item>
        <el-form-item label="小说章节：" :label-width="formLabelWidth">
          <el-input v-model="form.lastChapterUrl" autocomplete="off" />
        </el-form-item>
        <el-form-item label="最后更新时间：" :label-width="formLabelWidth">
          <el-input v-model="form.updatetiem" type="date" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList, update_novel, delete_novel, get_novel_types, get_novel_websites } from '@/api/novel'
import Pagination from '@/components/Pagination'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  components: { Pagination },
  data() {
    return {
      synopsis: '',
      search: '',
      dialogVisible: false,
      dialogFormVisible: false,
      list: null,
      listLoading: true,
      total: 0,
      form: {},
      formLabelWidth: '172px',
      listQuery: {
        page: 1,
        limit: 10
      },
      novelTypes: [],
      sites: []
    }
  },
  mounted() {
    this.fetchData()
    get_novel_types().then((response) => {
      // eslint-disable-next-line no-undef
      response.data.forEach((t) => {
        // eslint-disable-next-line no-undef
        if (t === null || t.trim() === '') { this.novelTypes.push({ 'value': '其他', 'label': '其他' }) } else {
          this.novelTypes.push({ 'value': t, 'label': t })
        }
      })
    })
    get_novel_websites().then((response) => {
      response.data.forEach((item) => {
        if (item === null || item.trim() === '') {
          this.sites.push({ 'value': '其他', 'label': '其他' })
        } else {
          this.sites.push({ 'value': item, 'label': item })
        }
      })
    })
  },
  methods: {
    fetchData() {
      this.listLoading = true
      if (this.search !== '') {
        this.listQuery['search'] = this.search
      }
      getList(this.listQuery).then(response => {
        this.list = response.data.content
        this.total = response.data.totalElements
        this.listLoading = false
      })
    },
    handleClick(row) {
      console.log(row)
    },
    handleEdit(row) { // todo
      this.dialogFormVisible = true
      this.form = row
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delete_novel(row._id).then(() => {
          this.$message({
            message: '用户删除成功',
            type: 'success'
          })
        })
        this.fetchData()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleFilter() {
      getList(this.listQuery).then(response => {
        this.list = response.data.content
        this.total = response.data.totalPages
        this.listLoading = false
      })
    },
    showsynopsis(val) {
      this.dialogVisible = true
      this.synopsis = val
    },
    handleSave() {
      update_novel(this.form)
      this.dialogFormVisible = false
    }
  }
}
</script>
<style scoped>
  .filter-container{
    text-align: right;
  }
</style>
