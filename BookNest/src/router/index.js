import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Browse from '../views/Browse.vue'
import BookDetail from '../views/BookDetail.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import MyBooksView from '../views/MyBooksView.vue' // Import the new view

import { isAuthenticated } from '../composables/useAuth.js' // adjust if alias used

const routes = [
  { path: '/', component: Home },
  { path: '/browse', component: Browse },
  { path: '/book/:id', component: BookDetail },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/admin', component: AdminDashboard },
  { path: '/my-books', component: MyBooksView } // Add the new route
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const publicPages = ['/login', '/register']
router.beforeEach((to, from, next) => {
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = isAuthenticated()

  if (authRequired && !loggedIn) {
    return next('/login')
  }

  next()
})

export default router