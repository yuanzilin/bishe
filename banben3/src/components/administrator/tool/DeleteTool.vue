<template>
  <div>
    <el-dialog title="提示"
               :before-close="handleClose"
               :visible.sync="dialogFormVisible"
               :append-to-body="true" center>
      <div id="infoWord">
        确认删除此工具？
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="deleteTool" >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "DeleteTool",
  props:{
    dialogFormVisible:{
      type: Boolean,
      default: false
    },
    deleteID:{
      type:Number,
      default: -1
    }
  },
  data(){
    return{
      tool_uploader:'',
      form: {
        toolname:'',
        toolPath:'',
        toolVersion:'',
      },
      formLabelWidth: '120px',
      fileList:[],
    }
  },
  methods:{
    //提交表单数据
    deleteTool () {
      let $this=this
      this.dialogFormVisible = false
      this.$axios.post(this.$server+'/tool/deleteTool',{
        'id':this.deleteID
      }).then(function(response){
        console.log("52,DeleteTool.vue",response)
        $this.$message({
          message:"删除工具成果",
          type:"success"
        })
        $this.$emit('deleteSuccess')
      }).catch(function(error){
        console.log(error)
      })


    },
    handleClose(){
      this.$emit('hideDelete')
    },
    //
    uploadTool(){
      console.log("94949494,submit-tool")
      return this.$server+'/tool/upload_Tool'
    },
    handlePreview (file) {
      console.log(file)
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    getFilePath(response){
      console.log(this.$server+response.path)
      this.form.toolPath=this.$server+response.path
    },
    beforeRemove (file, fileList) {
      console.log(fileList)
      return this.$confirm(`确定移除${file.name}`)
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