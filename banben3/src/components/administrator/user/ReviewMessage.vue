<template>
  <el-dialog title="提示"
             :before-close="handleClose"
             :visible.sync="dialogVisible"
             :append-to-body="true" center>
    <div id="infoWord">
      {{this.message}}
    </div>

    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="operateSuccess" >确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "ReviewMessage",
  data(){
    return{
      message:"确定要通过该开发者的申请?"
    }
  },
  props:{
    dialogVisible:{
      type:Boolean,
      default: false
    },
    flag:{
      type:Number,
      default:0
    },
    reviewID:{
      type:Number,
      default:-1
    }
  },
  watch:{
    flag(){
      this.changeMessage()
    }
  },
  mounted() {
    this.changeMessage()
  },
  methods:{
    changeMessage(){
      console.log("414141,review-message,flag=",this.flag)
      if(this.flag==1){
        this.message="确定要通过该开发者的申请?"
      }
      if(this.flag==2){
        this.message="确定要拒绝该开发者的申请？"
      }
    },
    handleClose(){
      this.$emit("closeDialog")
    },
    operateSuccess(){
      let $this=this
      this.$axios.post(this.$server+'/user/reviewDeveloper',{
        'id':this.reviewID,
        'flag':this.flag,
      }).then(function (){
        $this.$message({
          message:"审核成功",
          type:"success"
        })
        $this.$emit("operateSuccess")

      })

    },
  }
}
</script>

<style scoped>

#infoWord{
  font-size: 20px;
  text-align: center;
}

</style>