<!--这个ToolTable和toolTable的区别在于，首字母大写的ToolTable是管理员视角的工具栏，首字母小写的是开发者视角的工具栏-->
<template>
  <div>
    <el-card class="box-card">
      <div class="card-head">
        工具
      </div>
      <Button class="submit_button" type="primary" shape="circle" @click="submitTool">点击提交新工具</Button>
      <submit_tool :dialog-form-visible="dialogVisible" @hideDialog="hideDialog" @submitSuccess="submitSuccess"></submit_tool>
      <update-tool :update-i-d="updateID" :dialog-form-visible="updateVisible" @hideUpdate="hide(1)" @updateSuccess="success(1)"></update-tool>
      <delete-tool :delete-i-d="deleteID" :dialog-form-visible="deleteVisible" @hideDelete="hide(2)" @deleteSuccess="success(2)"></delete-tool>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="ID" width="180"></el-table-column>
        <el-table-column prop="toolname" label="名称" width="180"></el-table-column>
        <el-table-column prop="version" label="版本"></el-table-column>
        <el-table-column prop="toolDetail" label="功能描述"></el-table-column>
        <el-table-column
            prop="manage"
            label="管理此工具">
          <template slot-scope="scope">
            <div>
              <el-button type="primary" round plain size="mini" class="operate_button" @click="updateTool(scope.row)">升级工具</el-button>
            </div>
            <div>
              <el-button type="success" round plain size="mini" class="operate_button" @click="downloadResult(scope.row)">部署工具</el-button>
            </div>
            <div>
              <el-button type="danger" round plain size="mini" class="operate_button" @click="deleteTool(scope.row)">删除工具</el-button>
            </div>

          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import UpdateTool from "@/components/administrator/tool/UpdateTool";
import submit_tool from "@/components/developer/submit_tool";
import DeleteTool from "@/components/administrator/tool/DeleteTool";
export default {
  name: "ToolTable",
  components:{
    UpdateTool,
    submit_tool,
    DeleteTool,
  },
  data(){
    return{
      updateID:-1,
      deleteID:-1,
      dialogVisible: false,
      tableData:[],
      deleteVisible:false,
      updateVisible:false,
    }
  },
  created() {
    this.getAlltool()
  },
  methods:{
    success(e){
      if(e==1){
        this.updateVisible=false
        this.getAlltool()
      }
      if(e==2){
        this.deleteVisible=false
        this.getAlltool()
      }
    },
    hide(e){
      if(e==1){
        this.updateVisible=false
      }
      if(e==2){
        this.deleteVisible=false
      }
    },
    submitSuccess(){
      this.getAlltool()
    },
    getAlltool(){
      console.log("858585,ToolTable.vue")
      let $this=this;
      this.$axios.get(this.$server+'/tool/getdata',{
        params:{
          'type': 1,
          'dev_name':this.$route.params.developer,
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
    },
    updateTool(row){
      this.updateID=row.id
      this.updateVisible=true
    },
    deleteTool(row){
      console.log(row)
      this.deleteID=row.id
      console.log("102,ToolTable,deleteTool=",this.deleteID)
      this.deleteVisible=true

      // let $this=this;
      // this.$axios.post(this.$server+'/tool/deleteTool',{
      //     'id':row.id
      // }).then(function (){
      //   $this.getAlltool()
      // }).catch(function (e){
      //   console.log(e)
      // })

    }
  }

}
</script>

<style scoped>


.operate_button{
  margin: 5px;
}

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