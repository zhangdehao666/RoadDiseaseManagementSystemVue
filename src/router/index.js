import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/Login";
import System from "../views/System";
import Info from "../views/project/Info";
import Location from "../views/line/Location"
import Parameter from "../views/line/Parameter"
import Radar from "../views/line/Radar"

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/system',
        name: 'System',
        component: System,
        children:[
            {
                path: '/project-info',
                name: 'Info',
                component: Info
            },{
                path: '/line-location',
                name: 'Location',
                component: Location
            },{
                path: '/line-parameter',
                name: 'Parameter',
                component: Parameter
            },{
                path: '/line-radar',
                name: 'Radar',
                component: Radar
            }
        ]
    },
]

const router = new VueRouter({
    routes
})

export default router
