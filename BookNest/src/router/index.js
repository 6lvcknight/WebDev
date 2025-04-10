import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Browse from '../views/Browse.vue'
import BookDetail from '../views/BookDetail.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import MyBooksView from '../views/MyBooksView.vue'

// New view components for footer links:
import About from '../views/About.vue'
import Blog from '../views/Blog.vue'
import Contact from '../views/Contact.vue'
import Terms from '../views/Terms.vue'
import Privacy from '../views/Privacy.vue'

import { isAuthenticated } from '../composables/useAuth.js'

const routes = [
  { path: '/', component: Home },
  { path: '/home', component: Home },
  { path: '/browse', component: Browse },
  { path: '/book/:id', component: BookDetail, props: true },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/admin', component: AdminDashboard, meta: { requiresAdmin: true } },
  { path: '/my-books', component: MyBooksView },
  // Footer routes:
  { path: '/about', component: About },
  { path: '/blog', component: Blog },
  { path: '/contact', component: Contact },
  { path: '/terms', component: Terms },
  { path: '/privacy', component: Privacy },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Authentication guard for protected pages
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
