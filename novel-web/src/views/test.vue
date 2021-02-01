<template>
  <div>
    {{ con }}
  </div>
</template>

<script>
import axios from 'axios'

var instance = axios.create({
  timeout: 1000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Access-Control-Allow-Headers': 'x-requested-with,content-type'
  }

})
export default {
  name: 'Test',
  data() {
    return {
      con: ''
    }
  },
  created() {
    instance.get('https://www.baidu.com').then((response) => {
      const html = response.data
      this.con = html
    })
  }
}
</script>

<style scoped>

</style>
