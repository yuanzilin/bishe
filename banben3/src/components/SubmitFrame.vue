<template>
  <div>
    <el-dialog title="提交"
               :before-close="handleClose"
               :visible.sync="dialogFormVisible"
               :append-to-body="true" center>
      <el-form :model="form" ref="submitform">

<!--        在这里写一个选择框-->
        <el-form-item label="选择服务" :label-width="formLabelWidth">
          <el-select v-model="subtype" @change="getServiceIntro" @visible-change="getServiceData" placeholder="请选择" size=medium >
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.service_name">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="该服务的说明" :label-width="formLabelWidth" :visible="introVisible">
          <p style="white-space: pre-wrap">
            {{service_intro}}
          </p>
        </el-form-item>

        <el-form-item label="运行时间上限" :label-width="formLabelWidth">
          <el-select v-model="form.timeout" @visible-change="getServiceData" placeholder="请选择" size=medium >
            <el-option
                v-for="item in timeout"
                :key="item.value"
                :label="item.label"
                :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="任务名称" :label-width="formLabelWidth">
          <el-input v-model="form.problemname" autocomplete="off" placeholder="不超过10个字"></el-input>
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
          <div slot="tip" class="el-upload__tip">请上传项目文件</div>
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
      introVisible:false,
      service_intro:'',
      options:[],
      timeout:[
        {
          value:'1',
          label:'10s'
        }, {
          value:'2',
          label:'20s'
        }, {
          value:'3',
          label:'50s'
        }
      ],
      subtype:'',
      form: {
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
    dialogFormVisible(){
      this.getServiceData()
    }
  },
  methods:{
    getServiceIntro(){
      this.introVisible=false
      let $this=this
      this.$axios.get(this.$server+'/service/getServiceIntro',{
        params:{
          'service_name':this.subtype
        }
      }).then(function (res){
        console.log(res.data.data)
        //用正则实现换行功能
        $this.service_intro=res.data.data
      })
    },
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
    //提交表单数据
    onSubmit () {
      console.log("169169")
      let $this=this
      $this.$emit('submitSuccess',this.submitType)
      let loading = this.$loading({
        lock:true,
        text:"提交中，请稍候...",

        // spinner:"el-icon-loading",
        background:'rgba(0,0,0,0.5)'
      })
      this.$axios.post(this.$server+'/submitForm',{
        //用户名username
        "username":window.localStorage["username"],
        //任务名problemName
        "problemName":this.form.problemname,
        //运行上限timeout
        "timeout":this.form.timeout,
        //任务文件Zips_file
        "Zips_file":this.form.Zips_path,
        //服务配置文件？先把它写上去
        "settings_path":this.form.Settings_path,
        //服务的具体名称
        "subtype":this.subtype,
        //服务的分类
        "type":this.submitType,

      }).then(function(response){
        console.log("SubmitFrame.vue",response)
        $this.$emit('hideDialog')
        loading.close()
        $this.$message({
          message:"提交成功",
          type:"success"
        })

        //清空提交框的内容
        $this.subtype=''
        $this.service_intro=''
        $this.form.timeout=''
        $this.form.problemname=''
        $this.fileList=[]
      }).catch(function(error){
        console.log(error)
      })

    },
    handleClose(){
      this.subtype=''
      this.service_intro=''
      this.form.timeout=''
      this.form.problemname=''
      this.fileList=[]
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