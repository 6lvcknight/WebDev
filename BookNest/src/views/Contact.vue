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
  <div class="contact-page">
    <h1>Contact Us</h1>
    <p class="intro">
      We’d love to hear from you! Please fill out the form below and we’ll get back to you as soon as possible.
    </p>
    <form @submit.prevent="handleSubmit" class="contact-form">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          id="name"
          v-model="name"
          type="text"
          placeholder="Your Name"
          required
        />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          placeholder="Your Email"
          required
        />
      </div>
      <div class="form-group">
        <label for="message">Message</label>
        <textarea
          id="message"
          v-model="message"
          rows="5"
          placeholder="Your Message"
          required
        ></textarea>
      </div>
      <button type="submit" class="btn-submit">Send Message</button>
    </form>
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

const name = ref('')
const email = ref('')
const message = ref('')

const handleSubmit = () => {
  console.log('Name:', name.value)
  console.log('Email:', email.value)
  console.log('Message:', message.value)
  alert('Thank you! We will get back to you soon.')
  name.value = ''
  email.value = ''
  message.value = ''
}
</script>

<style scoped>
.contact-page {
  max-width: 600px;
  margin: 3rem auto;
  padding: 2.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  font-family: 'Helvetica Neue', sans-serif;
}

.contact-page::before {
  content: '';
  position: absolute;
  top: -50%; left: -50%;
  width: 200%; height: 200%;
  background: radial-gradient(circle at 30% 30%, rgba(217,119,6,0.1), transparent 30%);
  transform: rotate(45deg);
}

.contact-page h1 {
  position: relative;
  font-size: 2.5rem;
  text-align: center;
  color: #b45309;
  margin-bottom: 0.5rem;
}

.contact-page .intro {
  position: relative;
  text-align: center;
  color: #6b7280;
  margin-bottom: 2rem;
  font-size: 1.125rem;
}

.contact-form {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  position: relative;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #374151;
}

.form-group input,
.form-group textarea {
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  color: #111827;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #d97706;
  box-shadow: 0 0 0 3px rgba(217,119,6,0.2);
}

.btn-submit {
  padding: 0.75rem 1.5rem;
  background-color: #d97706;
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  align-self: center;
  transition: background-color 0.3s, transform 0.2s;
}

.btn-submit:hover {
  background-color: #b45309;
  transform: translateY(-2px);
}

.btn-submit:active {
  transform: translateY(0);
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
