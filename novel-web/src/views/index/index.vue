<template>
  <el-row>
    <el-col>
      <div class="contents" :xl="{span:20,offset:2}" :lg="{span:22,offset: 1}">
        <el-row>
          <el-col :xs="{span:0}" :md="{span:24}" :lg="{span:22,offset:1}">
            <rotate />
          </el-col>
        </el-row>
        <div class="list">
          <el-row>
            <el-col :md="{span:24}" :lg="{span:12,offset:2}">
              <top-list class="top-list" />
            </el-col>
            <el-col :md="{span:24}" :lg="{span:8,offset:1}">
              <table-list class="table-list" />
            </el-col>
          </el-row>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import TopList from '@/components/TopList'
import TableList from '@/components/TableList'
import Rotate from '@/components/Rotate'

export default {
  name: 'Index',
  components: { TopList, TableList, Rotate },
  computed: {

  }
}
</script>

<style scoped>
</style>
