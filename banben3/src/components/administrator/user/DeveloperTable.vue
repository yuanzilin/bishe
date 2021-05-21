<template>
  <el-card class="box-card">
    <div class="card-head">
      开发者
    </div>
    <el-table
        :data="tableData"
        style="width: 100%">
      <el-table-column
          prop="id"
          label="ID">
      </el-table-column>
      <el-table-column
          prop="username"
          label="用户名">
      </el-table-column>
      <el-table-column
          prop="serviceNumber"
          label="开发的服务数量">
      </el-table-column>
      <el-table-column
          prop="toolNumber"
          label="提交的工具数量">
      </el-table-column>
      <el-table-column
          label="管理该开发者">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" round plain size="mini" class="operate_button" @click="serviceList(scope.row)">服务列表</el-button>
          </div>
          <div>
            <el-button type="primary" round plain size="mini" class="operate_button" @click="ToolList(scope.row)">工具列表</el-button>
          </div>
          <div>
            <el-button type="danger" round plain size="mini" class="operate_button" @click="deleteUser(scope.row)">删除该开发者</el-button>
          </div>

        </template>
        <DeleteUser :delete-type="deleteType" :delete-i-d="deleteID" :dialog-form-visible="deleteVisible" @hideDelete="hideDelete" @deleteSuccess="deleteSuccess" ></DeleteUser>

      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import DeleteUser from "@/components/administrator/user/DeleteUser";

export default {
  name: "DeveloperTable",
  data(){
    return{
      tableData:[],
      deleteID:-1,
      deleteVisible:false,
      deleteType:"developer",
    }
  },
  props:{
    refresh:{
      type:Boolean,
      default:false
    }
  },
  components:{
    DeleteUser,
  },
  mounted() {
    this.getAllUser()
  },
  watch:{
    refresh(){
      this.getAllUser()
    }
  },
  methods:{
    ToolList(row){
      console.log(row)
      this.$router.push('/admin_developer_tool/'+row.username)
    },
    serviceList(row){
      console.log(row)
      this.$router.push('/admin_developer_service/'+row.id)
    },
    taskList(row){
      console.log(row)
      this.$router.push('/admin_user_task/'+row.id)
    },
    hideDelete(){
      this.deleteVisible=false
    },
    deleteSuccess(){
      this.hideDelete()
      this.getAllUser()
    },
    deleteUser(row){
      this.deleteID=row.id
      this.deleteVisible=true
    },
    getAllUser(){
      let $this=this
      this.$axios.get(this.$server+'/user/getAllUser',{
        params:{
          'type':'developer',
          'status':1
        }
      }).then(function (res){
        console.log(res.data)
        $this.tableData=res.data.data
        console.log("tableData=",$this.tableData)
      })
    },
  }
}
</script>

<style scoped>
.operate_button{
  width: 100px;
  margin: 5px;
  text-align: center;
}

.card-head{
  font-size: 25px;
  float:left;
  margin-bottom: 5px;
}

.box-card {
  width: auto;
  margin-right: 5%;
  margin-left: 5%;
  margin-top: 20px
}

</style>