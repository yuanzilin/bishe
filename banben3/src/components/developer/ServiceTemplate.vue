<template>
  <div>
    <el-card class="box-card">
      <div class="card-head">
        {{this.type_name}}
      </div>
      <Button class="submit_button" type="primary" shape="circle" @click="submitTool">点击提交新服务</Button>
      <submit_service :submit-type="type_value" :dialog-form-visible="dialogVisible" @hideDialog="hideDialog" @getServiceData="getData"></submit_service>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="ID" width="180"></el-table-column>
        <el-table-column prop="service_name" label="名称"></el-table-column>
        <el-table-column prop="service_args" label="服务参数"></el-table-column>
        <el-table-column prop="dev_time" label="提交时间"></el-table-column>
        <el-table-column prop="manage" label="管理此服务">
          <template slot-scope="scope">
            <div>
              <el-button type="danger" round plain size="mini" class="operate_button" @click="deleteService(scope.row)">删除该服务</el-button>
            </div>
          </template>
          <delete-service :delete-i-d="deleteID" @deleteSuccess="deleteSuccess" @hideDelete="hideDelete" :dialog-form-visible="deleteVisible"></delete-service>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import deleteService from "@/components/developer/service/deleteService";
import submit_service from "@/components/developer/submit_service";
export default {
  name: "ServiceTemplate",
  props:{
    //type_name是中文，type_value是英文
    type_name:{
      type:String,
      default:""
    },
    type_value:{
      type:String,
      default: ""
    },
    userType:{
      type:Number,
      default:1
    },
    developerID:{
      type:Number,
      default:-1
    }
  },
  components:{
    submit_service,
    deleteService,
  },
  data(){
    return{
      dialogVisible: false,
      tableData:[],
      deleteID:-1,
      deleteVisible:false
    }
  },
  created() {
    this.getData()
  },
  methods:{
    deleteSuccess(){
      this.hideDelete()
      this.getData()
    },
    hideDelete(){
      this.deleteVisible=false
    },
    deleteService(row){
      this.deleteVisible=true
      this.deleteID=row.id
      console.log(row)
    },
    submitTool(){
      this.dialogVisible=true
    },
    hideDialog(){
      this.dialogVisible=false
    },
    getData(){
      let $this=this;
      console.log("555555,servicetemplate",this.type_value)
      this.$axios.get(this.$server+'/service/getdata',{
        params:{
          //第一个type是区分申请数据者的身份的
          'type': this.userType,
          'dev_name':localStorage["username"],
          'id':this.developerID,
          //这个type是根据服务类型获取不同服务的数据
          'service_type':this.type_value,
        }
      }).then(function (response){
        console.log(response.data)
        $this.tableData=response.data.data
      }).catch(function (error){
        alert("getData返回错误！")
        console.log(error)
      })
    },
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