<template>
  <div>
    <el-dialog title="提交"
               :before-close="handleClose"
               :visible.sync="dialogFormVisible"
               :append-to-body="true" center>
      <el-form :model="form" ref="submitform">

        <el-form-item label="工具名称" :label-width="formLabelWidth">
          <el-input v-model="form.toolname" autocomplete="off" placeholder="不超过10个字"></el-input>
        </el-form-item>

        <el-form-item label="版本号" :label-width="formLabelWidth">
          <el-input v-model="form.toolVersion" autocomplete="off" placeholder="不超过10个字"></el-input>
        </el-form-item>


        <el-upload
            class="upload-demo"
            :action="uploadTool()"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="getFilePath"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">请上传工具文件</div>
        </el-upload>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="onSubmit" >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "submit_tool",
  props:{
    dialogFormVisible:{
      type: Boolean,
      default: false
    },
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
    onSubmit () {
      let $this=this
      this.$emit('hideDialog')
      this.dialogFormVisible = false
      let param = new URLSearchParams()
      console.log("submit_tool.vue",window.localStorage["username"])
      param.append('tool_uploader',window.localStorage["username"])
      param.append('toolname',this.form.toolname)
      param.append('toolpath',this.form.toolPath)
      param.append('toolversion',this.form.toolVersion)
      this.$axios({
        method: "POST",
        url: "/tool/submit",
        data: param
      }).then(function(response){
        console.log("79,submit_tool.vue",response)
        $this.$emit('submitSuccess')
      }).catch(function(error){
        console.log(error)
      })

    },
    handleClose(){
      this.$emit('hideDialog')
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

</style>