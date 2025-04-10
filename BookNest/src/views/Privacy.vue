<template>
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
</style>
