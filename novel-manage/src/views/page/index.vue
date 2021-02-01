<template>
  <!--  页面 配置主页 -->
  <div>
    <h2>
      轮播图配置
    </h2>
    <div class="toolbox">
      <el-button type="primary" style="float: right;margin-right: 10%;" @click="add">添加</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      fit
      highlight-current-row
      style="width: 80%;margin-left: 10%;margin-top: 70px"
    >
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img class="thumbnail" :src="scope.row.imgUrl" alt="轮播图片">
        </template>
      </el-table-column>

      <el-table-column label="小说链接">
        <template slot-scope="scope">
          {{ scope.row.novelUrl }}
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
    <h2 style="padding-top: 30px">效果预览</h2>
    <div class="block">
      <el-carousel height="400px" style="width: 80%;margin-left:10%">
        <el-carousel-item v-for="item in list" :key="item.id">
          <img style="height: 100%;width: 100%" :src="item.imgUrl">
        </el-carousel-item>
      </el-carousel>
    </div>
    <el-dialog title="轮播图信息" :visible.sync="dialogFormVisible" style="margin-bottom: 100px">
      <el-form :model="form">
        <el-form-item label="缩略图">
          <el-input v-model="form.imgUrl" autocomplete="off" />
        </el-form-item>
        <el-form-item label="小说链接">
          <el-input v-model="form.novelUrl" autocomplete="off" />
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
import { getList, saveCarousel, updateCarousel, getOne, deleteOne } from '@/api/carousel'
export default {
  name: 'Index',
  data() {
    return {
      list: [],
      form: {},
      listLoading: true,
      dialogFormVisible: false
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getList().then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    handleEdit(row) {
      getOne(row.id).then(response => {
        this.form = response.data
        this.dialogFormVisible = true
      })
    },
    add() {
      this.dialogFormVisible = true
    },
    cancel() {
      this.form = {}
      this.dialogFormVisible = false
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteOne(row.id).then(() => {
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
    save() {
      if (this.form.id === null || this.form.id === undefined) {
        saveCarousel(this.form).then(response => {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.fetchData()
        })
      } else {
        updateCarousel(this.form).then(response => {
          this.$message({
            message: '更新成功',
            type: 'success'
          })
          this.fetchData()
        })
      }
      this.dialogFormVisible = false
    }
  }
}
</script>

<style scoped>
  h2 {
    margin-left: 5%;
  }
  .thumbnail{
    width: 100px;
    height: 100px;
  }
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
