<template>
    <div>
        <el-container class="container">
            <el-header class="header">
                <div class="header-front">
                    <div class="header-title">项目列表</div>
                    <el-button class="add-button" round size="small" @click="addProject">添加项目
                    </el-button>
                </div>
                <div class="header-user">
                    <el-dropdown class="user-info" @command="commandHandler">
                    <span class="el-dropdown-link">
                        用户：{{ admin.name }}
                    </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="setting">用户设置</el-dropdown-item>
                            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-header>
            <el-main>
                <el-dialog title="添加项目信息" :visible.sync="dialogFormVisible" width="700px" center>
                    <el-form :model="project" :rules="rules" ref="ruleForm" label-width="120px"
                             class="demo-ruleForm">
                        <el-form-item label="项目编号" prop="number">
                            <el-input v-model="project.number"></el-input>
                        </el-form-item>
                        <el-form-item label="项目名称" prop="name">
                            <el-input v-model="project.name"></el-input>
                        </el-form-item>
                        <el-form-item label="探测单位代码" prop="detectCompanyNumber">
                            <el-input v-model="project.detectCompanyNumber"></el-input>
                        </el-form-item>
                        <el-form-item label="探测单位" prop="detectCompany">
                            <el-input v-model="project.detectCompany"></el-input>
                        </el-form-item>
                        <el-form-item label="委托单位" prop="entrustCompany">
                            <el-input v-model="project.entrustCompany"></el-input>
                        </el-form-item>
                        <el-form-item label="负责人" prop="director">
                            <el-input v-model="project.director"></el-input>
                        </el-form-item>
                        <el-form-item label="参与人员" prop="participants">
                            <el-input v-model="project.participants"></el-input>
                        </el-form-item>
                        <el-form-item label="监理人员" prop="supervisors">
                            <el-input v-model="project.supervisors"></el-input>
                        </el-form-item>
                        <el-form-item label="项目开始时间" prop="startTime">
                            <el-date-picker
                                v-model="project.startTime"
                                type="datetime"
                                placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="项目结束时间" prop="endTime">
                            <el-date-picker
                                v-model="project.endTime"
                                type="datetime"
                                placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="项目申请" prop="apply">
                            <el-upload action="" :limit="1" :on-change="applyChange" :file-list="applyFile">
                                <el-button size="small" type="primary">点击上传</el-button>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="项目批复" prop="reply">
                            <el-upload action="" :limit="1" :on-change="replyChange" :file-list="replyFile">
                                <el-button size="small" type="primary">点击上传</el-button>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="项目合同" prop="contract">
                            <el-upload action="" :limit="1" :on-change="contractChange" :file-list="contractFile">
                                <el-button size="small" type="primary">点击上传</el-button>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="项目图鉴" prop="book">
                            <el-upload action="" :limit="1" :on-change="bookChange" :file-list="bookFile">
                                <el-button size="small" type="primary">点击上传</el-button>
                            </el-upload>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button ref="dialogForm" type="primary" @click="addProjectInfo">确 定</el-button>
                    </div>
                </el-dialog>
                <el-table
                    :data="projects"
                    style="width: 100%"
                    stripe
                    @current-change="handleCurrentChange"
                    border>
                    <el-table-column
                        fixed
                        prop="number"
                        label="项目编号"
                        width="120">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="项目名称"
                        width="120">
                    </el-table-column>
                    <el-table-column
                        prop="detectCompanyNumber"
                        label="探测单位代码"
                        width="120">
                    </el-table-column>
                    <el-table-column
                        prop="detectCompany"
                        label="探测单位"
                        width="120">
                    </el-table-column>
                    <el-table-column
                        prop="entrustCompany"
                        label="委托单位"
                        width="120">
                    </el-table-column>
                    <el-table-column
                        prop="director"
                        label="负责人"
                        width="120">
                    </el-table-column>
                    <el-table-column
                        prop="startTime"
                        label="起始时间"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="endTime"
                        label="结束时间"
                        width="150">
                    </el-table-column>
                    <el-table-column
                        prop="apply"
                        label="项目申请"
                        width="120">
                    </el-table-column>
                    <el-table-column
                        prop="reply"
                        label="项目批复"
                        width="120">
                    </el-table-column>
                    <el-table-column
                        prop="contract"
                        label="项目合同"
                        width="120">
                    </el-table-column>
                    <el-table-column
                        prop="book"
                        label="项目图鉴"
                        width="120">
                    </el-table-column>
                </el-table>
            </el-main>
        </el-container>
    </div>

</template>

<script>

export default {
    name: "Project",
    inject: ['reload'],
    data() {
        return {
            admin: {},
            projects: [],
            dialogFormVisible: false,
            project: {},
            applyFile: [],
            replyFile: [],
            contractFile: [],
            bookFile: [],
            rules: {
                number: [{required: true, message: '请输入项目编号', trigger: 'blur'}],
                name: [{required: true, message: '请输入项目名称', trigger: 'blur'}],
                detectCompany: [{required: true, message: '请输入探测单位', trigger: 'blur'}],
                entrustCompany: [{required: true, message: '请输入委托单位', trigger: 'blur'}],
                startTime: [{required: true, message: '请输入起始时间', trigger: 'blur'}],
                endTime: [{required: true, message: '请输入结束时间', trigger: 'blur'}],
            },
            role:{},
        }
    },
    methods: {
        initPage() {
            this.getRequest('/admin/info').then(resp => {
                if (resp) {
                    this.admin = resp;
                }
            });
            this.initTable();
            this.getRequest('/admin/role').then(resp => {
                if(resp){
                    this.role = resp;
                }
            })
        },
        addProject() {
            if(this.role.establish){
                this.dialogFormVisible = true;
            }else{
                this.$message.warning("无权限");
            }
        },
        commandHandler(command) {
            if(command === 'setting'){
                this.$router.replace('/setting');
            }
            if (command === 'logout') {
                this.$confirm('确定退出登录?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //退出登录
                    this.postRequest('/logout');
                    //清空用户信息
                    window.sessionStorage.removeItem('tokenStr');
                    window.sessionStorage.removeItem('user');
                    //跳转到登录
                    this.$router.replace('/')
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            }
        },
        initTable() {
            this.getRequest('/project/all').then(resp => {
                if (resp) {
                    this.projects = resp;
                }
            })
        },
        handleCurrentChange(project) {
            window.sessionStorage.setItem('projectId', project.projectId);
            this.$router.replace('/detection');
        },
        addProjectInfo() {
            if (this.project.number && this.project.name && this.project.detectCompany
                && this.project.entrustCompany && this.project.startTime && this.project.endTime) {
                if (this.applyFile[0]) {
                    this.project.apply = this.applyFile[0].name;
                    this.project.applyPath = this.applyFile[0].url;
                }
                if (this.replyFile[0]) {
                    this.project.reply = this.replyFile[0].name;
                    this.project.replyPath = this.replyFile[0].url;
                }
                if (this.contractFile[0]) {
                    this.project.contract = this.contractFile[0].name;
                    this.project.contractPath = this.contractFile[0].url;
                }
                if (this.bookFile[0]) {
                    this.project.book = this.bookFile[0].name;
                    this.project.bookPath = this.bookFile[0].url;
                }
                this.postRequest('/project/add', this.project).then(resp => {
                    if (resp) {
                        if (resp.code === 200) {
                            this.dialogFormVisible = false;
                            this.reload();
                        }
                    }
                });
            } else {
                this.$message.warning("请填写必填项");
            }
        },
        applyChange(file, fileList) {
            let list = [];
            for (let i = 0; i < fileList.length; i++) {
                list.push({
                    name: fileList[i].name,
                    url: "C:\\",
                })
            }
            this.applyFile = list;
        },
        replyChange(file, fileList) {
            let list = [];
            for (let i = 0; i < fileList.length; i++) {
                list.push({
                    name: fileList[i].name,
                    url: "C:\\",
                })
            }
            this.replyFile = list;
        },
        contractChange(file, fileList) {
            let list = [];
            for (let i = 0; i < fileList.length; i++) {
                list.push({
                    name: fileList[i].name,
                    url: "C:\\",
                })
            }
            this.contractFile = list;
        },
        bookChange(file, fileList) {
            let list = [];
            for (let i = 0; i < fileList.length; i++) {
                list.push({
                    name: fileList[i].name,
                    url: "C:\\",
                })
            }
            this.bookFile = list;
        },
    },
    mounted() {
        this.initPage();
    }
}
</script>

<style scoped>
.container {

}

.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 2px solid #eaeaea;
    background: #409eff;
}

.header-front {
    display: flex;
}

.header-title {
    font-size: 30px;
    margin-left: 0;
    color: white;
}

.add-button {
    margin-left: 10px;
    margin-top: 5px;
    color: #409eff;
    font-size: 15px;
    font-weight: bold;
}

.header-user {
}

.user-info {
    cursor: pointer;
}

.el-dropdown-link {
    font-size: 20px;
    color: white;
}

.upload-demo {
}
</style>
