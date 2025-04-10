<template>
  <div class="page terms">
    <h1>Terms & Conditions</h1>
    <p class="intro">
      Welcome to <strong>BookNest</strong>. By accessing or using our services, you agree to be bound by these Terms & Conditions. Please read them carefully.
    </p>

    <div class="accordion">
      <div v-for="(section, idx) in sections" :key="idx" class="accordion-item">
        <button class="accordion-header" @click="toggle(idx)">
          <span>{{ section.title }}</span>
          <span class="icon">{{ openIndex === idx ? '−' : '+' }}</span>
        </button>
        <div v-show="openIndex === idx" class="accordion-body">
          <p v-for="(line, i) in section.content" :key="i">{{ line }}</p>
        </div>
      </div>
    </div>

    <footer class="terms-footer">
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
const toggle = (idx) => {
  openIndex.value = openIndex.value === idx ? null : idx
}

const sections = [
  {
    title: 'Usage',
    content: [
      'You must use BookNest in compliance with all applicable laws and these Terms.',
      'You agree not to misuse our services or interfere with their operation.'
    ]
  },
  {
    title: 'Intellectual Property',
    content: [
      'All content on BookNest, including text, graphics, and logos, is owned or licensed by us.',
      'You may not reproduce or distribute our content without our prior written consent.'
    ]
  },
  {
    title: 'Limitation of Liability',
    content: [
      'BookNest is provided "as is" without warranties of any kind.',
      'We are not liable for any indirect, incidental, or consequential damages arising from your use.'
    ]
  },
  {
    title: 'Changes to Terms',
    content: [
      'We may update these Terms from time to time. We will notify you of significant changes.',
      'Continued use after changes constitutes acceptance of the new Terms.'
    ]
  }
]
</script>

<style scoped>
.page.terms {
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

.page.terms::before {
  content: '';
  position: absolute;
  top: -40%; left: -40%;
  width: 180%; height: 180%;
  background: radial-gradient(circle at 30% 70%, rgba(217,119,6,0.1), transparent 40%);
  transform: rotate(-30deg);
}

.page.terms h1 {
  position: relative;
  font-size: 2.75rem;
  text-align: center;
  color: #b45309;
  margin-bottom: 0.5rem;
}

.page.terms .intro {
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

.terms-footer {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
  text-align: center;
  font-size: 0.875rem;
  color: #6b7280;
}

.terms-footer strong {
  color: #111827;
}
</style>