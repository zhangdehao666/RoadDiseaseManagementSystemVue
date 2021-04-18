<template>
    <el-container class="systemPage">
        <el-header class="systemHeader">道路病害管理系统</el-header>
        <el-container>
            <el-aside class="systemAside">
                <el-menu class="systemBar" @select="menuClick">
                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-location"/>道路病害监控项目管理</template>
                        <el-menu-item index="/project-info">项目信息</el-menu-item>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-data-line"/>测线信息管理</template>
                        <el-menu-item index="/line-location">测线位置信息</el-menu-item>
                        <el-menu-item index="/line-parameter">仪器及采集参数</el-menu-item>
                        <el-menu-item index="/line-radar">探测雷达数据</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main class="systemContent">
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    name: "System",
    data() {
        return {}
    },
    methods:{
        menuClick(index){
            this.$router.push(index);
        }
    }
}
</script>

<style>
.systemPage {
    height: 100%;
    width: 100vh;
    background-size: 100% 100%;
    position: absolute;
}

.systemHeader {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
}

.systemAside{
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
}

.systemBar {

}

.systemContent {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
}
</style>
