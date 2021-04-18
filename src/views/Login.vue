<template>
    <div class="loginPage"
         :style="{backgroundImage:'url('+imgUrl+')'}"
         v-loading="loading"
         element-loading-text="正在登录..."
         element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(0,0,0,0.8)">
        <el-form class="loginContainer" ref="loginFrom" :rules="rules" :model="loginForm">
            <h2 class="loginTitle">道路病害管理系统</h2>
            <el-form-item prop="username">
                <el-input type="text" auto-complete="false" v-model="loginForm.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" auto-complete="false" v-model="loginForm.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-checkbox class="loginRemember" v-model="checked" >记住我</el-checkbox>
            <el-button type="primary" style="width: 100%" @click="submitLogin">登录</el-button>
        </el-form>
    </div>
</template>

<script>
import imgUrl from '../assets/PageBackground.png';

export default {
    name: "Login",
    data(){
        return{
            imgUrl,
            loginForm:{
                username:'jwj',
                password:'jwj',
            },
            loading:false,
            checked: true,
            rules:{
                username: [{required:true,message:'请输入用户名',trigger:'blur'}],
                password: [{required:true,message:'请输入密码',trigger:'blur'}]
            }
        }
    },
    methods:{
        submitLogin(){
            this.$refs.loginFrom.validate((valid) => {
                if(valid){
                    this.loading = true;
                    this.postRequest('/login',this.loginForm).then(resp=>{
                        if(resp){
                            this.loading = false;
                            //存储用户token
                            const tokenStr = resp.object.tokenHead+resp.object.token;
                            window.sessionStorage.setItem('tokenStr',tokenStr);
                            //跳转首页
                            //可以回退
                            this.$router.push('/system');
                            //不可回退
                            // this.$router.replace('/system');
                        }
                    });
                }else {
                    this.$message.error('请输入所有字段！');
                    return false;
                }
            });
        }
    }
}
</script>

<style>
.loginPage{
    width: 100%;
    height: 100vh;
    background-size: 100% 100%;
    position:absolute;
}
.loginContainer{
    border-radius: 15px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 15px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #666666;
}
.loginTitle{
    margin: 0px auto 40px auto;
    text-align: center;
}
.loginRemember{
    text-align: left;
    margin: 0px 0px 15px 0px;
}
::-webkit-scrollbar {
   width: 0;
   height: 0;
 }
</style>
