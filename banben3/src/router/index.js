import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Index from '../views/Index.vue'
import Login from "../views/Login.vue"
import Regist from "../views/Regist.vue"
import ArgConfig from "../views/ArgConfig.vue"
import Result from "../views/Result.vue"
import admin_index from "@/components/administrator/admin_index";
import developer_index from "@/components/developer/developer_index";
import dev_register from "@/components/developer/dev_register";
import submit_service from "@/components/developer/submit_service";
import submit_tool from "@/components/developer/submit_tool";
import TaskMenu from "@/components/administrator/task/TaskMenu";
import ServiceTable from "@/components/developer/ServiceTable";
import ToolTable from "@/components/administrator/tool/ToolTable";

Vue.use(VueRouter)

const routes = [
  {
    path :'/',
    name:'Login',
    component:Login
  },
  {
    path:'/regist',
    name:'Regist',
    component:Regist
  },
  {
    path:'/userindex',
    name:'Index',
    component:Index
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component:About
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:'/argConfig',
    name:'ArgConfig',
    component:ArgConfig
  },
  {
    path:'/result',
    name:'Result',
    component:Result
  },
  {
    path:'/developerindex',
    name:'Developer',
    component: developer_index,
  },
  {
    path:'/developerRegist',
    name: 'developerRegist',
    component: dev_register,
  },
  {
    path:'/developerTool',
    name:'dev_tool',
    component: submit_tool,
  },
  {
    path:'/developerService',
    name:'dev_service',
    component: submit_service,
  },
  {
    path:'/adminindex',
    name:'admin_index',
    component: admin_index,
  },
  {
    path:'/admin_user_task/:id',
    component:TaskMenu
  },
  {
    path:'/admin_developer_service/:id',
    component:ServiceTable
  },
  {
    path:'/admin_developer_tool/:developer',
    component:ToolTable
  },

]

const router = new VueRouter({
  routes
})

export default router
