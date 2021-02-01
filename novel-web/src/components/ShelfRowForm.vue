<template>
  <div>
    <el-dialog title="书架列表" style=" margin-bottom: 100px;" :visible.sync="shelfShow" @close="shelfRowCancel">
      <el-form :model="form" inline>
        <el-checkbox-group v-model="form.type">
          <el-form-item
            v-for="(item,index) in shelfList"
            :key="index"
          >
            <el-checkbox-button
              :label="item.id"
            >
              {{ item.name }}
            </el-checkbox-button>
          </el-form-item>
        </el-checkbox-group>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="shelfRowCancel">取 消</el-button>
        <el-button type="primary" @click="shelfRowSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
import { addRowsToShelf } from '@/api/novelshelf'
export default {
  name: 'ShelfRowForm',
  data() {
    return {
      shelfRowFormVisible: false,
      form: { type: [] }
    }
  },
  computed: {
    ...mapGetters([
      'shelfShow',
      'shelfForm',
      'shelfList',
      'token'
    ])
  },
  created() {
    if (this.token) {
      store.dispatch('shelf/initShelfList')
    }
  },
  methods: {
    shelfRowCancel() {
      store.dispatch('shelf/close')
    },
    shelfRowSave() {
      addRowsToShelf(this.form.type, this.shelfForm.novelId).then((response) => {
        this.$message({
          message: '加入书架成功',
          type: 'success'
        })
      })
      store.dispatch('shelf/close')
    }
  }
}
</script>

<style scoped>
</style>
