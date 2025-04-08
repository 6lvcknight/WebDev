<template>
    <div class="register-container">
      <div class="register-card">
        <div class="register-header">
          <h1 class="logo">BookNest</h1>
          <p class="tagline">Create Your Account</p>
        </div>
        
        <form @submit.prevent="handleRegister" class="register-form">
          <div class="form-row">
            <div class="form-group">
              <label for="firstName">First Name</label>
              <input 
                id="firstName" 
                v-model="firstName" 
                type="text" 
                required 
              />
            </div>
            
            <div class="form-group">
              <label for="lastName">Last Name</label>
              <input 
                id="lastName" 
                v-model="lastName" 
                type="text" 
                required 
              />
            </div>
          </div>
          
          <div class="form-group">
            <label for="email">Email</label>
            <input 
              id="email" 
              v-model="email" 
              type="email" 
              required 
            />
          </div>
          
          <div class="form-group">
            <label for="password">Password</label>
            <input 
              id="password" 
              v-model="password" 
              type="password" 
              required 
            />
          </div>
          
          <div class="form-group">
            <label for="confirmPassword">Confirm Password</label>
            <input 
              id="confirmPassword" 
              v-model="confirmPassword" 
              type="password" 
              required 
            />
            <p v-if="passwordMismatch" class="error-message">Passwords do not match</p>
          </div>
          
          <div class="form-checkbox">
            <input 
              id="terms" 
              v-model="agreeToTerms" 
              type="checkbox" 
              required 
            />
            <label for="terms">
              I agree to the 
              <a href="#" class="link">Terms and Conditions</a>
            </label>
          </div>
          
          <div class="form-actions">
            <button 
              type="submit" 
              class="btn-primary"
              :disabled="!formValid"
            >
              Register
            </button>
          </div>
        </form>

        
        <div class="register-footer">
          <p>
            Already have an account?
            <router-link to="/login" class="link">Sign in</router-link>
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch } from 'vue'
  import { useRouter } from 'vue-router'
  import { register } from '../api.js'
  
  const router = useRouter()
  
  const firstName = ref('')
  const lastName = ref('')
  const email = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  const agreeToTerms = ref(false)
  const passwordMismatch = ref(false)
  const formValid = ref(false)
  const errorMsg = ref('')
  
  const validatePassword = () => {
    passwordMismatch.value = password.value && confirmPassword.value && password.value !== confirmPassword.value
  }
  
  const validateForm = () => {
    formValid.value = firstName.value &&
      lastName.value &&
      email.value &&
      password.value &&
      confirmPassword.value &&
      !passwordMismatch.value &&
      agreeToTerms.value
  }
  
  watch([firstName, lastName, email, password, confirmPassword, agreeToTerms], () => {
    validatePassword()
    validateForm()
  })
  
  const handleRegister = async () => {
    if (!formValid.value) return
  
    const userData = {
      username: `${firstName.value} ${lastName.value}`,
      email: email.value,
      password: password.value
    }
  
    try {
      const res = await register(userData)
  
      if (res.message === 'User registered successfully') {
        router.push('/login')
      } else {
        errorMsg.value = res.message || 'Registration failed'
      }
    } catch (err) {
      console.error(err)
      errorMsg.value = 'Something went wrong. Please try again.'
    }
  }
  </script>
  
  
  <style scoped>
  .register-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    background-color: #fff8e1;
  }
  
  /* Dynamic background pattern */
  .register-container::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      linear-gradient(135deg, rgba(217, 119, 6, 0.1) 25%, transparent 25%) -50px 0,
      linear-gradient(225deg, rgba(217, 119, 6, 0.1) 25%, transparent 25%) -50px 0,
      linear-gradient(315deg, rgba(217, 119, 6, 0.1) 25%, transparent 25%),
      linear-gradient(45deg, rgba(217, 119, 6, 0.1) 25%, transparent 25%);
    background-size: 100px 100px;
    z-index: 0;
    animation: patternMove 60s linear infinite;
  }
  
  /* Book icons overlay */
  .register-container::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 10h40c5.523 0 10 4.477 10 10v60c0 5.523-4.477 10-10 10H30c-5.523 0-10-4.477-10-10V20c0-5.523 4.477-10 10-10zm0 5c-2.76 0-5 2.24-5 5v60c0 2.76 2.24 5 5 5h40c2.76 0 5-2.24 5-5V20c0-2.76-2.24-5-5-5H30z' fill='%23d97706' fill-opacity='0.05'/%3E%3C/svg%3E");
    opacity: 0.6;
    z-index: 0;
    animation: backgroundScroll 80s linear infinite alternate;
  }
  
  @keyframes patternMove {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 100px 100px;
    }
  }
  
  @keyframes backgroundScroll {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 100% 100%;
    }
  }
  
  .register-card {
    max-width: 500px;
    width: 100%;
    padding: 2rem;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 1;
    animation: cardFloat 6s ease-in-out infinite;
  }
  
  @keyframes cardFloat {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
  
  .register-header {
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .logo {
    font-size: 1.875rem;
    font-weight: bold;
    color: #b45309;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  }
  
  .tagline {
    color: #6b7280;
    margin-top: 0.5rem;
  }
  
  .register-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
  }
  
  .form-group label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
    margin-bottom: 0.25rem;
  }
  
  .form-group input {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  
  .form-group input:focus {
    outline: none;
    border-color: #d97706;
    box-shadow: 0 0 0 2px rgba(217, 119, 6, 0.2);
  }
  
  .error-message {
    margin-top: 0.25rem;
    font-size: 0.75rem;
    color: #dc2626;
  }
  
  .form-checkbox {
    display: flex;
    align-items: center;
  }
  
  .form-checkbox input {
    height: 1rem;
    width: 1rem;
    color: #d97706;
  }
  
  .form-checkbox label {
    margin-left: 0.5rem;
    font-size: 0.875rem;
    color: #374151;
  }
  
  .form-actions {
    margin-top: 1rem;
  }
  
  .btn-primary {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: white;
    background-color: #d97706;
    cursor: pointer;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    transition: background-color 0.2s, transform 0.1s;
  }
  
  .btn-primary:hover:not(:disabled) {
    background-color: #b45309;
  }
  
  .btn-primary:active:not(:disabled) {
    transform: translateY(1px);
  }
  
  .btn-primary:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(217, 119, 6, 0.5);
  }
  
  .btn-primary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .register-footer {
    margin-top: 1.5rem;
    text-align: center;
  }
  
  .register-footer p {
    font-size: 0.875rem;
    color: #6b7280;
  }
  
  .link {
    font-weight: 500;
    color: #d97706;
    text-decoration: none;
    transition: color 0.2s;
  }
  
  .link:hover {
    color: #b45309;
  }
  </style>