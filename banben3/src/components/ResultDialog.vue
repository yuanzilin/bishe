<template>
  <div>
    <el-dialog title="查看结果"
                :before-close="handleClose"
                :visible.sync="r_dialogVisible"
                :append-to-body="true"
               center
               width="52%"
                >
      <el-divider style="margin:0 "></el-divider>
        <div id="showResult">
          <pre>
            {{result}}
          </pre>
        </div>
<!--      <div id="showResult">-->
<!--        {{result}}-->
<!--      </div>-->

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleClose" >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ResultDialog",
  props:{
    r_dialogVisible:{
      type:Boolean,
      default:false
    },
    id:{
      type:Number,
      default:-1
    }
  },
  data(){
    return{
      result:"test"
    }
  },
  methods:{
    handleClose(){
      this.$emit("closeResultDialog")
    }
  },
  watch:{
    r_dialogVisible(){
      if(this.r_dialogVisible==true){
        let $this=this
        this.$axios.get(this.$server+'/getResultById',{
          params:{
            id:this.id,
          }
        }).then(function (response){
          console.log("resultdialog.vue",response.data)
          $this.result=response.data.data[0].result
          console.log("resultDialog,result=",$this.result)
        })
      }
    }
  }
}
</script>

<style scoped>
#showResult{
  white-space:pre-line;
}
</style>