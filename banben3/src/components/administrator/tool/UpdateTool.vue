<template>
  <div>
    <el-dialog title="升级工具版本"
               :before-close="handleClose"
               :visible.sync="dialogFormVisible"
               :append-to-body="true" center>
      <el-form :model="form" ref="submitform">

        <el-form-item label="输入新的版本号" :label-width="formLabelWidth">
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
  name: "UpdateTool",
  props:{
    dialogFormVisible:{
      type: Boolean,
      default: false
    },
    updateID:{
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
    onSubmit () {
      let $this=this
      this.$emit('hideDialog')
      this.dialogFormVisible = false

      this.$axios.post(this.$server+'/tool/updateTool',{
        'id':this.updateID,
        'toolpath':this.form.toolPath,
        'version':this.form.toolVersion
      }).then(function(response){
        console.log("70,UpdateTool.vue",response)
        $this.$emit('updateSuccess')
      }).catch(function(error){
        console.log(error)
      })

    },
    handleClose(){
      this.$emit('hideUpdate')
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