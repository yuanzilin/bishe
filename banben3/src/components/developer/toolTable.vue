<template>
  <div>
    <el-card class="box-card">
      <div class="card-head">
        工具
      </div>
      <Button class="submit_button" type="primary" shape="circle" @click="submitTool">点击提交新工具</Button>
      <submit_tool :dialog-form-visible="dialogVisible" @hideDialog="hideDialog" @submitSuccess="submitSuccess"></submit_tool>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="ID" width="180"></el-table-column>
        <el-table-column prop="toolname" label="名称" width="180"></el-table-column>
        <el-table-column prop="version" label="版本"></el-table-column>
        <el-table-column prop="submit_time" label="提交时间"></el-table-column>
        <el-table-column prop="manage" label="管理此工具"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import submit_tool from "@/components/developer/submit_tool";
export default {
  name: "toolTable",
  components:{
    submit_tool,
  },
  data(){
    return{
      dialogVisible: false,
      tableData:[]
    }
  },
  created() {
    this.getAlltool()
  },
  methods:{
    submitSuccess(){
      this.getAlltool()
    },
    getAlltool(){
      let $this=this;
      this.$axios.get(this.$server+'/tool/getdata',{
        params:{
          'type': 1,
          'dev_name':localStorage["username"],
        }
      }).then(function (response){
        console.log(response.data)
        $this.tableData=response.data.data
      })
    },
    submitTool(){
      this.dialogVisible=true
    },
    hideDialog(){
      this.dialogVisible=false
    }
  }

}
</script>

<style scoped>

.submit_button{
  float: right;
  margin-right: 10px;
}

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
  margin-top: 20px;
}

</style>