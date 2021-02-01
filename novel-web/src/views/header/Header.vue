<template>
  <div>
    <el-row>
      <el-menu
        :default-active="activeIndex2"
        class="el-menu"
        mode="horizontal"
        background-color="#07111B"
        text-color="#fff"
        router
        active-text-color="#ffd04b"
        :unique-opened="true"
      >
        <el-col :sm="{span:24}" :md="{span:2}">
          <el-menu-item
            style="border-bottom: 0;text-align: left;"
            index="1"
            class="websiteName"
            route="/"
          >小说网
          </el-menu-item>
        </el-col>
        <el-col v-for="item in types" :key="item" :xs="{span:8}" :sm="{span:8}" :md="{span:2}">
          <el-menu-item :index="item" @click="searchType(item)">{{ item }}</el-menu-item>
        </el-col>
        <el-col :xs="{span:8}" :sm="{span:8}" :md="{span:2}">
          <el-submenu index="7">
            <template slot="title">更多小说</template>
            <el-menu-item v-for="item in moreTypes" :key="item" :index="item" @click="searchType(item)">{{ item }}</el-menu-item>
          </el-submenu>
        </el-col>
        <el-col :xs="{span:8}" :sm="{span:8}" :md="{span:2}">
          <el-submenu index="8">
            <template slot="title">排行榜</template>
            <el-menu-item index="8-1">点击总榜</el-menu-item>
            <el-menu-item index="8-2">推荐总榜</el-menu-item>
            <el-menu-item index="8-3">周排行榜</el-menu-item>
          </el-submenu>
        </el-col>
        <el-col :xs="{span:24}" :sm="{span:24}" :md="{span:5}">
          <el-menu-item>
            <Search />
          </el-menu-item>
        </el-col>
        <el-col :xs="{span:24}" :sm="{span:24}" :md="{span:5}">
          <el-menu-item>
            <div v-show="!isLogin" class="login">
              <el-row>
                <el-col :xs="{span:12}" :sm="{span:8}">
                  <el-button type="primary" @click="dialogLoginFormVisible = true">登录</el-button>
                </el-col>
                <el-col :span="12" >
                  <el-button type="success" @click="dialogRegisterFormVisible = true">注册</el-button>
                </el-col>
              </el-row>
            </div>
            <div v-show="isLogin" class="bookshelf">
              <el-row>
                <el-col :xs="{span:12}" :sm="{span:10}">
                  <el-button type="primary" @click="toNovelShelf">
                    <i class="iconfont icon-books" />
                    我的书架
                  </el-button>
                </el-col>
                <el-col :span="12" >
                  <el-button type="success">
                    <i class="iconfont icon-icon-user" />
                    个人中心
                  </el-button>
                </el-col>
              </el-row>
            </div>
          </el-menu-item>
        </el-col>
        <!-- 登录Form -->
        <el-dialog
          title="登录"
          :fullscreen="true"
          style=" margin-bottom: 100px"
          :visible.sync="dialogLoginFormVisible"
        >
          <el-form :model="form">
            <el-form-item label="用户名:">
              <el-input v-model="form.username" autocomplete="off" />
            </el-form-item>
            <el-form-item label="密码：">
              <el-input v-model="form.password" autocomplete="off" type="password" />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer" style="text-align: center">
            <el-button @click="dialogLoginFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="handlelogin()">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog
          :fullscreen="true"
          title="注册"
          style=" margin-bottom: 100px"
          :visible.sync="dialogRegisterFormVisible"
        >
          <el-form :model="form">
            <el-form-item label="用户名:">
              <el-input v-model="form.username" autocomplete="off" />
            </el-form-item>
            <el-form-item label="密码：">
              <el-input v-model="form.password" autocomplete="off" type="password" />
            </el-form-item>
            <el-form-item label="确认密码：">
              <el-input v-model="form.password2" autocomplete="off" type="password" />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer" style="text-align: center">
            <el-button @click="dialogRegisterFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleregister()">确 定</el-button>
          </div>
        </el-dialog>
      </el-menu>
    </el-row>
  </div>
</template>

<script>

import Search from '@/components/header/Search'
import { mapGetters } from 'vuex'
import { getTypes } from '@/api/novel'
import { register } from '@/api/user'

export default {
  name: 'Header',
  components: { Search },
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      isLogin: false,
      dialogLoginFormVisible: false,
      dialogRegisterFormVisible: false,
      form: {},
      types: [],
      moreTypes: []
    }
  },
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'token',
      'name',
      'userId'
    ])
  },
  created() {
    this.checkLogin()
    getTypes().then((response) => {
      response.data.forEach((item, index) => { if (index < 4) { this.types.push(item) } else { this.moreTypes.push(item) } })
    })
  },
  methods: {
    toNovelShelf() {
      this.$router.push({ name: 'novelShelf' })
    },
    searchType(type) {
      this.$router.push({ name: 'search', query: { type: this.$Base64.encode(type) }})
    },

    checkLogin() {
      if (this.token !== undefined) {
        this.isLogin = true
      }
    },

    handlelogin() {
      this.loading = true
      this.$store.dispatch('user/login', this.form).then(() => {
        // 关闭弹窗
        this.dialogLoginFormVisible = false
        // 显示消息
        this.$message({
          message: '用户登录成功',
          type: 'success'
        })
        this.isLogin = true
      }).catch(() => {
      })
    },
    handleregister() {
      register(this.form).then(() => {
        // 关闭弹窗
        this.dialogRegisterFormVisible = false
        // 显示消息
        this.$message({
          message: '用户注册成功',
          type: 'success'
        })
      })
    }
  }
}
</script>

<style scoped>
  .websiteName {
    padding-left: 20px;
    padding-right: 50px;
    border-bottom: 0px;
    font-family: "Microsoft YaHei";
    font-size: 24px;
  }
  .el-menu-item .el-submenu{
    text-align: center;
  }
</style>
