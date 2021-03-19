<template>
  <div id="argConfig">
    <el-container>
      <el-header>
        <Head />
      </el-header>
      <el-main>
        <el-row>
            <el-col :span="8" offset="8">
              <el-card>
                <UploadFile />
              </el-card>
            </el-col>
        </el-row>
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
import UploadFile from "../components/UploadFile";

export default {
  components: {
    Head,
    UploadFile,
  },
};
</script>

