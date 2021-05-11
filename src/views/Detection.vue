<template>
    <el-container class="detectionPage">
        <el-header class="detectionHeader">
            <div class="header-front">
                <div class="header-title">{{ project.name }}</div>
                <el-button class="add-button" round size="small" @click="addDetection">添加测线</el-button>
            </div>
            <el-button style="color: #409eff;font-weight: bold;" round @click="backProject">返回</el-button>
        </el-header>
        <el-main>
            <el-tabs v-model="activeName">
                <el-tab-pane label="项目详细信息" name="first">
                    <div style="display: flex;justify-content: space-between;margin-bottom: 10px">
                        <el-button class="edit-project" type="primary" @click="editProject">编辑项目信息</el-button>
                        <span style="font-size: 25px;margin-top: 5px">{{ project.name }}</span>
                        <el-button class="edit-project" type="danger" @click="deleteProject">删除项目</el-button>
                    </div>
                    <el-form :model="project" :rules="rules" ref="ruleForm" label-width="120px"
                             class="demo-ruleForm" :disabled="isEdited">
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
                        <el-form-item label="项目计划书" prop="plan">
                            <el-upload action="" multiple :on-change="planChange" :file-list="planFile">
                                <el-button size="small" type="primary">点击上传</el-button>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="项目报告" prop="report">
                            <el-upload action="" multiple :on-change="reportChange" :file-list="reportFile">
                                <el-button size="small" type="primary">点击上传</el-button>
                            </el-upload>
                        </el-form-item>
                        <el-button type="primary" style="margin-left: 250px;margin-bottom: 10px" @click="addRegion">
                            添加探测区域
                        </el-button>
                        <el-form-item :label="'探测区域'" :prop="'region' + index" v-for="(region,index) in regions"
                                      :key="index"
                                      :rules="{required: true, message: '域名不能为空', trigger: 'blur'}">
                            <div style="display: flex">
                                <div>
                                    <v-distpicker :province="region.province" :city="region.city"
                                                  :area="region.area"></v-distpicker>
                                    <el-input v-model="region.street" style="margin-top: 5px"
                                              placeholder="请输入街道"></el-input>
                                    <el-input v-model="region.position" style="margin-top: 5px"
                                              placeholder="请输入所在位置"></el-input>
                                </div>
                                <el-button style="margin-left: 10px;" type="danger"
                                           @click.prevent="removeRegion(region)">删除
                                </el-button>
                            </div>
                        </el-form-item>
                    </el-form>
                    <el-button style="margin-top: 10px;width: 100%" type="primary" :disabled="isEdited"
                               @click="saveProject">保存
                    </el-button>
                </el-tab-pane>
                <el-tab-pane label="测线信息" name="second">
                    <el-table
                        :data="detections"
                        style="width: 100%"
                        stripe
                        @current-change="handleCurrentChange"
                        border>
                        <el-table-column
                            fixed
                            prop="number"
                            label="测线位置编号"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="测线名称"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="startDescribe"
                            label="起点描述"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="endDescribe"
                            label="终点描述"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="startGrid"
                            label="起始坐标"
                            width="160">
                        </el-table-column>
                        <el-table-column
                            prop="endGrid"
                            label="终点坐标"
                            width="160">
                        </el-table-column>
                        <el-table-column
                            prop="groundId"
                            label="地层情况"
                            width="150">
                        </el-table-column>
                        <el-table-column
                            prop="fieldAndDirection"
                            label="领域及方向"
                            width="150">
                        </el-table-column>
                    </el-table>
                    <div class="button-group">
                        <el-button class="map-button" type="primary" v-for="(detection,index) in detections"
                                   @click="changeCenter(detection)">
                            {{ detection.name }}
                        </el-button>
                    </div>
                    <baidu-map class="map" :center="center" :zoom="16" :scroll-wheel-zoom="true">
                        <bm-polyline :path="polylinePath" stroke-color="blue" :stroke-opacity="0.5"
                                     :stroke-weight="4" v-for="(polylinePath,index) in polylinePaths"></bm-polyline>
                    </baidu-map>
                </el-tab-pane>
            </el-tabs>
            <el-dialog title="添加测线信息" :visible.sync="dialogFormVisible" width="700px" center>
                <el-form :model="detection" :rules="rules" ref="ruleForm" label-width="120px"
                         class="demo-ruleForm">
                    <el-form-item label="系统测线编号" prop="number">
                        <el-input v-model="detection.number"></el-input>
                    </el-form-item>
                    <el-form-item label="现场测线名称" prop="name">
                        <el-input v-model="detection.name"></el-input>
                    </el-form-item>
                    <el-form-item label="起点描述" prop="startDescribe">
                        <el-input v-model="detection.startDescribe"></el-input>
                    </el-form-item>
                    <el-form-item label="终点描述" prop="endDescribe">
                        <el-input v-model="detection.endDescribe"></el-input>
                    </el-form-item>
                    <el-form-item label="起点坐标" prop="startGrid">
                        <el-input v-model="detection.startGrid"></el-input>
                    </el-form-item>
                    <el-form-item label="终点坐标" prop="endGrid">
                        <el-input v-model="detection.endGrid"></el-input>
                    </el-form-item>
                    <el-form-item label="地层情况" prop="groundId">
                        <el-select v-model="detection.groundId" placeholder="请选择地层情况">
                            <el-option :label="ground.name" :value="ground.groundId" v-for="(ground,index) in grounds"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="测线领域及方向" prop="fieldAndDirection">
                        <el-input v-model="detection.fieldAndDirection"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button ref="dialogForm" type="primary" @click="addDetectionInfo">确 定</el-button>
                </div>
            </el-dialog>
        </el-main>
    </el-container>
</template>

<script>
export default {
    name: "Detection",
    inject: ['reload'],
    data() {
        return {
            project: {},
            dialogFormVisible: false,
            activeName: 'second',
            isEdited: true,
            applyFile: [],
            replyFile: [],
            contractFile: [],
            bookFile: [],
            planFile: [],
            reportFile: [],
            regions: [],
            fileLimit: 1,
            rules: {
                number: [{required: true, message: '请输入系统测线编号', trigger: 'blur'}],
                name: [{required: true, message: '请输入现场名称', trigger: 'blur'}],
                startGrid: [{required: true, message: '请输入起点坐标', trigger: 'blur'}],
                endGrid: [{required: true, message: '请输入终点坐标', trigger: 'blur'}],
                groundId: [{required: true, message: '请输入地层情况', trigger: 'blur'}],
            },
            detections: [],
            detection:{},
            polylinePaths: [],
            center: {},
            grounds:[],
            role:{},
        }
    },
    methods: {
        addDetection(){
            if(this.role.establish){
                this.dialogFormVisible = true;
            }else{
                this.$message.warning("无权限");
            }
        },
        addDetectionInfo(){
            if(this.detection.number && this.detection.name && this.detection.startGrid
            && this.detection.endGrid && this.detection.groundId){
                this.postRequest('/detection/add/' + this.project.projectId,this.detection).then(resp=>{
                    if(resp){
                        if (resp.code === 200) {
                            this.dialogFormVisible = false;
                            this.reload();
                        }
                    }
                })
            }else {
                this.$message.warning("请填写必填项");
            }
        },
        backProject() {
            window.sessionStorage.removeItem('projectId')
            this.$router.replace('/project');
        },
        editProject() {
            if(this.role.modify){
                this.isEdited = false;
            }else{
                this.$message.warning("无权限");
            }
        },
        deleteProject(){
            if(this.role.establish){
                this.$confirm('确定删除项目?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest('/project/' + this.project.projectId).then(resp=>{
                        if(resp && resp.code === 200){
                            this.backProject();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            }else{
                this.$message.warning("无权限");
            }
        },
        saveProject() {
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
            if (this.project.number && this.project.name && this.project.detectCompany
                && this.project.entrustCompany && this.project.startTime && this.project.endTime) {
                this.putRequest('/project/update', this.project).then(resp => {
                    if (resp && resp.code === 200) {
                        this.postRequest('/plan/add/' + this.project.projectId,this.planFile).then(resp => {
                            if (resp && resp.code === 200) {
                                this.postRequest('/report/add/' + this.project.projectId,this.reportFile).then(resp => {
                                    if (resp && resp.code === 200) {
                                        this.postRequest('/region/add/' + this.project.projectId,this.regions).then(resp => {
                                            if (resp && resp.code === 200) {
                                                this.isEdited = true;
                                                this.initPage();
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
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
        planChange(file, fileList) {
            let list = [];
            for (let i = 0; i < fileList.length; i++) {
                list.push({
                    name: fileList[i].name,
                    url: "C:\\",
                })
            }
            this.planFile = list;
        },
        reportChange(file, fileList) {
            let list = [];
            for (let i = 0; i < fileList.length; i++) {
                list.push({
                    name: fileList[i].name,
                    url: "C:\\",
                })
            }
            this.reportFile = list;
        },
        addRegion() {
            this.regions.push({
                province: '',
                city: '',
                area: '',
                street: '',
                location: '',
            });
        },
        removeRegion(region) {
            const index = this.regions.indexOf(region);
            if (index !== -1) {
                this.regions.splice(index, 1);
            }
        },
        initPage() {
            let projectId = window.sessionStorage.getItem('projectId');
            this.getRequest('/project/' + projectId).then(resp=>{
                if(resp){
                    this.project = resp;
                    if (this.project.apply) {
                        this.applyFile = [{
                            name: this.project.apply,
                            url: this.project.applyPath
                        }];
                    }
                    if (this.project.reply) {
                        this.replyFile = [{
                            name: this.project.reply,
                            url: this.project.replyPath
                        }];
                    }
                    if (this.project.contract) {
                        this.contractFile = [{
                            name: this.project.contract,
                            url: this.project.contractPath
                        }];
                    }
                    if (this.project.book) {
                        this.bookFile = [{
                            name: this.project.book,
                            url: this.project.bookPath
                        }];
                    }
                    this.getRequest('/plan/' + this.project.projectId).then(resp => {
                        if (resp) {
                            this.planFile = resp;
                        }
                    });
                    this.getRequest('/report/' + this.project.projectId).then(resp => {
                        if (resp) {
                            this.reportFile = resp;
                        }
                    });
                    this.getRequest('/region/' + this.project.projectId).then(resp => {
                        if (resp) {
                            this.regions = resp;
                        }
                    });
                    this.getRequest('/detection/all/' + this.project.projectId).then(resp => {
                        if (resp) {
                            this.detections = resp;
                            for(let i = 0;i < this.detections.length;i++){
                                this.getRequest('/ground/' + this.detections[i].groundId).then(resp=>{
                                    this.detections[i].groundId = resp.name;
                                });
                            }
                            this.initMap();
                        }
                    });
                }
            });
            this.getRequest('/ground/all').then(resp=>{
                if(resp){
                    this.grounds = resp;
                }
            })
            this.getRequest('/admin/role').then(resp => {
                if(resp){
                    this.role = resp;
                }
            })
        },
        initMap() {
            for (let i = 0; i < this.detections.length; i++) {
                let start = {
                    lng: Number.parseFloat(this.detections[i].startGrid.split(",")[0]),
                    lat: Number.parseFloat(this.detections[i].startGrid.split(",")[1]),
                };
                let end = {
                    lng: Number.parseFloat(this.detections[i].endGrid.split(",")[0]),
                    lat: Number.parseFloat(this.detections[i].endGrid.split(",")[1]),
                };
                if (i === 0) {
                    this.center = {
                        lng: (start.lng + end.lng) / 2,
                        lat: (start.lat + end.lat) / 2,
                    };
                }
                let line = [];
                line.push(start)
                line.push(end)
                this.polylinePaths.push(line);
            }
        },
        changeCenter(detection) {
            this.center = {
                lng: (Number.parseFloat(detection.startGrid.split(",")[0]) + Number.parseFloat(detection.endGrid.split(",")[0])) / 2,
                lat: (Number.parseFloat(detection.startGrid.split(",")[1]) + Number.parseFloat(detection.endGrid.split(",")[1])) / 2,
            };
            console.log(this.center);
        },
        handleCurrentChange(detection) {
            window.sessionStorage.setItem('detectionId', detection.detectionId);
            this.$router.replace('/detectInfo');
        },
    },
    mounted() {
        this.initPage();
    }
}
</script>

<style scoped>
.detectionPage {
    width: 100%;
    height: 100vh;
}

.detectionHeader {
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

.add-button {
    margin-left: 10px;
    margin-top: 5px;
    color: #409eff;
    font-size: 15px;
    font-weight: bold;
}

.map {
    height: 700px;
    width: 700px;
    margin: 0 auto 10px;
}

.button-group {
    display: flex;
    flex-wrap: wrap;
}

.map-button {
    margin: 10px;
}

</style>
