<template>
  <el-row>
    <el-col :span="inputWith" class="input_box">
      <el-input
        v-model="searchNovel"

        placeholder="小说名\作者"
        @focus="handleFocus"
        @blur="handerBlur"
      />
    </el-col>
    <el-col :span="4" :offset="1">
      <el-button type="primary" @click="searchKey">搜索</el-button>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'SearchBox',
  data() {
    return {
      searchNovel: '',
      inputWith: 14
    }
  },
  methods: {
    searchKey() {
      if (this.searchNovel.trim() === '') {
        return
      }
      this.$router.push({
        name: 'search', query: { key: this.$Base64.encode(this.searchNovel.trim()) }})
    },
    handleFocus() {
      this.inputWith = 18
    },
    handerBlur() {
      this.inputWith = 14
    }
  }

}
</script>

<style scoped>
  .input_box{
    transition:width 0.5s;
  }
</style>
