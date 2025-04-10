<template>
    <div class="browse-container">
      <!-- Navigation -->
      <nav class="navbar">
        <div class="navbar-container">
          <div class="navbar-left">
            <div class="navbar-logo">
              <h1>BookNest</h1>
            </div>
            <div class="navbar-links">
              <router-link to="/" class="navbar-link">Home</router-link>
              <router-link to="/browse" class="navbar-link active">Browse</router-link>
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
      <main class="main-content">
        <div class="browse-header">
          <h1>Browse Books</h1>
          <p>Discover your next favorite book from our extensive collection</p>
        </div>
  
        <div class="browse-layout">
          <!-- Filters Sidebar -->
          <aside class="filters-sidebar">
            <div class="filters-section">
              <h3 class="filters-title">Filters</h3>
              
              <div class="filter-group">
                <h4 class="filter-group-title">Categories</h4>
                <div class="filter-options">
                  <label class="filter-option">
                    <input type="checkbox" v-model="filters.categories" value="fiction" />
                    <span>Fiction</span>
                  </label>
                  <label class="filter-option">
                    <input type="checkbox" v-model="filters.categories" value="non-fiction" />
                    <span>Non-Fiction</span>
                  </label>
                  <label class="filter-option">
                    <input type="checkbox" v-model="filters.categories" value="science" />
                    <span>Science</span>
                  </label>
                  <label class="filter-option">
                    <input type="checkbox" v-model="filters.categories" value="history" />
                    <span>History</span>
                  </label>
                  <label class="filter-option">
                    <input type="checkbox" v-model="filters.categories" value="biography" />
                    <span>Biography</span>
                  </label>
                  <label class="filter-option">
                    <input type="checkbox" v-model="filters.categories" value="fantasy" />
                    <span>Fantasy</span>
                  </label>
                </div>
              </div>
              
              <div class="filter-group">
                <h4 class="filter-group-title">Rating</h4>
                <div class="filter-options">
                  <label class="filter-option">
                    <input type="checkbox" v-model="filters.ratings" value="5" />
                    <span>5 Stars</span>
                  </label>
                  <label class="filter-option">
                    <input type="checkbox" v-model="filters.ratings" value="4" />
                    <span>4 Stars & Up</span>
                  </label>
                  <label class="filter-option">
                    <input type="checkbox" v-model="filters.ratings" value="3" />
                    <span>3 Stars & Up</span>
                  </label>
                </div>
              </div>
              
              <div class="filter-group">
                <h4 class="filter-group-title">Availability</h4>
                <div class="filter-options">
                  <label class="filter-option">
                    <input type="checkbox" v-model="filters.availability" value="available" />
                    <span>Available Now</span>
                  </label>
                  <label class="filter-option">
                    <input type="checkbox" v-model="filters.availability" value="digital" />
                    <span>Digital Copy</span>
                  </label>
                </div>
              </div>
              
              <div class="filter-actions">
                <button class="btn-secondary" @click="resetFilters">Reset Filters</button>
                <button class="btn-primary" @click="applyFilters">Apply Filters</button>
              </div>
            </div>
          </aside>
  
          <!-- Books Grid -->
          <div class="books-content">
            <div class="search-sort-bar">
              <div class="search-box">
                <input type="text" v-model="searchQuery" placeholder="Search books..." />
                <button class="search-button">
                  <span class="sr-only">Search</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="search-icon">
                    <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <div class="sort-dropdown">
                <select v-model="sortOption">
                  <option value="relevance">Relevance</option>
                  <option value="newest">Newest</option>
                  <option value="title-asc">Title: A-Z</option>
                  <option value="title-desc">Title: Z-A</option>
                  <option value="rating-desc">Highest Rated</option>
                </select>
              </div>
            </div>
            
            <div class="books-grid">
              <div v-for="book in displayedBooks" :key="book.id" class="book-card">
                <div class="book-card-inner">
                  <img :src="book.coverImage" :alt="book.title" class="book-cover">
                  <div class="book-info">
                    <h3 class="book-title">{{ book.title }}</h3>
                    <p class="book-author">{{ book.author.name }}</p>
                    <div class="book-rating">
                      <div class="stars">
                        <svg v-for="i in 5" :key="i" class="star" :class="i <= book.rating ? 'filled' : ''" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                      <span class="rating-text">{{ book.rating }}/5</span>
                    </div>
                    <div class="book-categories">
                      <span v-for="(genre, index) in book.genres" :key="index" class="book-category">
                        {{ genre.name }}
                      </span>
                    </div>
                    <div class="book-availability" :class="book.isAvailable ? 'available' : 'unavailable'">
                      {{ book.isAvailable ? 'Available' : 'Borrowed' }}
                    </div>
                    <router-link :to="`/book/${book._id}`" class="book-link">
                      View details
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="pagination">
              <button 
                class="pagination-button" 
                :class="{ disabled: currentPage === 1 }"
                @click="prevPage"
                :disabled="currentPage === 1"
              >
                Previous
              </button>
              <span class="pagination-info">Page {{ currentPage }} of {{ totalPages }}</span>
              <button 
                class="pagination-button" 
                :class="{ disabled: currentPage === totalPages }"
                @click="nextPage"
                :disabled="currentPage === totalPages"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
  
      <!-- Footer -->
      <footer class="footer">
        <div class="footer-container">
          <nav class="footer-nav">
            <a href="#" class="footer-link">About</a>
            <a href="#" class="footer-link">Blog</a>
            <a href="#" class="footer-link">Contact</a>
            <a href="#" class="footer-link">Terms</a>
            <a href="#" class="footer-link">Privacy</a>
          </nav>
          <p class="copyright">&copy; 2025 BookNest. All rights reserved.</p>
        </div>
      </footer>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { getUser, logout } from '../composables/useAuth'
  
  const router = useRouter()
  const username = ref('')
  
  onMounted(() => {
    const user = getUser()
    if (user) {
      username.value = user.username
    }
  })
  
  const handleLogout = () => {
    logout()
    username.value = ''
    router.push('/login')
  }
  
  const filters = ref({
    categories: [],
    ratings: [],
    availability: []
  })
  
  const searchQuery = ref('')
  const sortOption = ref('relevance')
  const currentPage = ref(1)
  const booksPerPage = 8
  const allBooks = ref([])
  
  // Fetching book data from API
  onMounted(async () => {
    try {
      const response = await fetch('http://localhost:3000/api/library')
      const data = await response.json()
      
      allBooks.value = data.map(book => ({
        _id: book._id, // Keep the MongoDB _id for routing
        id: book._id,  // For backward compatibility if needed
        title: book.title || 'Untitled',
        author: book.author || { name: 'Unknown Author' },
        publisher: book.publisher || { name: 'Unknown Publisher' },
        coverImage: book.coverImage || 'https://via.placeholder.com/300x450?text=No+Cover',
        rating: book.reviews?.length > 0 
          ? (book.reviews.reduce((sum, review) => sum + review.rating, 0) / book.reviews.length) 
          : 0,
        isAvailable: (book.availableCopies || 0) > 0,
        genres: book.genres || [],
        description: book.description || 'No description available',
      }));
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  })
  
  // Filtered and sorted books
  const filteredBooks = computed(() => {
    let result = [...allBooks.value];
    
    // Apply search query
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      result = result.filter(book => 
        book.title.toLowerCase().includes(query) || 
        book.author?.name?.toLowerCase().includes(query)
      );
    }
    
    // Apply category filters
    if (filters.value.categories.length > 0) {
      result = result.filter(book => 
        book.genres.some(genre => 
          filters.value.categories.includes(genre.name.toLowerCase())
        )
      );
    }
    
    // Apply rating filters
    if (filters.value.ratings.length > 0) {
      result = result.filter(book => 
        filters.value.ratings.some(rating => 
          book.rating >= parseInt(rating)
        )
      );
    }
    
    // Apply availability filters
    if (filters.value.availability.length > 0) {
      if (filters.value.availability.includes('available')) {
        result = result.filter(book => book.isAvailable);
      }
      // Add more availability filters as needed
    }
    
    // Apply sorting
    switch (sortOption.value) {
      case 'newest':
        // In a real app, you'd sort by date
        result.sort((a, b) => b.id - a.id);
        break;
      case 'title-asc':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title-desc':
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'rating-desc':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Default is relevance, which we'll simulate with the original order
        break;
    }
    
    return result;
  });
  
  // Pagination
  const totalPages = computed(() => {
    return Math.ceil(filteredBooks.value.length / booksPerPage);
  });
  
  const displayedBooks = computed(() => {
    const startIndex = (currentPage.value - 1) * booksPerPage;
    const endIndex = startIndex + booksPerPage;
    return filteredBooks.value.slice(startIndex, endIndex);
  });
  
  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  };
  
  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
    }
  };
  
  const resetFilters = () => {
    filters.value = {
      categories: [],
      ratings: [],
      availability: []
    };
    searchQuery.value = '';
    sortOption.value = 'relevance';
    currentPage.value = 1;
  };
  
  const applyFilters = () => {
    // In a real app, you might want to fetch data from an API here
    currentPage.value = 1; // Reset to first page when filters change
  };
  </script>
  
  <style scoped>
  .browse-container {
    min-height: 100vh;
    background-color: #fff8e1;
    display: flex;
    flex-direction: column;
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
  .username-label {
    margin-right: 1rem;
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
  
  /* Main Content */
  .main-content {
    flex: 1;
    padding: 2rem 1rem;
  }
  
  @media (min-width: 768px) {
    .main-content {
      padding: 2rem;
    }
  }
  
  .browse-header {
    max-width: 1280px;
    margin: 0 auto 2rem;
    text-align: center;
  }
  
  .browse-header h1 {
    font-size: 2.25rem;
    font-weight: 800;
    color: #111827;
    margin-bottom: 0.5rem;
  }
  
  .browse-header p {
    font-size: 1.125rem;
    color: #6b7280;
    max-width: 36rem;
    margin: 0 auto;
  }
  
  .browse-layout {
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  
  @media (min-width: 1024px) {
    .browse-layout {
      flex-direction: row;
      gap: 2rem;
    }
  }
  .logout-link {
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  text-align: left;
}

  
  /* Filters Sidebar */
  .filters-sidebar {
    width: 100%;
  }
  
  @media (min-width: 1024px) {
    .filters-sidebar {
      width: 16rem;
      flex-shrink: 0;
    }
  }
  
  .filters-section {
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
  }
  
  .filters-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #111827;
    margin-bottom: 1.5rem;
  }
  
  .filter-group {
    margin-bottom: 1.5rem;
  }
  
  .filter-group-title {
    font-size: 0.875rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 0.75rem;
  }
  
  .filter-options {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .filter-option {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  
  .filter-option input {
    height: 1rem;
    width: 1rem;
    color: #d97706;
    margin-right: 0.5rem;
  }
  
  .filter-option span {
    font-size: 0.875rem;
    color: #4b5563;
  }
  
  .filter-actions {
    display: flex;
    gap: 0.5rem;
    margin-top: 1.5rem;
  }
  
  .btn-secondary {
    flex: 1;
    padding: 0.5rem;
    background-color: white;
    color: #4b5563;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
  }
  
  .btn-secondary:hover {
    background-color: #f9fafb;
  }
  
  .btn-primary {
    flex: 1;
    padding: 0.5rem;
    background-color: #d97706;
    color: white;
    border: none;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
  }
  
  .btn-primary:hover {
    background-color: #b45309;
  }
  
  /* Books Content */
  .books-content {
    flex: 1;
  }
  
  .search-sort-bar {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  
  @media (min-width: 640px) {
    .search-sort-bar {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
  }
  
  .search-box {
    display: flex;
    width: 100%;
    max-width: 24rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }
  
  .search-box input {
    flex-grow: 1;
    padding: 0.5rem 0.75rem;
    border: 1px solid #d1d5db;
    border-right: none;
    border-top-left-radius: 0.375rem;
    border-bottom-left-radius: 0.375rem;
    font-size: 0.875rem;
  }
  
  .search-box input:focus {
    outline: none;
    border-color: #d97706;
  }
  
  .search-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    background-color: #d97706;
    color: white;
    border: none;
    border-top-right-radius: 0.375rem;
    border-bottom-right-radius: 0.375rem;
    cursor: pointer;
  }
  
  .search-button:hover {
    background-color: #b45309;
  }
  
  .search-icon {
    height: 1.25rem;
    width: 1.25rem;
  }
  
  .sort-dropdown select {
    padding: 0.5rem 2rem 0.5rem 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    background-color: white;
    font-size: 0.875rem;
    color: #4b5563;
    appearance: none;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
    background-position: right 0.5rem center;
    background-repeat: no-repeat;
    background-size: 1.5em 1.5em;
  }
  
  .sort-dropdown select:focus {
    outline: none;
    border-color: #d97706;
    box-shadow: 0 0 0 2px rgba(217, 119, 6, 0.2);
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
      grid-template-columns: repeat(3, 1fr);
    }
  }
  
  @media (min-width: 1280px) {
    .books-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  
  .book-card {
    height: 100%;
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
  
  .book-card-inner {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  
  .book-cover {
    width: 100%;
    height: 12rem;
    object-fit: cover;
  }
  
  .book-info {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
  
  .book-title {
    font-size: 1rem;
    font-weight: 600;
    color: #111827;
    margin-bottom: 0.25rem;
  }
  
  .book-author {
    font-size: 0.875rem;
    color: #6b7280;
    margin-bottom: 0.5rem;
  }
  
  .book-rating {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
  }
  
  .stars {
    display: flex;
  }
  
  .star {
    height: 1rem;
    width: 1rem;
    color: #d1d5db;
  }
  
  .star.filled {
    color: #fbbf24;
  }
  
  .rating-text {
    font-size: 0.75rem;
    color: #6b7280;
    margin-left: 0.25rem;
  }
  
  .book-categories {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
    margin-bottom: 0.5rem;
  }
  
  .book-category {
    font-size: 0.75rem;
    padding: 0.125rem 0.375rem;
    background-color: #f3f4f6;
    color: #4b5563;
    border-radius: 9999px;
  }
  
  .book-availability {
    font-size: 0.75rem;
    font-weight: 500;
    padding: 0.125rem 0.375rem;
    border-radius: 9999px;
    display: inline-block;
    margin-bottom: 0.5rem;
  }
  
  .book-availability.available {
    background-color: #d1fae5;
    color: #065f46;
  }
  
  .book-availability.unavailable {
    background-color: #fee2e2;
    color: #991b1b;
  }
  
  .book-link {
    margin-top: auto;
    font-size: 0.875rem;
    font-weight: 500;
    color: #d97706;
    text-decoration: none;
  }
  
  .book-link:hover {
    color: #b45309;
  }
  
  /* Pagination */
  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-top: 2rem;
  }
  
  .pagination-button {
    padding: 0.5rem 1rem;
    background-color: white;
    color: #4b5563;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
  }
  
  .pagination-button:hover:not(.disabled) {
    background-color: #f9fafb;
  }
  
  .pagination-button.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .pagination-info {
    font-size: 0.875rem;
    color: #6b7280;
  }
  
  /* Footer */
  .footer {
    background-color: white;
    padding: 3rem 1rem;
    margin-top: auto;
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