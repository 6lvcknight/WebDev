<template>
  <footer class="site-footer">
    <div class="footer-container">
      <nav class="footer-nav">
        <router-link to="/about"   class="footer-link">About</router-link>
        <router-link to="/blog"    class="footer-link">Blog</router-link>
        <router-link to="/contact" class="footer-link">Contact</router-link>
        <router-link to="/terms"   class="footer-link">Terms</router-link>
        <router-link to="/privacy" class="footer-link">Privacy</router-link>
      </nav>
      <p class="footer-copy">&copy; 2025 BookNest. All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup>
// no script needed here
</script>

<style scoped>
.site-footer {
  background: #fff;
  border-top: 1px solid #e5e7eb;
  padding: 2rem 1rem;
  margin-top: auto;
}
.footer-container {
  max-width: 1280px;
  margin: 0 auto;
  text-align: center;
}
.footer-nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 1rem;
}
.footer-link {
  color: #6b7280;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}
.footer-link.router-link-active {
  color: #b45309;
}
.footer-link:hover {
  color: #111827;
}
.footer-copy {
  font-size: 0.875rem;
  color: #6b7280;
}
</style>
