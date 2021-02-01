<template>
  <div class="book-info">
    <el-row>
      <el-col :md="{span:24}" :lg="{span:22,offset:1}">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="line">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ novel.type }}</el-breadcrumb-item>
          <el-breadcrumb-item>{{ novel.name }}</el-breadcrumb-item>
        </el-breadcrumb>
        <book-info />
        <ChaperList class="chapter" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import BookInfo from '@/components/BookInfo'
import ChaperList from '@/components/ChaperList'
import { mapGetters } from 'vuex'

export default {
  name: 'Chapter',
  components: { ChaperList, BookInfo },
  computed: {
    ...mapGetters([
      'novel'
    ])
  }

}
</script>

<style scoped>
    .line {
        margin-top: 30px;
        border-radius: 25px;
        padding: 20px;
        background: white;
    }
</style>
