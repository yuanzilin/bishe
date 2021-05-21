<template>
  <el-card class="box-card">
    <div class="card-head">
      待审核的开发者
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
          prop="invitation"
          label="邀请码">
      </el-table-column>
      <el-table-column
          label="是否通过审核">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" round plain size="mini" class="operate_button" @click="accept(scope.row)">通过</el-button>
          </div>
          <div>
            <el-button type="danger" round plain size="mini" class="operate_button" @click="refuse(scope.row)">不通过</el-button>
          </div>
        </template>
        <ReviewMessage :flag="operateFlag" :dialog-visible="reviewVisible" :review-i-d="reviewID"  @closeDialog="hideReview" @operateSuccess="reviewSuccess"></ReviewMessage>

      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import ReviewMessage from "@/components/administrator/user/ReviewMessage";
export default {
  name: "ReviewDeveloperTable",
  data(){
    return{
      tableData:[],
      deleteID:-1,
      deleteVisible:false,
      reviewVisible:false,
      reviewID:-1,
      operateFlag:-1,
    }
  },
  components:{
    ReviewMessage,
  },
  mounted() {
    this.getAllUser()
  },
  methods:{
    showReview(id){
      this.reviewVisible=true
      this.reviewID=id
    },
    accept(row){
      this.operateFlag=1
      this.showReview(row.id)
    },
    refuse(row){
      this.operateFlag=2
      this.reviewVisible=true
      this.reviewID=row.id
    },
    taskList(row){
      console.log(row)
      this.$router.push('/admin_user_task/'+row.id)
    },
    hideDelete(){
      this.deleteVisible=false
    },
    hideReview(){
      this.reviewVisible=false
    },
    reviewSuccess(){
      this.reviewVisible=false
      this.getAllUser()
      this.$emit("reviewSuccess")
    },
    deleteSuccess(){
      this.hideDelete()
      this.getAllUser()
    },
    getAllUser(){
      let $this=this
      this.$axios.get(this.$server+'/user/getAllUser',{
        params:{
          'type':'developer',
          'status':0
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
  margin: 5px;
  width: 60px;
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