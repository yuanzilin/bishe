<template>
  <div>
    <el-dialog title="提交"
               :before-close="handleClose"
               :visible.sync="dialogFormVisible"
               :append-to-body="true" center>
      <el-form :model="form" ref="submitform">

<!--        在这里写一个选择框-->
        <el-form-item label="选择服务" :label-width="formLabelWidth">
          <el-select v-model="form.subtype" @visible-change="getServiceData" placeholder="请选择" size=medium @change="handleChange">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.service_name">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="任务名称" :label-width="formLabelWidth">
          <el-input v-model="form.problemname" autocomplete="off" placeholder="不超过10个字"></el-input>
        </el-form-item>

        <el-form-item label="运行时间上限" :label-width="formLabelWidth">
          <el-input v-model="form.timeout" autocomplete="off" placeholder="以s为单位"></el-input>
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
          <div slot="tip" class="el-upload__tip">请上传项目文件或者压缩包</div>
        </el-upload>

        <el-upload
            class="upload-demo"
            :action="uploadSetting()"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="getSettingPath"
            :before-remove="beforeRemove"
            multiple
            :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">请上传项目配置文件</div>
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
  name: "SubmitFrame",
  props:{
    dialogFormVisible:{
      type: Boolean,
      default: false
    },
    submitType:{
      type: String,
      default: "test"
    },
    zifuwu:{
      type: String,
      default: ""
    }

  },
  data(){
    return{
      options:[],
      form: {
        subtype: '',
        problemname: '',
        timeout: '',
        Zips_path: '',
        Settings_path:'',
      },
      formLabelWidth: '120px',
      fileList:[],
    }
  },
  watch:{
    dialogFormVisible:{
      handle(){
        this.getServiceData()
      }
    }
  },
  methods:{
    getServiceData(){
      console.log("108108108108,submitframe",this.submitType)
      let $this=this;
      this.$axios.get(this.$server+'/service/getdata',{
        params:{
          //第一个type是区分申请数据者的身份的
          //1表示开发者，2表示管理员，3表示用户
          'type': 3,
          //这个type是根据服务类型获取不同服务的数据
          'service_type':this.submitType,
        }
      }).then(function (response){
        console.log(response.data)
        $this.options=response.data.data
      }).catch(function (error){
        alert("getData返回错误！")
        console.log(error)
      })
    },
    handleChange(){
      this.$forceUpdate()
    },
    //提交表单数据
    onSubmit () {
      let $this=this
      this.$emit('hideDialog')
      $this.$emit('submitSuccess',this.submitType)
      this.dialogFormVisible = false
      console.log(85858585,this.submitType)
      let param = new URLSearchParams()
      console.log(9494949494,window.localStorage["username"])
      param.append('username',window.localStorage["username"])
      param.append('problemName',this.form.problemname)
      param.append('timeout',this.form.timeout)
      param.append('type',this.submitType)
      param.append('zip_path',this.form.Zips_path)
      param.append('settings_path',this.form.Settings_path)
      param.append('subtype',this.form.subtype)
      this.$axios({
        method: "POST",
        url: "/submitForm",
        data: param
      }).then(function(response){
        console.log(94994949494949,response)
      }).catch(function(error){
        console.log(error)
      })

    },
    handleClose(){
      this.$emit('hideDialog')
    },
    uploadZip(){
      return this.$server+'/upload_problemZip'
    },
    handlePreview (file) {
      console.log(file)
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    getFilePath(response){
      console.log(this.$server+response.path)
      this.form.Zips_path=this.$server+response.path
    },
    beforeRemove (file, fileList) {
      console.log(fileList)
      return this.$confirm(`确定移除${file.name}`)
    },
    uploadSetting(){
      return this.$server+'/upload_problemSetting'
    },
    getSettingPath(response){
      console.log(this.$server+response.path)
      this.form.Settings_path=this.$server+response.path
    },


  }
}
</script>

<style scoped>

</style>