<template>
  <div>
    <el-dialog title="提交"
               :before-close="handleClose"
               :visible.sync="dialogFormVisible"
               :append-to-body="true" center>
      <el-form :model="form" ref="submitform">

        <el-form-item label="服务名称" :label-width="formLabelWidth">
          <el-input v-model="form.servicename" autocomplete="off" placeholder="不超过10个字"></el-input>
        </el-form-item>

        <el-upload
            class="upload-demo"
            :action="uploadZip()"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="getFilePath"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">请上传该服务和所需工具的关系文件（可以是jar包、bat脚本文件等）</div>
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
  name: "submit_service",
  props:{
    dialogFormVisible:{
      type: Boolean,
      default: false
    },
    submitType: {
      type:String,
      default: ""
    }

  },
  data(){
    return{
      service_developer:'',
      form: {
        servicename:'',
        servicePath:'',
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
      $this.$emit('submitSuccess',this.submitType)
      this.dialogFormVisible = false
      let param = new URLSearchParams()
      param.append('developer',window.localStorage["username"])
      param.append('service_name',this.form.servicename)
      param.append('type',this.submitType)
      param.append('service_file',this.form.servicePath)

      console.log("707070707070",param.get('service_file'))
      this.$axios({
        method: "POST",
        url: "/service/submit",
        data: param
      }).then(function(response){
        console.log("80,submit_service",response)
        $this.$emit('getServiceData')
      }).catch(function(error){
        console.log(error)
      })

    },
    handleClose(){
      this.$emit('hideDialog')
    },
    uploadZip(){
      return this.$server+'/service/upload_service'
    },
    handlePreview (file) {
      console.log(file)
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    getFilePath(response){
      console.log(this.$server+response.path)
      this.form.servicePath=this.$server+response.path
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