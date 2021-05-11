<template>
    <el-container class="info-page">
        <el-header class="info-header">
            <div class="header-front">
                <div class="header-title">{{ detection.name }}</div>
                <el-button class="add-button" round size="small" @click="addDisease">添加病害</el-button>
            </div>
            <el-button style="color: #409eff;font-weight: bold;" round @click="backDetection">返回</el-button>
        </el-header>
        <el-main>
            <el-tabs v-model="activeName">
                <el-tab-pane label="灾害源信息" name="1">
                    <el-table
                        :data="diseases"
                        style="width: 100%"
                        stripe
                        border>
                        <el-table-column
                            prop="field"
                            label="领域"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="typeId"
                            label="类型"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="gradeId"
                            label="等级"
                            width="300">
                        </el-table-column>
                        <el-table-column
                            prop="size"
                            label="尺寸"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="position"
                            label="中心位置"
                            width="160">
                        </el-table-column>
                        <el-table-column
                            prop="tightness"
                            label="平均紧实度"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="porosity"
                            label="平均孔隙率"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="moisture"
                            label="平均含水率"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="features"
                            label="特征参数"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="atlas"
                            label="雷达图谱"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="photo"
                            label="现场照片"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="introduce"
                            label="描述"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            fixed="right"
                            label="操作"
                            width="160">
                            <template slot-scope="scope">
                                <el-button type="info" size="small" @click="editDisease(scope.row)">编辑</el-button>
                                <el-button type="danger" size="small" @click="deleteDisease(scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div id="myChart" :style="{width: '900px', height: '600px'}"></div>
                </el-tab-pane>
                <el-tab-pane label="测线位置详细信息" name="2">
                    <div style="display: flex;justify-content: space-between;margin-bottom: 10px">
                        <el-button class="edit-project" type="primary" @click="editDetectInfo">编辑测线信息</el-button>
                        <span style="font-size: 25px;margin-top: 5px">{{ detection.name }}</span>
                        <el-button class="edit-project" type="danger" @click="deleteDetectInfo">删除测线信息</el-button>
                    </div>
                    <el-form :model="detection" :rules="rules" ref="ruleForm" label-width="130px"
                             class="demo-ruleForm" :disabled="isEdited">
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
                    <h3>灾害源修护方案</h3>
                    <el-form :model="repair" :rules="rules" ref="ruleForm" label-width="130px"
                             class="demo-ruleForm" :disabled="isEdited">
                        <el-form-item label="修复单位" prop="repairCompany">
                            <el-input v-model="repair.repairCompany"></el-input>
                        </el-form-item>
                        <el-form-item label="修复负责人" prop="director">
                            <el-input v-model="repair.director"></el-input>
                        </el-form-item>
                        <el-form-item label="修复方案编号" prop="number">
                            <el-input v-model="repair.number"></el-input>
                        </el-form-item>
                        <el-form-item label="修护时间" prop="time">
                            <el-date-picker
                                v-model="repair.time"
                                type="datetime"
                                placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="修护方案" prop="plan">
                            <el-upload action="" :limit="1" :on-change="planChange" :file-list="planFile">
                                <el-button size="small" type="primary">点击上传</el-button>
                            </el-upload>
                        </el-form-item>
                    </el-form>
                    <h3>探测仪器及采集参数信息</h3>
                    <el-form :model="instrument" :rules="rules" ref="ruleForm" label-width="130px"
                             class="demo-ruleForm" :disabled="isEdited">
                        <el-form-item label="仪器参数编号" prop="number">
                            <el-input v-model="instrument.number"></el-input>
                        </el-form-item>
                        <el-form-item label="天线编号" prop="antennaNumber">
                            <el-input v-model="instrument.antennaNumber"></el-input>
                        </el-form-item>
                        <el-form-item label="天线主频" prop="antennaFrequency">
                            <el-input v-model="instrument.antennaFrequency"></el-input>
                        </el-form-item>
                        <el-form-item label="主机型号" prop="host">
                            <el-input v-model="instrument.host"></el-input>
                        </el-form-item>
                        <el-form-item label="时间窗" prop="timeWindow">
                            <el-input v-model="instrument.timeWindow"></el-input>
                        </el-form-item>
                        <el-form-item label="采集点数" prop="points">
                            <el-input v-model="instrument.points"></el-input>
                        </el-form-item>
                        <el-form-item label="总道数" prop="channels">
                            <el-input v-model="instrument.channels"></el-input>
                        </el-form-item>
                        <el-form-item label="触发方式" prop="touchId">
                            <el-select v-model="instrument.touchId" placeholder="请选择地层情况">
                                <el-option :label="touch.name" :value="touch.touchId" v-for="(touch,index) in touchs"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="测距轮控制道间距" prop="wheelSpace">
                            <el-input v-model="instrument.wheelSpace"></el-input>
                        </el-form-item>
                        <el-form-item label="坐标采集间隔" prop="gridSpace">
                            <el-input v-model="instrument.gridSpace"></el-input>
                        </el-form-item>
                        <el-form-item label="视频图像道间隔" prop="imageSpace">
                            <el-input v-model="instrument.imageSpace"></el-input>
                        </el-form-item>
                        <el-form-item label="道间距" prop="space">
                            <el-input v-model="instrument.space"></el-input>
                        </el-form-item>
                    </el-form>
                    <h3>探测雷达数据存储信息</h3>
                    <el-form :model="radar" :rules="rules" ref="ruleForm" label-width="130px"
                             class="demo-ruleForm" :disabled="isEdited">
                        <el-form-item label="数据编号" prop="number">
                            <el-input v-model="radar.number"></el-input>
                        </el-form-item>
                        <el-form-item label="原始数据文件名" prop="originalFile">
                            <el-upload action="" :limit="1" :on-change="originalChange" :file-list="originalFile">
                                <el-button size="small" type="primary">点击上传</el-button>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="处理数据文件名" prop="handleFile">
                            <el-upload action="" :limit="1" :on-change="handleChange" :file-list="handleFile">
                                <el-button size="small" type="primary">点击上传</el-button>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="坐标文件名" prop="gridFile">
                            <el-upload action="" :limit="1" :on-change="gridChange" :file-list="gridFile">
                                <el-button size="small" type="primary">点击上传</el-button>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="视屏检索文件路径" prop="searchFile">
                            <el-upload action="" :limit="1" :on-change="searchChange" :file-list="searchFile">
                                <el-button size="small" type="primary">点击上传</el-button>
                            </el-upload>
                        </el-form-item>
                    </el-form>
                    <el-button style="margin-top: 10px;width: 100%" type="primary" :disabled="isEdited"
                               @click="saveDetection">保存
                    </el-button>
                </el-tab-pane>
            </el-tabs>
            <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="700px" center>
                <el-form :model="disease" :rules="diseaseRules" ref="ruleForm" label-width="120px"
                         class="demo-ruleForm">
                    <el-form-item label="领域" prop="field">
                        <el-input v-model="disease.field"></el-input>
                    </el-form-item>
                    <el-form-item label="类型" prop="typeId">
                        <el-select v-model="disease.typeId" placeholder="请选择地层情况">
                            <el-option :label="type.name" :value="type.typeId" v-for="(type,index) in types"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="等级" prop="gradeId">
                        <el-select v-model="disease.gradeId" placeholder="请选择地层情况">
                            <el-option :label="grade.name" :value="grade.gradeId" v-for="(grade,index) in grades"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="测线尺寸" prop="size">
                        <el-input v-model="disease.size"></el-input>
                    </el-form-item>
                    <el-form-item label="中心位置" prop="position">
                        <el-input v-model="disease.position"></el-input>
                    </el-form-item>
                    <el-form-item label="平均紧实度" prop="tightness">
                        <el-input v-model="disease.tightness"></el-input>
                    </el-form-item>
                    <el-form-item label="平均孔隙率" prop="porosity">
                        <el-input v-model="disease.porosity"></el-input>
                    </el-form-item>
                    <el-form-item label="平均含水率" prop="moisture">
                        <el-input v-model="disease.moisture"></el-input>
                    </el-form-item>
                    <el-form-item label="特征参数" prop="features">
                        <el-input v-model="disease.features"></el-input>
                    </el-form-item>
                    <el-form-item label="雷达图谱" prop="atlas">
                        <el-upload action="" :limit="1" :on-change="atlasChange" :file-list="atlasFile">
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="现场照片" prop="photo">
                        <el-upload action="" :limit="1" :on-change="photoChange" :file-list="photoFile">
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button ref="dialogForm" type="primary" @click="addDiseaseInfo">确 定</el-button>
                </div>
            </el-dialog>
        </el-main>
    </el-container>
</template>

<script>
export default {
    name: "DetectInfo",
    inject: ['reload'],
    data() {
        return {
            detection: {},
            dialogFormVisible: false,
            dialogTitle: '',
            activeName: '1',
            diseases: [],
            disease:{},
            grounds:[],
            touchs:[],
            types:[],
            grades:[],
            atlasFile:[],
            photoFile:[],
            planFile:[],
            originalFile:[],
            handleFile:[],
            gridFile:[],
            searchFile:[],
            repair: {},
            instrument: {},
            radar: {},
            isEdited: true,
            rules: {},
            colors:[
                '#e6a23c',
                '#f56c6c',
                '#ef186f',
                '#42e0da',
                '#bc6cf5',
                '#3e3838',
            ],
            diseaseRules:{
                typeId: [{required: true,}],
                gradeId: [{required: true,}],
                size: [{required: true, message: '请输入测线尺寸', touch: 'blur'}],
                position: [{required: true, message: '请输入中心位置', touch: 'blur'}],
            },
            role:{},
        }
    },
    methods: {
        addDisease(){
            if(this.role.establish){
                this.disease = {};
                this.dialogTitle = '添加病害信息';
                this.atlasFile = [];
                this.photoFile = [];
                this.dialogFormVisible = true;
            }else{
                this.$message.warning("无权限");
            }
        },
        deleteDisease(disease){
            if(this.role.establish){
                this.$confirm('确定删除病害?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest('/disease/delete/' + disease.diseaseId).then(resp=>{
                        if(resp && resp.code === 200){
                            this.reload();
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
        editDisease(disease) {
            if(this.role.modify){
                this.dialogTitle = '编辑病害信息';
                this.getRequest('/disease/getOne/' + disease.diseaseId).then(resp=>{
                    if(resp){
                        this.disease = resp;
                        if(this.disease.atlas){
                            this.atlasFile = [{
                                name: this.disease.atlas,
                                url: this.disease.atlasPath
                            }];
                        }
                        if(this.disease.photo){
                            this.photoFile = [{
                                name: this.disease.photo,
                                url: this.disease.photoPath
                            }];
                        }
                        this.dialogFormVisible = true;
                    }
                });
            }else{
                this.$message.warning("无权限");
            }
        },
        addDiseaseInfo(){
            if(this.disease.typeId && this.disease.gradeId && this.disease.size && this.disease.position){
                if (this.atlasFile[0]) {
                    this.disease.atlas = this.atlasFile[0].name;
                    this.disease.atlasPath = this.atlasFile[0].url;
                }
                if (this.photoFile[0]) {
                    this.disease.photo = this.photoFile[0].name;
                    this.disease.photoPath = this.photoFile[0].url;
                }
                this.postRequest('/disease/add/' + this.detection.detectionId,this.disease).then(resp=>{
                    if(resp){
                        if(resp.code === 200){
                            this.dialogFormVisible = false;
                            this.reload();
                        }
                    }
                })
            }else{
                this.$message.warning("请填写必填项");
            }
        },
        initPage() {
            let detectionId = window.sessionStorage.getItem('detectionId');
            this.getRequest('/detection/' + detectionId).then(resp => {
                if (resp) {
                    this.detection = resp;
                    this.getRequest('/disease/' + this.detection.detectionId).then(resp => {
                        if (resp) {
                            this.diseases = resp;
                            let charts = [];
                            for (let i = 0; i < this.diseases.length; i++) {
                                this.getRequest('/type/' + this.diseases[i].typeId).then(resp => {
                                    if (resp) {
                                        this.diseases[i].typeId = resp.name;
                                    }
                                });
                                this.getRequest('/grade/' + this.diseases[i].gradeId).then(resp => {
                                    if (resp) {
                                        this.diseases[i].gradeId = this.diseases[i].gradeId + "-" + resp.introduce;
                                    }
                                });
                                charts.push({
                                    type: 'bar',
                                    color: this.colors[i],
                                    data: [this.diseases[i].size,this.diseases[i].tightness,this.diseases[i].porosity,this.diseases[i].moisture,this.diseases[i].features]
                                });
                            }
                            let echarts = require('echarts');
                            // 基于准备好的dom，初始化echarts实例
                            let myChart = echarts.init(document.getElementById('myChart'))
                            // 绘制图表
                            myChart.setOption({
                                tooltip: {},
                                xAxis: {
                                    data: ["尺寸","平均紧实度","平均孔隙率","平均含水率","特征参数"]
                                },
                                yAxis: {},
                                series: charts,
                            });
                        }
                    });
                    this.getRequest('/repair/' + this.detection.detectionId).then(resp => {
                        if (resp) {
                            this.repair = resp;
                            if (this.repair.plan) {
                                this.planFile = [{
                                    name: this.repair.plan,
                                    url: this.repair.planPath
                                }];
                            }
                        }
                    });
                    this.getRequest('/instrument/' + this.detection.detectionId).then(resp => {
                        if (resp) {
                            this.instrument = resp;
                        }
                    });
                    this.getRequest('/radar/' + this.detection.detectionId).then(resp => {
                        if (resp) {
                            this.radar = resp;
                            if (this.radar.originalFile) {
                                this.originalFile = [{
                                    name: this.radar.originalFile,
                                    url: this.radar.originalPath
                                }];
                            }
                            if (this.radar.handleFile) {
                                this.handleFile = [{
                                    name: this.radar.handleFile,
                                    url: this.radar.handlePath
                                }];
                            }
                            if (this.radar.gridFile) {
                                this.gridFile = [{
                                    name: this.radar.gridFile,
                                    url: this.radar.gridPath
                                }];
                            }
                            if (this.radar.searchFile) {
                                this.searchFile = [{
                                    name: this.radar.searchFile,
                                    url: this.radar.searchPath
                                }];
                            }
                        }
                    });
                }
            });
            this.getRequest('/type/all').then(resp=>{
                if(resp){
                    this.types = resp;
                }
            });
            this.getRequest('/grade/all').then(resp=>{
                if(resp){
                    this.grades = resp;
                }
            });
            this.getRequest('/ground/all').then(resp=>{
                if(resp){
                    this.grounds = resp;
                }
            });
            this.getRequest('/touch/all').then(resp=>{
                if(resp){
                    this.touchs = resp;
                }
            })
            this.getRequest('/admin/role').then(resp => {
                if(resp){
                    this.role = resp;
                }
            })
        },
        backDetection() {
            window.sessionStorage.removeItem('detectionId')
            this.$router.replace('/detection');
        },
        editDetectInfo() {
            if(this.role.modify){
                this.isEdited = false;
            }else{
                this.$message.warning("无权限");
            }
        },
        deleteDetectInfo(){
            if(this.role.establish){
                this.$confirm('确定删除测线信息?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest('/detection/delete/' + this.detection.detectionId).then(resp=>{
                        if(resp && resp.code === 200){
                            this.backDetection();
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
        saveDetection(){
            if (this.planFile[0]) {
                this.repair.plan = this.planFile[0].name;
                this.repair.planPath = this.planFile[0].url;
            }
            if (this.originalFile[0]) {
                this.radar.originalFile = this.originalFile[0].name;
                this.radar.originalPath = this.originalFile[0].url;
            }
            if (this.handleFile[0]) {
                this.radar.handleFile = this.handleFile[0].name;
                this.radar.handlePath = this.handleFile[0].url;
            }
            if (this.gridFile[0]) {
                this.radar.gridFile = this.gridFile[0].name;
                this.radar.gridPath = this.gridFile[0].url;
            }
            if (this.searchFile[0]) {
                this.radar.searchFile = this.searchFile[0].name;
                this.radar.searchPath = this.searchFile[0].url;
            }
            this.putRequest('/detection/update',this.detection).then(resp=>{
                if(resp && resp.code === 200){
                    this.postRequest('/instrument/add/' + this.detection.detectionId,this.instrument).then(resp=>{
                        if(resp && resp.code === 200){
                            this.postRequest('/repair/add/' + this.detection.detectionId,this.repair).then(resp=>{
                                if(resp && resp.code === 200){
                                    this.postRequest('/radar/add/' + this.detection.detectionId,this.radar).then(resp=>{
                                        if(resp && resp.code === 200){
                                            this.isEdited = true;
                                            this.initPage();
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
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
        atlasChange(file, fileList) {
            let list = [];
            for (let i = 0; i < fileList.length; i++) {
                list.push({
                    name: fileList[i].name,
                    url: "C:\\",
                })
            }
            this.atlasFile = list;
        },
        photoChange(file, fileList) {
            let list = [];
            for (let i = 0; i < fileList.length; i++) {
                list.push({
                    name: fileList[i].name,
                    url: "C:\\",
                })
            }
            this.photoFile = list;
        },
        originalChange(file, fileList) {
            let list = [];
            for (let i = 0; i < fileList.length; i++) {
                list.push({
                    name: fileList[i].name,
                    url: "C:\\",
                })
            }
            this.originalFile = list;
        },
        handleChange(file, fileList) {
            let list = [];
            for (let i = 0; i < fileList.length; i++) {
                list.push({
                    name: fileList[i].name,
                    url: "C:\\",
                })
            }
            this.handleFile = list;
        },
        gridChange(file, fileList) {
            let list = [];
            for (let i = 0; i < fileList.length; i++) {
                list.push({
                    name: fileList[i].name,
                    url: "C:\\",
                })
            }
            this.gridFile = list;
        },
        searchChange(file, fileList) {
            let list = [];
            for (let i = 0; i < fileList.length; i++) {
                list.push({
                    name: fileList[i].name,
                    url: "C:\\",
                })
            }
            this.searchFile = list;
        },
    },
    mounted() {
        this.initPage();
    }
}
</script>

<style scoped>
.info-page {
    width: 100%;
    height: 100vh;
}

.info-header {
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

</style>
