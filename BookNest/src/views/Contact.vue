<template>
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
</style>
