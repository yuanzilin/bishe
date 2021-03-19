<template>
  <div id="login">
    <!--flex弹性盒子模型，justify-content：主抽 -->
    <div style="display: flex; justify-content: center; margin-top: 150px">
      <el-card style="width: 400px">
        <div slot="header" class="clearfix">
          <span>登录</span>
        </div>
        <table style="margin-left: auto;margin-right: auto">
          <tr>
            <td>用户名</td>
            <td>
              <el-input
                style="margin: 10px 0px"
                v-model="user.username"
                placeholder="请输入用户名"
              ></el-input>
            </td>
          </tr>
          <tr>
            <td>密码</td>
            <td>
              <el-input
                style="margin: 10px 0px"
                type="password"
                v-model="user.password"
                placeholder="请输入密码"
                @keydown.enter.native="doLogin"
              ></el-input>
              <!-- @keydown.enter.native="doLogin"当按下enter键的时候也会执行doLogin方法-->
            </td>
          </tr>
          <tr>
            <!-- 占两行-->
            <td colspan="2">
              <!-- 点击事件的两种不同的写法v-on:click和 @click-->
              <!--<el-button style="width: 300px" type="primary" v-on:click="doLogin">登录</el-button>-->
              <div style="display: flex; justify-content: center">
                <el-button class="login_button" type="primary" @click="userLogin">用户登录</el-button>
                <el-button class="login_button" type="primary" @click="developerLogin">开发者登录</el-button>
                <el-button class="login_button" type="primary" @click="adminLogin">管理员登录</el-button>
              </div>
              <div style="margin-top: 20px">
                <span
                      style="
                      margin-left: 10px;
                      text-align: left;
                      font-size: 14px;
                      color: #82848a;
                    "
                  >
                    <a
                        style="color: black;cursor:default"
                        :style="active"
                        @click="doRegister"
                        @mouseover="mouseOver"
                        @mouseleave="mouseLeave"
                    >用户注册</a>
                  </span>
                <span
                    style="
                      margin-left: 20px;
                      text-align: left;
                      font-size: 14px;
                      color: #82848a;
                    "
                >
                    <a
                        style="color: black;cursor:default"
                        :style="developer_active"
                        @click="developerRegister"
                        @mouseover="d_mouseOver"
                        @mouseleave="d_mouseLeave"
                    >开发者注册</a>
                  </span>
              </div>
            </td>
          </tr>
        </table>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  //单页面中不支持前面的data:{}方式
  data() {
    //相当于以前的function data(){},这是es5之前的写法，新版本可以省略掉function
    return {
      //之前是在里面直接写username，password等等，但是这里要写return
      //因为一个组件不管要不要被其他组件用，只要这样定义了，它就会认为可能这个组件会在其他的组件中使用
      //比如说在这里定义了一个变量，然后把这个组件引入到A组件中，A组件中修改了这个变量
      //同时这个组件也在B组件中引用了，这时候A里面一修改，B里面也变了，它们用的是一个值
      //可是一般来说可能希望在不同的组件中引用的时候，使用不同的值，所以这里要用return
      //这样在A组件和B组件分别引用这个变量的时候是不会互相影响的
      user: {
        username: "yzl1",
        password: "1234",
        //为了登录方便，可以直接在这里写好用户名和密码的值
        type:'',
      },
      active:'',
      developer_active:''
    };
  },
  methods: {
    mouseOver(){
      this.active= 'color: #409EFF'
    },
    mouseLeave(){
      this.active = 'color: black'
    },
    d_mouseOver(){
      this.developer_active= 'color: #409EFF'
    },
    d_mouseLeave(){
      this.developer_active = 'color: black'
    },
    userLogin(){
      this.user.type="user"
      this.doLogin()
    },
    developerLogin(){
      this.user.type="developer"
      this.doLogin()
    },
    adminLogin(){
      this.user.type="admin"
      this.doLogin()
    },
    doLogin() {
      let $this=this
      //一点击登录按钮，这个方法就会执行
      if (!this.user.username) {
        this.$message.error("请输入用户名！");
        return;
      } else if (!this.user.password) {
        this.$message.error("请输入密码！");
        return;
      }
      let param = new URLSearchParams()
      param.append('username',this.user.username)
      param.append('password',this.user.password)
      param.append('type',this.user.type)
      this.$axios({
        method: "post",
        url: "/user/login",
        params: {},
        data: param
      }).then((res) => {
        console.log(res)
        console.log(res.data.code)
        if (res.data.code == 202) {
          window.localStorage.setItem("username",$this.user.username)
          this.$message({
            message: res.data.detail,
            type:"success"
          })
          this.$router.push("/"+$this.user.type+"index");
        } else {
          this.$message({
            message: "用户名或密码错误",
            type: "error",
          });
        }
      });
    },


    developerRegister(){
      this.$message({
        message: "注册开发者账号",
        type: "info",
      });
      this.$router.push("/developerRegist")
    },

    doRegister() {
      this.$message({
        message: "注册账号",
        type: "info",
      });
      this.$router.push("/regist");
    },
  },
};
</script>

<style>
.login_button{
  display: inline-block;
  margin:0 auto;
  padding: 10px 10px;
  /*vertical-align: center;*/
  /*height: 30px;*/
  /*line-height: 30px;*/
  /*padding: 0px 10px;*/
}

.el-row {
  margin-bottom: 20px;

}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}


</style>
