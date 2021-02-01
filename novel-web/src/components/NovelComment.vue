<template />
<div>
  <h3>评论列表</h3>
  <div class = "CommentBox">
    <tinymce :height="300" v-model="content" id='tinymce'></tinymce>
  </div>
  <div class="CommentList">
    <div class="commentRow">
      <span>XXXX:</span>
    </div>
  </div>

</div>
<script>
export default {
  name: 'NovelComment'
}
</script>

<style scoped>

</style>
