<template>
    <el-container class="page">
        <el-header class="header">
            <div class="header-front">
                <div class="header-title">用户设置</div>
            </div>
            <el-button style="color: #409eff;font-weight: bold;" round @click="backProject">返回</el-button>
        </el-header>
        <el-main>
            <el-tabs v-model="activeName">
                <el-tab-pane label="用户信息设置" name="first">
                    <div style="display: flex;justify-content: space-between;margin-bottom: 10px">
                        <el-button class="edit-project" type="primary" @click="editAdmin">编辑用户信息</el-button>
                    </div>
                    <el-form :model="admin" :rules="adminRules" ref="ruleForm" label-width="120px"
                             class="demo-ruleForm" :disabled="isEdited">
                        <el-form-item label="用户名称" prop="name">
                            <el-input v-model="admin.name"></el-input>
                        </el-form-item>
                        <el-form-item label="用户角色" prop="role">
                          <el-select v-model="admin.roleId" placeholder="请选择用户角色">
                            <el-option :label="role.name" :value="role.roleId" v-for="(role,index) in roles"></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="用户名" prop="username">
                            <el-input v-model="admin.username"></el-input>
                        </el-form-item>
                        <el-form-item label="用户密码" prop="password">
                            <el-input type="password" v-model="admin.password"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-button style="margin-top: 10px;width: 100%" type="primary" :disabled="isEdited"
                               @click="saveAdmin">保存
                    </el-button>
                </el-tab-pane>
                <el-tab-pane label="添加用户" name="second">
                    <el-form :model="newAdmin" :rules="adminRules" ref="ruleForm" label-width="120px"
                             class="demo-ruleForm">
                        <el-form-item label="用户名称" prop="name">
                            <el-input v-model="newAdmin.name"></el-input>
                        </el-form-item>
                        <el-form-item label="用户角色" prop="role">
                            <el-select v-model="newAdmin.roleId" placeholder="请选择用户角色">
                                <el-option :label="role.name" :value="role.roleId" v-for="(role,index) in roles"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="用户名" prop="username">
                            <el-input v-model="newAdmin.username"></el-input>
                        </el-form-item>
                        <el-form-item label="用户密码" prop="password">
                            <el-input type="password" v-model="newAdmin.password"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-button style="margin-top: 10px;width: 100%" type="primary"
                               @click="addAdmin">保存
                    </el-button>
                </el-tab-pane>
            </el-tabs>
        </el-main>
    </el-container>
</template>

<script>
export default {
    name: "Setting",
    inject: ['reload'],
    data() {
        return {
            activeName: 'first',
            admin:{},
            adminRules:{
                name: [{required: true, message: '请输入用户名称', trigger: 'blur'}],
                role: [{required: true, message: '请输入用户角色', trigger: 'blur'}],
                username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                password: [{required: true, message: '请输入用户密码', trigger: 'blur'}],
            },
            isEdited: true,
            roles:[],
            newAdmin:{},
        }
    },
    methods: {
        backProject() {
            this.$router.replace('/project');
        },
        initPage() {
            this.getRequest('/admin/info').then(resp => {
                if (resp) {
                    this.admin = resp;
                }
            });
            this.getRequest('role/all').then(resp=>{
                if(resp){
                    this.roles = resp;
                }
            })
        },
        editAdmin(){
            this.isEdited = false;
        },
        saveAdmin(){
            this.putRequest('/admin/update',this.admin).then(resp=>{
                if(resp && resp.code === 200){
                    this.isEdited = true;
                }
            });
        },
        addAdmin(){
            if(this.newAdmin.username && this.newAdmin.roleId &&
            this.newAdmin.username && this.newAdmin.password){
                this.postRequest('/admin/add',this.newAdmin).then(resp=>{
                    if(resp && resp.code === 200){
                        this.reload();
                    }
                })
            }else{
                this.$message.warning("请填入所有信息");
            }
        }
    },
    mounted() {
        this.initPage();
    }
}
</script>

<style scoped>
.page {
    width: 100%;
    height: 100vh;
}

.header {
    background-color: #409eff;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.header-front {
    display: flex;
}

.header-title {
    font-size: 30px;
    margin-left: 0;
    color: white;
}

</style>
