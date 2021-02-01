<template>
  <div class="app-container">

    <div class="filter-container">
      <el-input
        v-model="search"
        placeholder="小说爬虫站点名"
        style="width: 200px;"
        class="filter-item"
      />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        添加
      </el-button>
    </div>
    <el-row>
      <el-col :span="15">
        <el-alert :closable="false" title="小说站点">
          <el-table
            v-loading="listLoading"
            :data="list"
            element-loading-text="Loading"
            fit
            highlight-current-row
            @row-click="(row, column, event)=>handleRowClick(row)"
          >
            <el-table-column align="center" label="图标" width="150px">
              <template slot-scope="scope">
                <img :src="scope.row.websiteImg">
              </template>
            </el-table-column>
            <el-table-column label="爬虫站点名" align="center" width="150px">
              <template slot-scope="scope">
                {{ scope.row.websiteName }}
              </template>
            </el-table-column>
            <el-table-column label="爬虫站点url" align="center" width="200px">
              <template slot-scope="scope">
                <span>{{ scope.row.websiteUrl }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150px">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                >编辑
                </el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
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
        </el-alert>
      </el-col>
      <el-col :span="6" :offset="2">
        <img :src="img_src" style="width: 100%;height:80% ">
      </el-col>
    </el-row>
    <el-dialog title="小说站点" :visible.sync="dialogFormVisible">
      <el-form>
        <h2>站点信息:</h2>
        <hr>
        <el-row>
          <el-col :span="6">
            <el-form-item label="小说站点名" required>
              <el-input v-model="form.websiteName" placeholder="小说站点名" />
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="2">
            <el-form-item label="小说爬虫站点url" required>
              <el-input v-model="form.websiteUrl" placeholder="小说爬虫站点url" />
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="2">
            <el-form-item label="小说站点图标" required>
              <el-input v-model="form.websiteImg" placeholder="小说站点图标" />
            </el-form-item>
          </el-col>
        </el-row>
        <h2>站点规则：</h2>
        <hr>
        <h3>搜索配置</h3>
        <el-row>
          <el-col :span="20">
            <el-form-item label="搜索url">
              <el-input v-model="form.searchUrl" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="搜索结果xpath">
              <el-input v-model="form.searchInfo" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="小说名 xpath">
              <el-input v-model="form.novelName" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="小说url xpath">
              <el-input v-model="form.novelUrl" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="编码">
              <el-input v-model="form.code" />
            </el-form-item>
          </el-col>
        </el-row>
        <h3>小说信息解析规则</h3>
        <el-row>
          <el-col :span="6">
            <el-form-item label="小说类型xpath">
              <el-input v-model="form.novelType" />
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="2">
            <el-form-item label="小说作者xpath">
              <el-input v-model="form.novelAuthor" />
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="2">
            <el-form-item label="小说字数xpath">
              <el-input v-model="form.wordCount" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="小说封面xpath">
              <el-input v-model="form.novelImgUrl" />
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="2">
            <el-form-item label="小说简介xpath">
              <el-input v-model="form.novelDescription" />
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="2">
            <el-form-item label="小最新章节xpath">
              <el-input v-model="form.novelLatestChapter" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="小说最新章节url xpath">
              <el-input v-model="form.novelLatestChapterUrl" />
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="2">
            <el-form-item label="小说状态xpath">
              <el-input v-model="form.novelStatus" />
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="2">
            <el-form-item label="最新更新时间xpath">
              <el-input v-model="form.novelLastUpdateTime" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="章节列表xpath">
              <el-input v-model="form.novelChaptersUrl" />
            </el-form-item>
          </el-col>
        </el-row>
        <h3>小说章节解析规则</h3>
        <el-row>
          <el-col :span="6">
            <el-form-item label="章节列表信息xpath">
              <el-input v-model="form.chapterListInfo" />
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="2">
            <el-form-item label="小说章节名xpath">
              <el-input v-model="form.chapterName" />
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="2">
            <el-form-item label="小说章节连接xpath">
              <el-input v-model="form.chapterUrl" />
            </el-form-item>
          </el-col>
        </el-row>
        <h3>章节内容解析规则</h3>
        <el-row>
          <el-col :span="6">
            <el-form-item label="小说章节内容xpath">
              <el-input v-model="form.contentInfo" />
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="2">
            <el-form-item label="上一页链接xpath">
              <el-input v-model="form.contentPreviousPage" />
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="2">
            <el-form-item label="下一页链接xpath">
              <el-input v-model="form.contentNextPage" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
// eslint-disable-next-line no-unused-vars
import { getList, del, update, add } from '@/api/novelspiderconfig'
import Pagination from '@/components/Pagination'

export default {
  name: 'ArticleList',
  components: { Pagination },
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
  data() {
    return {
      list: null,
      total: 0,
      search: '',
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      },
      dialogFormVisible: false,
      novel: {},
      formLabelWidth: '120px',
      img_src: '',
      form: {}
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      if (this.search !== '') {
        this.listQuery['search'] = this.search
      }
      getList(null, this.listQuery.page, this.listQuery.limit).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleClick(row) {
      console.log(row)
    },
    handleEdit(index, row) {
      // 清空form
      this.form = {}
      // 显示修改框
      this.dialogFormVisible = true
      // 加载数据
      this.form = row
    },
    handleDelete(row) {
      // todo
    },
    save() {
      if (this.form.id !== undefined && this.form.id !== '') {
        update(this.form).then(() => {
          this.$message({
            message: '提交成功',
            type: 'success'
          })
          this.fetchData()
        })
      } else {
        add(this.form).then(() => {
          this.$message({
            message: '更新成功',
            type: 'success'
          })
        })
      }
      this.form = {}
      this.dialogFormVisible = false
    },
    cancel() {
      this.form = {}
      this.dialogFormVisible = false
    },
    handleSearch() {
      this.fetchData()
    },
    handleRowClick(row) {
      this.img_src = row.websiteImg
    },
    handleCreate() {
      this.dialogFormVisible = true
    },
    handleFilter() {
      getList(this.search, this.listQuery.page, this.listQuery.limit).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.listLoading = false
      })
    }
  }
}
</script>
<style>
    .tool-button {
        margin-left: 10%;
    }

    .el-table {
        margin-top: 30px;
    }

    img {
        width: 60px;
        height: 60px;
    }

    .filter-container {
        margin-right: 5%;
        text-align: right;
        margin-bottom: 20px;
    }
</style>
