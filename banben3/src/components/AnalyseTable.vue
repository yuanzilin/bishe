<template>
  <el-card class="box-card">
    <div class="card-head">
      分析任务
    </div>
    <el-table
        :data="tableData"
        style="width: 100%">
      <el-table-column
          prop="id"
          label="ID"
          width="180">
      </el-table-column>
      <el-table-column
          prop="name"
          label="名称"
          width="180">
      </el-table-column>
      <el-table-column
          prop="subtype"
          label="服务名称">
      </el-table-column>
      <el-table-column
          prop="time_submit"
          label="提交时间">
      </el-table-column>
      <el-table-column
          prop="status"
          label="状态">
      </el-table-column>
      <el-table-column
          prop="time_limit"
          label="运行上限">
      </el-table-column>
      <el-table-column
          prop="address"
          label="查看结果">
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  name: "AnalyseTable",
  props:{
    flag_t:{
      type:Boolean,
      default:false,
    }
  },
  data() {
    return {
      tableData: []
    }
  },
  watch:{
    flag_t(){
      console.log(555555555555,"ptable")
      let $this=this;
      this.$axios.get(this.$server+'/getData',{
        params:{
          'type':'analyse',
          'username':window.localStorage["username"],
        }
      }).then(function (response){
        console.log(response.data)
        $this.tableData=response.data.data
      })
    }
  },
  created(){
    let $this=this;
    this.$axios.get(this.$server+'/getData',{
      params:{
        'type':'analyse',
        'username':localStorage["username"],
      }
    }).then(function (response){
      console.log(response.data)
      $this.tableData=response.data.data
    })
  },
}
</script>

<style scoped>
.card-head{
  font-size: 25px;
  float:left;
  margin-bottom: 5px;
}

.box-card{
  margin-bottom: 15px;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix{
  margin-left: 10px;
}


.box-card {
  width: auto;
  margin-right: 5%;
  margin-left: 5%;
}

</style>