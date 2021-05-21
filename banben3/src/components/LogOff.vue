<template>
  <div>
    <el-dialog title="提示"
               :before-close="handleClose"
               :visible.sync="dialogFormVisible"
               :append-to-body="true" center>
      <div id="infoWord">
        您确定要注销本账号吗？
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="LogOutUser" >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "LogOff",
  props:{
    dialogFormVisible:{
      type:Boolean,
      default:false
    },
    user_type:{
      type:String,
      default:''
    }
  },
  data(){
    return{

    }
  },
  methods:{
    handleClose(){
      this.$emit("closeLogOut")
    },
    LogOutUser(){
      let $this=this
      this.$axios.post(this.$server+'/user/LogOutUser',{
        'type':this.user_type,
        'username':window.localStorage["username"],
      }).then(function (){
        $this.$message({
          message:"已成功注销",
          type:"success"
        })
        $this.$router.push("/")
      })
      this.handleClose()
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