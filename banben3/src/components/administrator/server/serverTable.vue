<template>
  <el-card class="box-card" style="margin-top: 20px">
    <div class="card-head">
      服务器列表
    </div>
    <Button class="submit_button" type="primary" shape="circle" @click="submitServer">增加服务器</Button>
    <submit-server :dialog-form-visible="submitServerVisible" @hideSubmit="hideSubmit"></submit-server>
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
          label="服务器地址"
          >
      </el-table-column>
      <el-table-column
          prop="user_submit"
          label="工具数量">
      </el-table-column>

      <el-table-column
          prop="address"
          label="管理该服务器">
        <template slot-scope="scope">
          <div >
            <el-button type="danger" round plain size="mini" class="operateButton"  @click="deleteServer(scope.row)">删除该服务器</el-button>
          </div>
        </template>

        <ResultDialog :id="id" :r_dialog-visible="ResultDialogVisible" @closeResultDialog="closeResultDialog"></ResultDialog>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import submitServer from "@/components/administrator/server/submitServer";
export default {
  name: "serverTable",
  components:{
    submitServer,
  },
  data() {
    return {
      submitServerVisible:false,

    }
  },
  methods:{
    submitServer(){

    },
    deleteServer(row){

    },
    hideSubmit(){
      this.submitServerVisible=false
    },

  }
}
</script>

<style scoped>

.submit_button{
  float: right;
  margin-right: 10px;
}

</style>