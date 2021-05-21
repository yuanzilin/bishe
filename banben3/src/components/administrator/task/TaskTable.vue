<template>
  <el-card class="box-card" style="margin-top: 20px">
    <div class="card-head">
      {{this.tableName}}
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
          label="任务名称"
          width="180">
      </el-table-column>
      <el-table-column
        prop="user_submit"
        label="用户名">
      </el-table-column>
      <el-table-column
          prop="subtype"
          label="所使用的服务">
      </el-table-column>
      <el-table-column
          prop="time_submit"
          label="提交时间">
      </el-table-column>
      <el-table-column
          prop="time_limit"
          label="运行上限(s)">
      </el-table-column>
      <el-table-column
          prop="address"
          label="管理该任务">
        <template slot-scope="scope">
          <div v-if="showTerminateButton">
            <el-button type="danger" round plain size="mini" class="operateButton"  @click="terminateTask(scope.row)">终止任务</el-button>
          </div>

          <div v-if="showResultButton">
            <el-button type="primary" round plain size="mini" class="operateButton"  @click="viewResult(scope.row)">查看结果</el-button>
          </div>

          <div v-if="showResultButton">
            <el-button type="success" round plain size="mini" class="operateButton"  @click="downloadResult(scope.row)">下载报告</el-button>
          </div>

          <div v-if="showDeleteButton">
            <el-button type="danger" round plain size="mini" class="operateButton"  @click="deleteTask(scope.row)">删除任务</el-button>
          </div>
        </template>

        <ResultDialog :id="id" :r_dialog-visible="ResultDialogVisible" @closeResultDialog="closeResultDialog"></ResultDialog>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import ResultDialog from "@/components/ResultDialog";
export default {
  name: "TaskTable",
  props:{
    flag_t:{
      type:Boolean,
      default:false,
    },
    taskType:{
      type:Number,
      default:1,
    },
    userID:{
      type:Number,
      default:0
    },

  },
  components:{
    ResultDialog,
  },
  data() {
    return {
      ResultDialogVisible: false,
      tableData: [],
      tableName:"已完成",
      showTerminateButton:false,
      showDeleteButton:false,
      showResultButton:false,
    }
  },
  watch:{
    flag_t(){
      let $this=this;
      this.$axios.get(this.$server+'/getData',{
        params:{
          'type':'test',
          'username':window.localStorage["username"],
        }
      }).then(function (response){
        console.log(response.data)
        $this.tableData=response.data.data
      })
    }
  },
  created(){
    console.log("tasktable.vue",this.$route.params.id)
    console.log('taskTable.vue',this.userID)
    switch(this.taskType){
      case 1:
        this.tableName="等待运行的任务"
        this.showTerminateButton=true

        break
      case 2:
        this.tableName="正在运行的任务"
        this.showTerminateButton=true
        break
      case 3:
        this.tableName="已完成的任务"
        this.showTerminateButton=false
        this.showResultButton=true
        this.showDeleteButton=true
        break
      case 4:
        this.tableName="已终止的任务"
        this.showDeleteButton=true
        break
    }
    this.getTaskData()
  },
  mounted() {
    // this.timer=setInterval(this.getTaskData,1000)
  },
  methods:{
    deleteTask(row){
      let $this=this
      console.log("139,deleteTask")
      this.$axios.post(this.$server+'/deleteTask',{
        'id':row.id
      }).then(function (res){
        console.log(res)
        $this.$message({
          message:"删除任务成功",
          type:"success"
        })
      })
    },
    getTaskData(){
      let $this=this;
      this.$axios.get(this.$server+'/getTaskDataByStatus',{
        params:{
          'status':this.taskType,
          'id':this.userID
        }
      }).then(function (response){
        console.log(response.data)
        $this.tableData=response.data.data
      })
    },
    downloadResult(row){
      if(row.status!=3){
        this.$message({
          message:"该任务并未运行完成，无法下载报告！",
          type:"error"
        })
        return
      }
      this.id=row.id
      console.log("analysetable.vue,downloadresult",this.id)
      window.open(this.$server+'/download_result?id='+this.id,"_blank")
    },
    viewResult(row){
      if(row.status!=3){
        this.$message({
          message:"该任务并未运行完成，无法查看结果！",
          type:"error"
        })
        return
      }
      this.id=row.id
      this.ResultDialogVisible=true
    },
    terminateTask(row){
      console.log("130130130,row.id=",row.id)
      let $this=this
      this.$axios.post(this.$server+'/terminateTask',{
        'id':row.id
      }).then(function (){
        $this.$message({
          message:"终止成功",
          type:"success"
        })
      })
    },
    closeResultDialog(){
      this.ResultDialogVisible=false
    },
  }
}
</script>

<style scoped>
.operateButton{
  margin:5px 0
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
}

</style>