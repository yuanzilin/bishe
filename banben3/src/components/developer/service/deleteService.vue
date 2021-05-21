<template>
  <div>
    <el-dialog title="提示"
               :before-close="handleClose"
               :visible.sync="dialogFormVisible"
               :append-to-body="true" center>
      <div id="infoWord">
        确认删除该服务？
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="deleteService" >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "deleteService",
  props:{
    deleteID:{
      type:Number,
      default:-1,
    },
    dialogFormVisible:{
      type:Boolean,
      default:false,
    }
  },
  methods:{
    handleClose(){
      this.$emit("hideDelete")
    },
    deleteService(){
      let $this=this
      this.$axios.post(this.$server+'/service/deleteService',{
        'id':this.deleteID
      }).then(function(res){
        $this.$message({
          message:res.data.feedback,
          type:"success"
        })
        $this.$emit("deleteSuccess")
      })

    }
  }
}
</script>

<style scoped>
#infoWord{
  font-size: 20px;
  text-align: center;
}

</style>