<template>
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <h1 class="logo">BookNest</h1>
          <p class="tagline">Your Digital Library</p>
        </div>
        
        <form @submit.prevent="handleLogin" class="login-form">
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
          
          <div class="form-options">
            <div class="remember-me">
              <input 
                id="remember-me" 
                v-model="rememberMe" 
                type="checkbox" 
              />
              <label for="remember-me">Remember me</label>
            </div>
            
            <div class="forgot-password">
              <a href="#">Forgot password?</a>
            </div>
          </div>
          
          <div class="form-actions">
            <button type="submit" class="btn-primary">Sign in</button>
          </div>
        </form>
        
        <div class="login-footer">
          <p>
            Don't have an account?
            <router-link to="/register" class="link">Register now</router-link>
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { login } from '../api.js'  // 🔥 make sure this path is correct
  
  const email = ref('')
  const password = ref('')
  const rememberMe = ref(false)
  const router = useRouter()
  const errorMsg = ref('')
  
  const handleLogin = async () => {
    try {
      const res = await login({ email: email.value, password: password.value })
  
      if (res.token) {
        localStorage.setItem('token', res.token)
  
        // Optional: store user info
        localStorage.setItem('user', JSON.stringify(res.user))
  
        // Redirect after login
        router.push('/home')
      } else {
        errorMsg.value = res.message || 'Login failed'
      }
    } catch (err) {
      errorMsg.value = 'Something went wrong. Please try again.'
      console.error(err)
    }
  }
  </script>
  
  
  <style scoped>
  .login-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    background-color: #fff8e1;
  }
  
  /* Dynamic background pattern */
  .login-container::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 30%, rgba(217, 119, 6, 0.15) 0%, transparent 20%),
      radial-gradient(circle at 80% 70%, rgba(217, 119, 6, 0.1) 0%, transparent 20%),
      radial-gradient(circle at 40% 80%, rgba(217, 119, 6, 0.15) 0%, transparent 20%),
      radial-gradient(circle at 70% 20%, rgba(217, 119, 6, 0.1) 0%, transparent 20%);
    z-index: 0;
  }
  
  /* Book pattern overlay */
  .login-container::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d97706' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    opacity: 0.5;
    z-index: 0;
    animation: backgroundScroll 60s linear infinite;
  }
  
  @keyframes backgroundScroll {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 100% 100%;
    }
  }
  
  .login-card {
    max-width: 400px;
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
  
  .login-header {
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
  
  .login-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
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
  
  .form-options {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .remember-me {
    display: flex;
    align-items: center;
  }
  
  .remember-me input {
    height: 1rem;
    width: 1rem;
    color: #d97706;
  }
  
  .remember-me label {
    margin-left: 0.5rem;
    font-size: 0.875rem;
    color: #374151;
  }
  
  .forgot-password {
    font-size: 0.875rem;
  }
  
  .forgot-password a {
    font-weight: 500;
    color: #d97706;
    text-decoration: none;
    transition: color 0.2s;
  }
  
  .forgot-password a:hover {
    color: #b45309;
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
  
  .btn-primary:hover {
    background-color: #b45309;
  }
  
  .btn-primary:active {
    transform: translateY(1px);
  }
  
  .btn-primary:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(217, 119, 6, 0.5);
  }
  
  .login-footer {
    margin-top: 1.5rem;
    text-align: center;
  }
  
  .login-footer p {
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