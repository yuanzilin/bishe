<template>
  <el-card class="box-card">
    <div class="card-head">
      {{tableType}}
    </div>
    <el-table
        :data="tableData"
        style="width: 100%">
      <el-table-column
          prop="id"
          label="ID"
          >
      </el-table-column>
      <el-table-column
          prop="name"
          label="任务名称"
          >
      </el-table-column>

      <el-table-column
          prop="time_submit"
          label="提交时间">
      </el-table-column>
      <el-table-column
          label="状态">
        <template slot-scope="scope">
          <li :style="activation(statusList[scope.$index])">
            {{statusList[scope.$index]}}
          </li>
        </template>
      </el-table-column>

      <el-table-column
          prop="address"
          label="管理该任务">
          <template slot-scope="scope">
            <div>
              <el-button type="danger" round plain size="mini" class="operateButton"  @click="terminateTask(scope.row)">终止任务</el-button>
            </div>

            <div>
              <el-button type="primary" round plain size="mini" class="operateButton"  @click="viewResult(scope.row)">查看结果</el-button>
            </div>

            <div>
              <el-button type="success" round plain size="mini" class="operateButton"  @click="downloadResult(scope.row)">下载报告</el-button>
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
  name: "UserTaskTable",
  props:{
    flag_t:{
      type:Boolean,
      default:false,
    },
    tableType:{
      type:String,
      default: "",
    }
  },
  components:{
    ResultDialog,
  },
  data() {
    return {
      value:0,
      tableData: [],
      statusList:[],
      ResultDialogVisible: false,
      id:-1,
    }
  },
  computed:{
    activation(){
      return (e)=>{
        console.log(e)
        switch (e){
          case "等待中":
            return {'color':'black'}
          case "运行中":
            return {'color':'blue'}
          case "已完成":
            return {'color':'green'}
          case "已终止":
            return {'color':'red'}
        }
      }
    }
  },
  watch:{
    //相当于监听是否有新任务被提交了，在父组件index.vue中，提交新任务后，会改变flag_t的值
    flag_t(){
      this.getTaskData()
    },

  },
  created(){
    //获取任务数据
    this.getTaskData()
  },
  mounted() {
    // this.timer=setInterval(this.getTaskData,1000)
  },
  methods:{
    terminateTask(row){
      if(row.status==3){
        this.$message({
          message:"该任务已经运行完成，无法终止！",
          type:"error"
        })
        return
      }
      if(row.status==4){
        this.$message({
          message:"该任务已经终止，无须重复执行！",
          type:"error"
        })
        return
      }
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
    get(){
      this.value++
      console.log(this.value)
    },
    getTaskData(){
      let type=''
      switch (this.tableType){
        case "测试任务":
          type="test"
          break
        case "分析任务":
          type="analyse"
          break
        case "验证任务":
          type="validate"
          break
      }
      let $this=this;
      this.$axios.get(this.$server+'/getData',{
        params:{
          'type':type,
          'username':window.localStorage["username"],
        }
      }).then(function (response){
        console.log(response.data)
        $this.tableData=response.data.data
        let len=$this.tableData.length
        for(var i=0;i<len;i++){
          switch($this.tableData[i].status){
            case 1:
              $this.statusList[i]="等待中"
              break
            case 2:
              $this.statusList[i]="运行中"
              break
            case 3:
              $this.statusList[i]="已完成"
              break
            case 4:
              $this.statusList[i]="已终止"
              break
          }
        }
        // console.log($this.statusList)
      })
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