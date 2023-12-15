import { createRouter, createWebHistory } from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
import Admin from '../components/Admin.vue'
import Home from '../components/Home.vue'
import StudentDetails from '../components/StudentDetails.vue'
const routes = [

  {
    path: '/hello',
    name: 'HelloWorld',
     // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "hello" */ '../components/HelloWorld.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "admin" */ '../components/Admin.vue')
  },
  {
    path: '/student',
    name: 'Home',
    component: () => import(/* webpackChunkName: "student" */ '../components/Home.vue')
  },
  {
    path: '/admin/student-details',
    name: 'StudentDetails',
    component: () => import(/* webpackChunkName: "student-details" */ '../components/StudentDetails.vue')
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router