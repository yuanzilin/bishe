<template>
  <div id="level1">

    <Menu active-name="toolTable" mode="horizontal" :theme="theme1"  id="level2_menu"  @on-select="handleRoute">
      <MenuItem name="toolTable">
        <Icon type="ios-people" />
        工具
        <!--        -->
      </MenuItem>
      <MenuItem name="ServiceTable">
        <Icon type="ios-stats" />
        服务
        <!--        -->
      </MenuItem>

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

    <div :is="myComponent"></div>


    <br>
  </div>
</template>
<script>
import SubmitFrame from "@/components/SubmitFrame";
import toolTable from "@/components/developer/toolTable";
import ServiceTable from "@/components/developer/ServiceTable";
// import AnalyseService from "@/components/developer/AnalyseService";
// import ValidateService from "@/components/developer/ValidateService";
// import TestService from "@/components/developer/TestService";
export default {
  name: 'developer_header',
  components:{
    SubmitFrame,
    toolTable,
    ServiceTable,
    // AnalyseService,
    // ValidateService,
    // TestService,
  },
  data () {
    return {
      myComponent:toolTable,
      now_username: window.localStorage["username"],
      theme1: 'light',
      type:'',
      dialogVisible: false,
      submitdone: false,
    }
  },
  methods: {
    handleRoute(name){
      this.myComponent=name
      console.log(7474747474,this.myComponent)
    },
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
