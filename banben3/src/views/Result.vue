<template>
  <div id="result">
    <el-container>
      <el-header>
        <Head />
      </el-header>
      <el-main>
          <OnShow/>
      </el-main>
    </el-container>
  </div>
</template>

<style>
.el-header{
  background-color: #d0d8dd;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-main {
  background-color: #ffffff;
  text-align: center;
  line-height: 100%;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>

<script>
import Head from "../components/Header.vue";
import OnShow from "../components/OnShow.vue";
export default {
    components:{
        Head,
        OnShow
    }
}
</script>