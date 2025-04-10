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
  <div class="page privacy">
    <h1>Privacy Policy</h1>
    <p class="intro">
      At <strong>BookNest</strong>, your privacy is paramount. This Privacy Policy explains how we collect,
      use, disclose, and safeguard your information when you use our services.
    </p>

    <div class="accordion">
      <div
        v-for="(section, idx) in sections"
        :key="idx"
        class="accordion-item"
      >
        <button class="accordion-header" @click="toggle(idx)">
          <span>{{ section.title }}</span>
          <span class="icon">{{ openIndex === idx ? '−' : '+' }}</span>
        </button>
        <div
          v-show="openIndex === idx"
          class="accordion-body"
        >
          <p v-for="(line, i) in section.content" :key="i">{{ line }}</p>
        </div>
      </div>
    </div>

    <footer class="privacy-footer">
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

const openIndex = ref(null)

function toggle(idx) {
  openIndex.value = openIndex.value === idx ? null : idx
}

const sections = [
  {
    title: 'Information We Collect',
    content: [
      'We collect information you provide directly, such as your name, email address, and any messages you send.',
      'We also automatically collect usage data like pages visited, features used, and device information.'
    ]
  },
  {
    title: 'How We Use Information',
    content: [
      'To provide, maintain, and improve our services.',
      'To communicate with you about updates, promotions, and support.',
      'To personalize content and recommend books you may like.'
    ]
  },
  {
    title: 'Information Sharing & Disclosure',
    content: [
      'We do not sell your personal information to third parties.',
      'We may share information with service providers who help us operate the site, under strict confidentiality.',
      'We may disclose information to comply with legal obligations.'
    ]
  },
  {
    title: 'Data Security',
    content: [
      'We implement industry-standard security measures to protect your data.',
      'All sensitive information is encrypted in transit (HTTPS) and at rest.',
      'Access to personal data is restricted to authorized personnel only.'
    ]
  },
  {
    title: 'Your Choices',
    content: [
      'You can update or delete your account information at any time.',
      'You may opt out of promotional emails via the unsubscribe link.',
      'Cookies can be managed through your browser settings.'
    ]
  }
]
</script>

<style scoped>
.page.privacy {
  max-width: 800px;
  margin: 3rem auto;
  padding: 2.5rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  position: relative;
  font-family: 'Helvetica Neue', sans-serif;
  color: #333;
}

.page.privacy::before {
  content: '';
  position: absolute;
  top: -40%; left: -40%;
  width: 180%; height: 180%;
  background: radial-gradient(circle at 70% 30%, rgba(217,119,6,0.1), transparent 40%);
  transform: rotate(30deg);
  pointer-events: none;
  z-index: -1; 
}

.page.privacy h1 {
  position: relative;
  font-size: 2.75rem;
  text-align: center;
  color: #b45309;
  margin-bottom: 0.5rem;
}

.page.privacy .intro {
  position: relative;
  text-align: center;
  color: #6b7280;
  margin-bottom: 2rem;
  font-size: 1.125rem;
}

.accordion-item {
  border-top: 1px solid #e5e7eb;
}

.accordion-header {
  width: 100%;
  background: none;
  border: none;
  padding: 1rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  position: relative;
}

.accordion-header:hover {
  color: #d97706;
}

.icon {
  font-size: 1.5rem;
  color: #d97706;
}

.accordion-body {
  padding: 0.5rem 0 1rem;
  line-height: 1.6;
  color: #374151;
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}

.privacy-footer {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
  text-align: center;
  font-size: 0.875rem;
  color: #6b7280;
}

.privacy-footer strong {
  color: #111827;
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
