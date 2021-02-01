<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="用户名" width="100px">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column label="头像" align="center" width="100px">
        <template slot-scope="scope">
          <img :src="scope.row.icon">
        </template>
      </el-table-column>
      <el-table-column label="邮件" align="center" width="200px">
        <template slot-scope="scope">
          <span>{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="昵称" align="center" width="140px">
        <template slot-scope="scope">
          {{ scope.row.nickName }}
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" width="200px">
        <template slot-scope="scope">
          {{ scope.row.note }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" align="center" width="100px">
        <template slot-scope="scope">
          <el-tag >{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="最后的登录时间" :show-overflow-tooltip="true" width="200px">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.loginTime| dateformat('YYYY-MM-DD HH:mm:ss') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="260px"
      >
        <template slot="header">
          <div style="display: flex">
            <el-input
              v-model="search"
              style="flex: 6"
              placeholder="输入关键字搜索"
            />
            <el-button type="primary" size="mini" plain style="padding: 10px;flex: 1" @click="handleSearch">搜索
            </el-button>
          </div>
        </template>
        <template slot-scope="scope" class="tool-button">
          <el-button
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑
          </el-button>
          <el-button
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

    <el-dialog title="用户信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="头像" :label-width="formLabelWidth">
          <img :src="form.icon">
          <el-input v-model="form.icon" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="邮箱"
          :label-width="formLabelWidth"
          prop="email"
          :rules="[
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ]"
        >
          <el-input v-model="form.email" autocomplete="off" />
        </el-form-item>
        <el-form-item label="昵称" :label-width="formLabelWidth">
          <el-input v-model="form.nickName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="备注信息" :label-width="formLabelWidth">
          <el-input v-model="form.note" autocomplete="off" />
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
          />
        </el-form-item>
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
import { getList, remove_user, add_user, edit_user } from '@/api/user2'
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
      form: {},
      formLabelWidth: '120px'
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
      getList(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleClick(row) {
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
      // userid 存在则修改，不存在则添加
      this.form.status = this.form.status === true ? 1 : 0
      if (this.form.id) {
        edit_user(this.form).then(() => {
          this.$message({
            message: '用户修改成功',
            type: 'success'
          })
        })
      } else {
        add_user(this.form).then(() => {
          this.$message({
            message: '用户添加成功',
            type: 'success'
          })
        })
      }
      this.dialogFormVisible = false
    },
    cancel() {
      this.form = {}
      this.dialogFormVisible = false
    },
    handleSearch() {
      this.fetchData()
    }
  }
}
</script>
<style>
  .tool-button {
    margin-left: 10%;
  }

  img {
    width: 60px;
    height: 60px;
  }
</style>
