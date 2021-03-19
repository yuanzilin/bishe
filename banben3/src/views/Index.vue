<template>
<div id="Index" >

  <Head @submitSuccess_h="submitSuccess_i"></Head>
  <ProblemTable :flag_t="flag_t"></ProblemTable>
  <ValidateTable :flag_t="flag_v"></ValidateTable>
  <AnalyseTable :flag_t="flag_a"></AnalyseTable>

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
import ProblemTable from "@/components/ProblemTable";
import AnalyseTable from "@/components/AnalyseTable";
import ValidateTable from "@/components/ValidateTable";
export default {
  name:'index',
  data(){
    return{
      flag_t: false,
      flag_a: false,
      flag_v: false
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
    submitSuccess_i(e){
      console.log(66666666663333333333,"index",e)
      // if(e=="test")
        this.flag_t=!this.flag_t
      // if(e=="validate")
        this.flag_v=!this.flag_v
      // if(e=="analyse")
        this.flag_a=!this.flag_a
    }
  },
  components:{
    Head,
    ProblemTable,
    AnalyseTable,
    ValidateTable,
  }
}
</script>

