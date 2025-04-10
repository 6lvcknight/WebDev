<template>
    <div class="home-container">
      <!-- Navigation -->
      <nav class="navbar">
        <div class="navbar-container">
          <div class="navbar-left">
            <div class="navbar-logo">
              <h1>BookNest</h1>
            </div>
            <div class="navbar-links">
              <router-link to="/" class="navbar-link active">Home</router-link>
              <router-link to="/browse" class="navbar-link">Browse</router-link>
              <router-link to="/my-books" class="navbar-link">My Books</router-link>
              <router-link to="/admin" class="navbar-link">Admin</router-link>
            </div>
          </div>
          <div class="navbar-right">
            <div v-if="username" class="flex items-center gap-4">
              <router-link to="/admin" class="navbar-link">Admin</router-link>
              <span class="username-label">Logged in as {{ username }}</span>
              <button @click="handleLogout" class="navbar-link logout-link">Logout</button>
            </div>
          </div>
        </div>
      </nav>
  
      <!-- Hero Section -->
      <div class="hero-section">
        <div class="hero-content">
          <h1>Discover Your Next Great Read</h1>
          <p>BookNest provides access to thousands of books across all genres. Start your reading journey today.</p>
          
          <div class="search-container">
            <div class="search-box">
              <input type="text" placeholder="Search for books, authors, or genres">
              <button class="search-button">Search</button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Featured Books Section -->
      <div class="section">
        <div class="section-container">
          <h2 class="section-title">Featured Books</h2>
          <div class="books-grid">
            <div v-for="book in featuredBooks" :key="book.id" class="book-card">
              <img :src="book.coverImage" :alt="book.title" class="book-cover">
              <div class="book-info">
                <h3 class="book-title">{{ book.title }}</h3>
                <p class="book-author">{{ book.author }}</p>
                <div class="book-rating">
                  <div class="stars">
                    <svg v-for="i in 5" :key="i" class="star" :class="i <= book.rating ? 'filled' : ''" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <span class="rating-text">{{ book.rating }}/5</span>
                </div>
                <router-link :to="`/book/${book.id}`" class="book-link">
                  View details
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Categories Section -->
      <div class="section categories-section">
        <div class="section-container">
          <h2 class="section-title">Browse by Category</h2>
          <div class="categories-grid">
            <div v-for="category in categories" :key="category.id" class="category-card">
              <div class="category-icon">
                <component :is="category.icon" />
              </div>
              <h3 class="category-name">{{ category.name }}</h3>
              <p class="category-count">{{ category.count }} books</p>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Recent Additions -->
      <div class="section">
        <div class="section-container">
          <h2 class="section-title">Recent Additions</h2>
          <div class="books-grid">
            <div v-for="book in recentBooks" :key="book.id" class="book-card">
              <img :src="book.coverImage" :alt="book.title" class="book-cover">
              <div class="book-info">
                <h3 class="book-title">{{ book.title }}</h3>
                <p class="book-author">{{ book.author }}</p>
                <p class="book-date">Added {{ book.addedDate }}</p>
                <router-link :to="`/book/${book.id}`" class="book-link">
                  View details
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Call to Action -->
      <div class="cta-section">
        <div class="cta-container centered-cta">
          <h2 class="cta-title">
            <span>Ready to start reading?</span>
          </h2>
          <div class="cta-buttons single-button">
            <router-link to="/browse" class="btn-primary">
              Browse books
            </router-link>
          </div>
        </div>
      </div>

      <!-- Footer -->
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
    </div>
  </template>



  <script setup>
    import { onMounted, ref } from 'vue'
    import { useRouter } from 'vue-router'
    import { getUser, logout } from '../composables/useAuth'

    const router = useRouter()
    const username = ref('')

    const user = ref(null)

    onMounted(() => {
    user.value = getUser()
    if (user.value) {
      username.value = user.value.username
    }
  })

  const handleLogout = () => {
    logout()
    username.value = ''
    router.push('/login')
}


  // Sample data for featured books
  const featuredBooks = ref([
    {
      id: 1,
      title: 'The Midnight Library',
      author: 'Matt Haig',
      coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      rating: 4.5
    },
    {
      id: 2,
      title: 'Klara and the Sun',
      author: 'Kazuo Ishiguro',
      coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      rating: 4
    },
    {
      id: 3,
      title: 'Project Hail Mary',
      author: 'Andy Weir',
      coverImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      rating: 5
    },
    {
      id: 4,
      title: 'The Four Winds',
      author: 'Kristin Hannah',
      coverImage: 'https://images.unsplash.com/photo-1589998059171-988d887df646?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      rating: 4
    }
  ]);

  // Sample data for categories
  const categories = ref([
    { id: 1, name: 'Fiction', count: 1243, icon: 'BookIcon' },
    { id: 2, name: 'Non-Fiction', count: 857, icon: 'BookOpenIcon' },
    { id: 3, name: 'Science', count: 453, icon: 'FlaskIcon' },
    { id: 4, name: 'History', count: 352, icon: 'ClockIcon' },
    { id: 5, name: 'Biography', count: 286, icon: 'UserIcon' },
    { id: 6, name: 'Fantasy', count: 512, icon: 'SparklesIcon' }
  ]);

  // Sample data for recent books
  const recentBooks = ref([
    {
      id: 5,
      title: 'The Invisible Life of Addie LaRue',
      author: 'V.E. Schwab',
      coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      addedDate: '2 days ago'
    },
    {
      id: 6,
      title: 'The Vanishing Half',
      author: 'Brit Bennett',
      coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      addedDate: '3 days ago'
    },
    {
      id: 7,
      title: 'Hamnet',
      author: 'Maggie O\'Farrell',
      coverImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      addedDate: '5 days ago'
    },
    {
      id: 8,
      title: 'The Guest List',
      author: 'Lucy Foley',
      coverImage: 'https://images.unsplash.com/photo-1589998059171-988d887df646?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      addedDate: '1 week ago'
    }
  ]);
  </script>



  <style scoped>
  .home-container {
    min-height: 100vh;
    background-color: #fff8e1;
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

  /* Hero Section */
  .hero-section {
    position: relative;
    background-color: #b45309;
    color: white;
    padding: 6rem 1rem;
  }

  .hero-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80');
    background-size: cover;
    background-position: center;
    opacity: 0.3;
  }

  .hero-content {
    position: relative;
    max-width: 1280px;
    margin: 0 auto;
    z-index: 1;
  }

  .hero-content h1 {
    font-size: 2.25rem;
    font-weight: 800;
    line-height: 1.2;
    margin-bottom: 1.5rem;
  }

  @media (min-width: 640px) {
    .hero-content h1 {
      font-size: 3rem;
    }
  }

  @media (min-width: 1024px) {
    .hero-content h1 {
      font-size: 3.75rem;
    }
  }

  .hero-content p {
    font-size: 1.125rem;
    color: #fef3c7;
    max-width: 48rem;
    margin-bottom: 2.5rem;
  }

  .search-container {
    max-width: 36rem;
  }

  .search-box {
    display: flex;
    width: 100%;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .search-box input {
    flex-grow: 1;
    padding: 0.75rem 1rem;
    border: none;
    border-top-left-radius: 0.375rem;
    border-bottom-left-radius: 0.375rem;
    font-size: 0.875rem;
  }

  .search-box input:focus {
    outline: none;
  }

  .search-button {
    display: inline-flex;
    align-items: center;
    padding: 0.75rem 1rem;
    background-color: #d97706;
    color: white;
    font-size: 0.875rem;
    font-weight: 500;
    border: none;
    border-top-right-radius: 0.375rem;
    border-bottom-right-radius: 0.375rem;
    cursor: pointer;
  }

  .search-button:hover {
    background-color: #b45309;
  }

  /* Section Styles */
  .section {
    padding: 3rem 1rem;
  }

  @media (min-width: 768px) {
    .section {
      padding: 3rem 1.5rem;
    }
  }

  @media (min-width: 1024px) {
    .section {
      padding: 4rem 2rem;
    }
  }

  .section-container {
    max-width: 1280px;
    margin: 0 auto;
  }

  .section-title {
    font-size: 1.875rem;
    font-weight: bold;
    color: #111827;
    margin-bottom: 1.5rem;
  }

  /* Books Grid */
  .books-grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 1.5rem;
  }

  @media (min-width: 640px) {
    .books-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .books-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  .book-card {
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .book-card:hover {
    transform: translateY(-0.25rem);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .book-cover {
    width: 100%;
    height: 16rem;
    object-fit: cover;
  }

  .book-info {
    padding: 1rem;
  }

  .book-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: #111827;
    margin-bottom: 0.25rem;
  }

  .book-author {
    font-size: 0.875rem;
    color: #6b7280;
  }

  .book-rating {
    display: flex;
    align-items: center;
    margin-top: 0.5rem;
  }

  .stars {
    display: flex;
  }

  .star {
    height: 1.25rem;
    width: 1.25rem;
    color: #d1d5db;
  }

  .star.filled {
    color: #fbbf24;
  }

  .rating-text {
    font-size: 0.875rem;
    color: #6b7280;
    margin-left: 0.25rem;
  }

  .book-date {
    font-size: 0.75rem;
    color: #6b7280;
    margin-top: 0.5rem;
  }

  .book-link {
    display: inline-block;
    margin-top: 0.75rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: #d97706;
    text-decoration: none;
  }

  .book-link:hover {
    color: #b45309;
  }

  /* Categories Section */
  .categories-section {
    background-color: #f3f4f6;
  }

  .categories-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  @media (min-width: 768px) {
    .categories-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .categories-grid {
      grid-template-columns: repeat(6, 1fr);
    }
  }

  .category-card {
    background-color: white;
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    text-align: center;
    transition: box-shadow 0.3s ease;
  }

  .category-card:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .category-icon {
    width: 3rem;
    height: 3rem;
    background-color: #fff8e1;
    border-radius: 9999px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 0.75rem;
  }

  .category-icon svg {
    height: 1.5rem;
    width: 1.5rem;
    color: #d97706;
  }

  .category-name {
    font-size: 0.875rem;
    font-weight: 500;
    color: #111827;
  }

  .category-count {
    font-size: 0.75rem;
    color: #6b7280;
    margin-top: 0.25rem;
  }

  /* CTA Section */
  .cta-section {
    background-color: #b45309;
    padding: 3rem 1rem;
  }

  @media (min-width: 1024px) {
    .cta-section {
      padding: 4rem 2rem;
    }
  }

  .cta-container {
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media (min-width: 1024px) {
    .cta-container {
      flex-direction: row;
      justify-content: space-between;
    }
  }

  .cta-title {
    font-size: 1.875rem;
    font-weight: 800;
    line-height: 1.2;
    color: white;
    display: flex;
    flex-direction: column;
  }

  @media (min-width: 640px) {
    .cta-title {
      font-size: 2.25rem;
    }
  }

  .cta-subtitle {
    color: #fef3c7;
  }

  .cta-buttons {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 2rem;
  }

  @media (min-width: 640px) {
    .cta-buttons {
      flex-direction: row;
    }
  }

  @media (min-width: 1024px) {
    .cta-buttons {
      margin-top: 0;
    }
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 1.25rem;
    background-color: #d97706;
    color: white;
    font-size: 1rem;
    font-weight: 500;
    border-radius: 0.375rem;
    text-decoration: none;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }

  .btn-primary:hover {
    background-color: #92400e;
  }

  .btn-secondary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 1.25rem;
    background-color: white;
    color: #b45309;
    font-size: 1rem;
    font-weight: 500;
    border-radius: 0.375rem;
    text-decoration: none;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }

  .btn-secondary:hover {
    background-color: #f9fafb;
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
  .cta-buttons.single-button {
    justify-content: center;
    flex-direction: row;
    width: 100%;
  }

  .centered-cta {
    text-align: center;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .centered-cta .cta-title {
    align-items: center;
  }
  </style>