import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/Login";
import Project from "../views/Project";
import DetectInfo from "../views/DetectInfo";
import Detection from "../views/Detection";
import Setting from "../views/Setting";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/project',
        name: 'Project',
        component: Project
    },
    {
        path: '/setting',
        name: 'Setting',
        component: Setting,
    },
    {
        path: '/detection',
        name: 'Detection',
        component: Detection,
    },
    {
        path: '/detectInfo',
        name: 'DetectInfo',
        component: DetectInfo
    },
]

const router = new VueRouter({
    routes
})

export default router
