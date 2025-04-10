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
  <div class="page blog">
    <h1>BookNest Blog</h1>
    <p class="intro">
      Dive into our blog where we share news, reviews, author interviews, and insightful articles 
      about the literary world. Stay updated with the latest trends and discover hidden gems 
      across all genres.
    </p>

    <!-- Featured Posts Grid -->
    <div class="posts-grid">
      <div v-for="post in posts" :key="post.id" class="post-card">
        <h2 class="post-title">{{ post.title }}</h2>
        <p class="post-date">{{ post.date }}</p>
        <p class="post-excerpt">{{ post.excerpt }}</p>
        <router-link :to="`/blog/${post.id}`" class="read-more">
          Read more →
        </router-link>
      </div>
    </div>

    <!-- Creators footer -->
    <footer class="blog-footer">
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

// Sample blog posts
const posts = ref([
  {
    id: 1,
    title: 'Top 10 Fantasy Novels of 2024',
    date: 'March 15, 2025',
    excerpt: 'From epic world‑building to unforgettable heroes, these ten fantasy novels defined the genre in 2024...'
  },
  {
    id: 2,
    title: 'Interview: Behind the Scenes with Author Jane Doe',
    date: 'April 2, 2025',
    excerpt: 'We sat down with Jane Doe to talk inspiration, writing rituals, and her upcoming thriller that has everyone talking...'
  },
  {
    id: 3,
    title: 'How to Build a Reading Habit That Lasts',
    date: 'April 10, 2025',
    excerpt: 'Struggling to make time for books? Here are five science‑backed tips to turn reading into a lifelong habit...'
  }
])
</script>

<style scoped>
.page.blog {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  font-family: 'Helvetica Neue', sans-serif;
  color: #333;
  background-color: #fefefe;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.page.blog h1 {
  font-size: 3rem;
  text-align: center;
  color: #b45309;
  margin-bottom: 1rem;
}

.page.blog .intro {
  font-size: 1.25rem;
  text-align: justify;
  margin-bottom: 2rem;
  color: #555;
}

/* Posts grid */
.posts-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .posts-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.post-card {
  background: white;
  padding: 1.5rem;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.post-title {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #111827;
}

.post-date {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 1rem;
}

.post-excerpt {
  flex-grow: 1;
  font-size: 1rem;
  color: #374151;
  margin-bottom: 1rem;
}

.read-more {
  align-self: flex-start;
  font-weight: 600;
  color: #d97706;
  text-decoration: none;
  transition: color 0.2s;
}

.read-more:hover {
  color: #b45309;
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

/* Creators footer styling */
.blog-footer {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
  text-align: center;
  font-size: 0.875rem;
  color: #6b7280;
}

.blog-footer strong {
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
