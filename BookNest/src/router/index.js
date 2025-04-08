import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Browse from '../views/Browse.vue'
import BookDetail from '../views/BookDetail.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import AdminDashboard from '../views/AdminDashboard.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/browse', component: Browse },
  { path: '/book/:id', component: BookDetail },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/admin', component: AdminDashboard }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
