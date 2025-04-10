<template>
  <div class="contact-page">
    <h1>Contact Us</h1>
    <p>
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
      <button type="submit" class="btn-submit">Submit</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Define reactive variables for form fields
const name = ref('')
const email = ref('')
const message = ref('')

// Handle form submission
const handleSubmit = () => {
  // Log data for now (replace this with your API call later)
  console.log('Name:', name.value)
  console.log('Email:', email.value)
  console.log('Message:', message.value)

  // Notify the user (or redirect as needed)
  alert('Thank you for contacting us! We will get back to you soon.')

  // Optionally, clear the form fields
  name.value = ''
  email.value = ''
  message.value = ''
}
</script>

<style scoped>
.contact-page {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.contact-page h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #111827;
  text-align: center;
}

.contact-page p {
  text-align: center;
  margin-bottom: 2rem;
  color: #6b7280;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #111827;
}

.form-group input,
.form-group textarea {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 1rem;
  color: #111827;
}

.btn-submit {
  padding: 0.75rem;
  background-color: #d97706;
  border: none;
  color: #fff;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-submit:hover {
  background-color: #b45309;
}
</style>
