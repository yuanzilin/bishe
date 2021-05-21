<template>
<div id="Index" >

  <Head @submitSuccess_h="submitSuccess_i"></Head>
  <!--  测试任务-->
  <UserTaskTable :flag_t="flag_a" :table-type="testTable"></UserTaskTable>
  <!--  验证任务-->
  <UserTaskTable :flag_t="flag_a" :table-type="validateTable"></UserTaskTable>
  <!--  分析任务-->
  <UserTaskTable :flag_t="flag_a" :table-type="analyseTable"></UserTaskTable>

</div>

</template>


<style>
  .el-header, .el-footer {
    background-color: #ffffff;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 480px;
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

import Head from '../components/Header.vue'
import UserTaskTable from "@/components/UserTaskTable";
export default {
  name:'index',
  data(){
    return{
      flag_t: false,
      flag_a: false,
      flag_v: false,
      analyseTable:"分析任务",
      testTable:"测试任务",
      validateTable:"验证任务",
    }
  },
  mounted(){
    this.$axios({
      method:"GET",
      url:"/getData",
      params:{
        'type':'all',
        'username':localStorage["username"],
      }
    }).then(function (response){
      console.log("index-",response.data)
    })
  },
  methods:{
    submitSuccess_i(){
      console.log(66666666663333333333,"index")
      this.flag_t=!this.flag_t
      this.flag_v=!this.flag_v
      this.flag_a=!this.flag_a
    }
  },
  components:{
    Head,
    // ProblemTable,
    UserTaskTable,
    // ValidateTable,
  }
}
</script>

