<template>
  <!-- Navigation -->
  <nav class="navbar">
    <div class="navbar-container">
      <div class="navbar-left">
        <div class="navbar-logo">
          <h1>BookNest</h1>
        </div>
        <div class="navbar-links">
          <router-link to="/" class="navbar-link">Home</router-link>
          <router-link to="/browse" class="navbar-link">Browse</router-link>
          <router-link to="/my-books" class="navbar-link">My Books</router-link>
        </div>
      </div>
      <div class="navbar-right">
        <div v-if="username" class="flex items-center gap-4">
          <span class="username-label">Logged in as {{ username }}</span>
          <button @click="handleLogout" class="navbar-link logout-link">Logout</button>
        </div>
      </div>
    </div>
  </nav>

  <!-- Main Content -->
  <div class="page about">
    <h1>About BookNest</h1>
    <p class="intro">
      Welcome to <strong>BookNest</strong>—your go‑to digital library where we connect readers
      with their next great adventure! Our mission is to curate outstanding recommendations,
      foster an engaged community, and inspire lifelong learning through the written word.
    </p>

    <!-- Toggle button for more info -->
    <button class="btn-toggle" @click="toggleDetails">
      {{ showDetails ? 'Show Less' : 'Learn More' }}
    </button>

    <!-- Additional details that can be toggled -->
    <div v-if="showDetails" class="extra-info" :class="{ animate: animateInfo }">
      <h2>Our Journey</h2>
      <p>
        BookNest was conceived in early 2025 by a team of Ontario Tech students as part of our capstone project.
        Over a focused spring semester, we designed and built the platform from the ground up, emphasizing usability,
        accessibility, and community-driven recommendations.
      </p>
      <p>
        In April 2025, we officially launched the first version of BookNest, featuring curated book lists,
        user reviews, and an intuitive interface. We continue to iterate, adding features based on user feedback
        and expanding our library with diverse titles.
      </p>
    </div>

    <!-- Creators footer -->
    <footer class="about-footer">
      <p>
        Created in <strong>2025</strong> by
        <strong>Ali Shamsi</strong>, <strong>Mohsin Qureshi</strong>,
        <strong>Mankirat Mann</strong>, <strong>Bisayo Awude</strong>,
        <strong>Ayaan Yousaf</strong>, and <strong>Folu Aderibigbe</strong>.
      </p>
    </footer>
  </div>

  <!-- Main Footer -->
  <footer class="footer">
      <div class="footer-container">
        <nav class="footer-nav">
          <router-link to="/about" class="footer-link">About</router-link>
          <router-link to="/blog" class="footer-link">Blog</router-link>
          <router-link to="/contact" class="footer-link">Contact</router-link>
          <router-link to="/terms" class="footer-link">Terms</router-link>
          <router-link to="/privacy" class="footer-link">Privacy</router-link>
        </nav>
        <p class="copyright">&copy; 2025 BookNest. All rights reserved.</p>
      </div>
    </footer>
</template>

<script setup>
import { ref } from 'vue'

const showDetails = ref(false)
const animateInfo = ref(false)

const toggleDetails = () => {
  showDetails.value = !showDetails.value
  if (showDetails.value) {
    animateInfo.value = true
    setTimeout(() => {
      animateInfo.value = false
    }, 500)
  }
}
</script>

<style scoped>
.page.about {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  line-height: 1.6;
  font-family: 'Helvetica Neue', sans-serif;
  color: #333;
  background-color: #fefefe;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.page.about h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  text-align: center;
  color: #b45309;
}

.page.about .intro {
  font-size: 1.25rem;
  text-align: justify;
  margin-bottom: 1.5rem;
}

.btn-toggle {
  display: block;
  margin: 0 auto 1.5rem;
  padding: 0.75rem 1.5rem;
  background-color: #d97706;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.btn-toggle:hover {
  background-color: #b45309;
  transform: scale(1.05);
}

.extra-info {
  overflow: hidden;
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.extra-info.animate {
  animation: fadeIn 0.5s ease-out;
}

/* Navbar Styles */
.navbar {
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.navbar-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
}

.navbar-left {
  display: flex;
  align-items: center;
}

.navbar-logo h1 {
  font-size: 1.5rem;
  font-weight: bold;
  color: #b45309;
}

.navbar-links {
  display: none;
  margin-left: 1.5rem;
}

@media (min-width: 640px) {
  .navbar-links {
    display: flex;
    gap: 1.25rem;
  }
}

.navbar-link {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem;
  border-bottom: 2px solid transparent;
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
  text-decoration: none;
}

.navbar-link:hover {
  color: #4b5563;
  border-bottom-color: #d1d5db;
}

.navbar-link.active {
  color: #111827;
  border-bottom-color: #d97706;
}

.navbar-right {
  display: flex;
  align-items: center;
}

.logout-link {
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  text-align: left;
}

.users-icon {
  background-color: #fbbf24;
  width: 2rem;
  height: 2rem;
  display: inline-block;
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'/%3E%3C/svg%3E");
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'/%3E%3C/svg%3E");
  mask-size: cover;
  -webkit-mask-size: cover;
  border-radius: 9999px;
}

.user-button {
  background-color: white;
  border-radius: 9999px;
  display: flex;
  padding: 0;
  border: none;
  cursor: pointer;
}

.user-button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(217, 119, 6, 0.5);
}

.user-button img {
  height: 2rem;
  width: 2rem;
  border-radius: 9999px;
  border: 1px solid #e5e7eb;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
.username-label {
  margin-right: 1rem;
}

.about-footer {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
  text-align: center;
  font-size: 0.875rem;
  color: #6b7280;
}

.about-footer strong {
  color: #111827;
}

/* Footer */
.footer {
  background-color: white;
  padding: 3rem 1rem;
}

.footer-container {
  max-width: 1280px;
  margin: 0 auto;
  overflow: hidden;
}

.footer-nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.25rem;
  margin: -0.5rem;
}

.footer-link {
  padding: 0.5rem;
  font-size: 1rem;
  color: #6b7280;
  text-decoration: none;
}

.footer-link:hover {
  color: #111827;
}

.copyright {
  margin-top: 2rem;
  text-align: center;
  font-size: 0.875rem;
  color: #6b7280;
}
</style>