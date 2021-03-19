<template>
  <div id="level1">

    <Menu mode="horizontal" :theme="theme1" active-name="1" id="level2_menu">
      <MenuItem name="2">
        <Icon type="ios-people" />
        任务
<!--        -->
      </MenuItem>
      <Submenu name="3">
        <template slot="title">
          <Icon type="ios-stats" />
          服务
        </template>
          <MenuItem name="3-1" @click.native="submitTest">测试</MenuItem>
            <submit-frame :submit-type="type" :dialog-form-visible="dialogVisible" @hideDialog="hideDialog" ></submit-frame>
          <MenuItem name="3-2" @click.native="submitValidate">验证</MenuItem>
            <submit-frame :submit-type="type" :dialog-form-visible="dialogVisible" @hideDialog="hideDialog"></submit-frame>
          <MenuItem name="3-3" @click.native="submitAnalyse">分析</MenuItem>
            <submit-frame :submit-type="type" :dialog-form-visible="dialogVisible" @hideDialog="hideDialog"></submit-frame>
      </Submenu>

<!--      <template>-->
      <div id="wel_lout">
        <li id="welcome">欢迎{{now_username}}</li>
        <i-button
                shape="circle"
                @click="logout"
                id="logout"
        >
          登出
        </i-button>
      </div>

<!--      </template>-->
    </Menu>
    <br>
  </div>
</template>
<script>
import SubmitFrame from './SubmitFrame'
export default {
  name: 'Head',
  components:{
    SubmitFrame,
  },
  data () {
    return {
      now_username: window.localStorage["username"],
      theme1: 'light',
      type:'',
      dialogVisible: false,
      submitdone: false,
    }
  },
  methods: {
    logout(){
      let $this=this
      let param = new URLSearchParams()
      param.append("username",window.localStorage["username"])
      this.$axios({
        method:"POST",
        url:"/user/logout",
        data:param,
      }).then(function (res){
        window.localStorage.removeItem("username")
        console.log(67676767,localStorage["username"])
        console.log(6161616161616161,res)
        $this.$message({
          message:"已退出登录",
          type: "success"
        })
        $this.$router.push("/")
      }).catch(function (error){
        console.log(6868686868,error)
      })
    },
    hideDialog(e){
      console.log(44444444433333333333,"header",e)
      this.$emit('submitSuccess_h',e)
      console.log(4444444466666666666,"header")
      this.dialogVisible=false;
      console.log(40404040,this.dialogVisible);
    },
    submitTest(){
      this.type='test';
      this.dialogVisible=true;
      console.log(this.dialogVisible);
    },
    submitValidate(){
      this.type='validate';
      this.dialogVisible=true;
      console.log(this.type);
    },
    submitAnalyse(){
      this.type='analyse';
      this.dialogVisible=true;
      console.log(this.type);
    }
  }
}
</script>

<style>
/*#level2_menu{*/
/*  width: 100%;*/
/*}*/

/*#level1{*/
/*  width: 100vw;*/
/*}*/

#welcome{
  display:inline-block;
  margin-right: 20px;
}

#logout{
  /*margin: auto;*/
  /*float: right;*/
  display:inline-block;
  margin-right: 20px;
  margin-left: 20px;

}

#wel_lout{
  float: right;
}

</style>
