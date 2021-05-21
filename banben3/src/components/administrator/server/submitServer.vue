<template>
  <div>
    <el-dialog title="提交"
               :before-close="handleClose"
               :visible.sync="dialogFormVisible"
               :append-to-body="true" center>
      <el-form :model="form" ref="submitform">

        <el-form-item label="服务名称" :label-width="formLabelWidth">
          <el-input v-model="form.service_name" autocomplete="off" placeholder="不超过10个字"></el-input>
        </el-form-item>

        <el-form-item label="服务说明" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="3" v-model="form.service_intro" autocomplete="off" placeholder="请描述该服务的输入和输出"></el-input>
        </el-form-item>

        <el-form-item label="服务参数" :label-width="formLabelWidth">
          <el-input v-model="form.service_args" autocomplete="off" placeholder="请输入该服务所需的参数，用于平台运行该服务(如果没有可以不用填)"></el-input>
        </el-form-item>

        <el-form-item label="选择工具" :label-width="formLabelWidth">
          <el-checkbox-group
              v-model="form.service_tool"
              :max="10">
            <el-checkbox v-for="tool in toolList"  :label="tool.toolname" :key="tool.toolname">{{tool.toolname}}</el-checkbox>
          </el-checkbox-group>
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
          <div slot="tip" class="el-upload__tip">如果需要进一步处理输出的信息，请上传对结果进行处理的python文件</div>
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
  name: "submitServer",
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
        service_name:'',
        service_intro:'',
        service_args:'',
        service_tool:[],
        service_file:'',
      },
      formLabelWidth: '120px',
      fileList:[],
      toolList:[],
    }
  },
  watch:{
    dialogFormVisible(){
      this.getAlltool()
      console.log(this.toolList)
    },
  },
  methods:{
    //获取工具列表
    getAlltool(){
      let $this=this;
      this.$axios.get(this.$server+'/tool/getdata',{
        params:{
          'type': 2,
          'dev_name':'all',
        }
      }).then(function (response){
        console.log(response.data)
        $this.toolList=response.data.data
      })
    },

    //提交表单数据
    onSubmit () {
      let $this=this
      this.$emit('hideSubmit')
      $this.$emit('submitSuccess',this.submitType)
      this.dialogFormVisible = false
      console.log("108108108,submit_service.vue,service_tool=",this.form.service_tool)
      this.$axios.post(this.$server+"/service/submit",{
        'service_name':this.form.service_name,
        'service_intro':this.form.service_intro,
        'service_args':this.form.service_args,
        'service_tool':this.form.service_tool,
        'service_file':this.form.service_file,
        'service_developer':localStorage["username"],
        'type':this.submitType,
      }).then(function(response){
        console.log("80,submit_service",response)
        $this.$emit('getServiceData')
      }).catch(function(error){
        console.log(error)
      })

    },
    handleClose(){
      this.$emit('hideSubmit')
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