<template>
  <div id="login">
    <!--flex弹性盒子模型，justify-content：主抽 -->
    <div style="display: flex; justify-content: center; margin-top: 150px">
      <el-card style="width: 400px">
        <div slot="header" class="clearfix">
          <span>用户注册</span>
        </div>
        <table>
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
            <td>设置密码</td>
            <td>
              <el-input
                  style="margin: 10px 0px"
                  type="password"
                  v-model="user.password"
                  placeholder="请输入密码"
                  @keydown.enter.native="doRegister"
              ></el-input>
              <!-- @keydown.enter.native="doRegister"当按下enter键的时候也会执行doRegister方法-->
            </td>
          </tr>
          <tr>
            <td>设置邮箱</td>
            <td>
              <el-input
                  style="margin: 10px 0px"
                  type="email"
                  v-model="user.email"
                  placeholder="请输入邮箱"
                  @keydown.enter.native="doRegister"
              ></el-input>
              <!-- @keydown.enter.native="doRegister"当按下enter键的时候也会执行doRegister方法-->
            </td>
          </tr>
          <tr>
            <!-- 占两行-->
            <td colspan="2">
              <!-- 点击事件的两种不同的写法v-on:click和 @click-->
              <!--<el-button style="width: 300px" type="primary" v-on:click="doRegister">登录</el-button>-->
              <div style="margin-left: 25px; text-align: left; margin: 10px">
                <div>
                  <el-button
                      style="
                      vertical-align: center;
                      height: 30px;
                      line-height: 30px;
                      padding: 0px 20px;
                    "
                      type="primary"
                      @click="doRegister"
                  >注册</el-button
                  >
                  <span
                      style="
                      margin-left: 10px;
                      text-align: left;
                      font-size: 14px;
                      color: #82848a;
                    "
                  >
                    已有账号？立即
                    <a
                        style="color: black;cursor:default"
                        :style="active"
                        class="toSignup"
                        @click="doLogin"
                        @mouseover="mouseOver"
                        @mouseleave="mouseLeave"
                    >登录</a
                    >
                  </span>
                  <span
                      style="
                      margin-left: 20px;
                      text-align: left;
                      font-size: 14px;
                      color: #82848a;
                    "
                  >
                    <span
                        style="color: black"
                        class="toSignup"
                        @click="isForget = true"
                    >忘记密码？</span
                    >
                  </span>
                </div>
              </div>
            </td>
          </tr>
        </table>
      </el-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "regist",
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: ""
      },
      active:''
    };
  },
  created() {
    // console.log($);
    // console.log("1111");
  },
  methods: {
    mouseOver(){
      this.active= 'color: #409EFF'
    },
    mouseLeave(){
      this.active = 'color: black'
    },
    doRegister() {
      if (!this.user.username) {
        this.$message.error("请输入用户名！");
        return;
      } else if (!this.user.email) {
        this.$message.error("请输入邮箱！");
        return;
      } else if (this.user.email != null) {
        var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if (!reg.test(this.user.email)) {
          this.$message.error("请输入有效的邮箱！");
        } else if (!this.user.password) {
          this.$message.error("请输入密码！");
          return;
        } else {
          let param = new URLSearchParams();
          param.append('type',"user")
          param.append('username',this.user.username)
          param.append('password',this.user.password)
          param.append('email',this.user.email)
          param.append('invitation',"0")
          console.log(153,param.get("type"))
          console.log(154,param.get("username"))
          console.log(155,param.get("password"))
          console.log(156,param.get("email"))

          axios
              .post(this.$server+"/user/register", param)
              .then(res => {
                // console.log("输出response.data", res.data);
                // console.log("输出response.data.status", res.data.status);
                if (res.data.code === 102) {
                  this.$message({
                    message: "注册成功",
                    type: "success"
                  })
                  this.$router.push({ path: "/" });
                } else {
                  alert("您输入的用户名已存在！请重新输入");
                }
              });
        }
      }
    },
    doLogin(){
      this.$message({
        message: "登录账号",
        type: "info"
      });
      this.$router.push("/")
    }
  }
};
</script>


