<template>
  <div class="my-books-container">
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
            <router-link to="/my-books" class="navbar-link active">My Books</router-link>
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
      <div class="my-books-header">
        <h1>My Books</h1>
        <p>Manage your borrowed books and wishlist</p>
      </div>

      <div class="tabs-container">
        <div class="tabs">
          <button 
            :class="['tab-button', { active: activeTab === 'borrowed' }]" 
            @click="activeTab = 'borrowed'"
          >
            Borrowed Books
          </button>
          <button 
            :class="['tab-button', { active: activeTab === 'wishlist' }]" 
            @click="activeTab = 'wishlist'"
          >
            Wishlist
          </button>
        </div>
        
        <!-- Borrowed Books Tab -->
        <div v-if="activeTab === 'borrowed'" class="tab-content">
          <div v-if="borrowedBooks.length === 0" class="empty-state">
            <p>You haven't borrowed any books yet.</p>
            <router-link to="/browse" class="browse-link">Browse Books</router-link>
          </div>
          <div v-else class="books-list">
            <div v-for="book in borrowedBooks" :key="book.id" class="book-item">
              <img :src="book.coverImage" :alt="book.title" class="book-cover">
              <div class="book-details">
                <h2 class="book-title">{{ book.title }}</h2>
                <p class="book-author">by {{ book.author }}</p>
                <p class="due-date">Due: {{ formatDate(book.dueDate) }}</p>
                <button @click="returnBook(book.id)" class="return-button">Return Book</button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Wishlist Tab -->
        <div v-if="activeTab === 'wishlist'" class="tab-content">
          <div v-if="wishlistBooks.length === 0" class="empty-state">
            <p>Your wishlist is empty.</p>
            <router-link to="/browse" class="browse-link">Browse Books</router-link>
          </div>
          <div v-else class="books-list">
            <div v-for="book in wishlistBooks" :key="book.id" class="book-item">
              <img :src="book.coverImage" :alt="book.title" class="book-cover">
              <div class="book-details">
                <h2 class="book-title">{{ book.title }}</h2>
                <p class="book-author">by {{ book.author }}</p>
                <div class="book-availability" :class="book.available ? 'available' : 'unavailable'">
                  {{ book.available ? 'Available' : 'Unavailable' }}
                </div>
                <div class="book-actions">
                  <button 
                    @click="borrowBook(book.id)" 
                    :disabled="!book.available"
                    class="borrow-button"
                  >
                    Borrow
                  </button>
                  <button @click="removeFromWishlist(book.id)" class="remove-button">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

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
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getUser, logout } from '../composables/useAuth';

const router = useRouter();
const username = ref('');
const activeTab = ref('borrowed');
const user = ref(null);

onMounted(() => {
  user.value = getUser();
  if (user.value) {
    username.value = user.value.username;
  }
});

const handleLogout = () => {
  logout();
  username.value = '';
  router.push('/login');
};

// Sample data - will be replaced with API calls
const borrowedBooks = ref([
  {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    dueDate: new Date('2025-04-16')
  }
]);

const wishlistBooks = ref([
  {
    id: 2,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    available: true
  },
  {
    id: 3,
    title: '1984',
    author: 'George Orwell',
    coverImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    available: false
  }
]);

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const returnBook = (bookId) => {
  // This will be replaced with an actual API call
  console.log(`Returning book with ID: ${bookId}`);
  borrowedBooks.value = borrowedBooks.value.filter(book => book.id !== bookId);
};

const borrowBook = (bookId) => {
  // This will be replaced with an actual API call
  console.log(`Borrowing book with ID: ${bookId}`);
  const bookToBorrow = wishlistBooks.value.find(book => book.id === bookId);
  if (bookToBorrow && bookToBorrow.available) {
    // Add to borrowed books
    borrowedBooks.value.push({
      ...bookToBorrow,
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 14 days from now
    });
    // Remove from wishlist
    removeFromWishlist(bookId);
  }
};

const removeFromWishlist = (bookId) => {
  // This will be replaced with an actual API call
  console.log(`Removing book with ID: ${bookId} from wishlist`);
  wishlistBooks.value = wishlistBooks.value.filter(book => book.id !== bookId);
};
</script>

<style scoped>
.my-books-container {
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

.username-label {
  margin-right: 1rem;
}

.logout-link {
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  text-align: left;
}

/* Main Content */
.main-content {
  flex: 1;
  padding: 2rem 1rem;
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
}

@media (min-width: 768px) {
  .main-content {
    padding: 2rem;
  }
}

.my-books-header {
  margin-bottom: 2rem;
  text-align: center;
}

.my-books-header h1 {
  font-size: 2.25rem;
  font-weight: 800;
  color: #111827;
  margin-bottom: 0.5rem;
}

.my-books-header p {
  font-size: 1.125rem;
  color: #6b7280;
}

.tabs-container {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.tabs {
  display: flex;
  border-bottom: 1px solid #e5e7eb;
}

.tab-button {
  padding: 1rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: #6b7280;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
}

.tab-button:hover {
  color: #111827;
}

.tab-button.active {
  color: #111827;
  border-bottom-color: #d97706;
  font-weight: 600;
}

.tab-content {
  padding: 1.5rem;
}

.empty-state {
  text-align: center;
  padding: 3rem 1.5rem;
  background-color: #f9fafb;
  border-radius: 0.375rem;
}

.empty-state p {
  font-size: 1.125rem;
  color: #6b7280;
  margin-bottom: 1rem;
}

.browse-link {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: #d97706;
  color: white;
  font-weight: 500;
  border-radius: 0.375rem;
  text-decoration: none;
}

.browse-link:hover {
  background-color: #b45309;
}

.books-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .books-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

.book-item {
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

@media (min-width: 640px) {
  .book-item {
    flex-direction: row;
  }
}

.book-cover {
  width: 100%;
  height: 12rem;
  object-fit: cover;
}

@media (min-width: 640px) {
  .book-cover {
    width: 8rem;
    height: auto;
  }
}

.book-details {
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.book-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.25rem;
}

.book-author {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.75rem;
}

.due-date {
  font-size: 0.875rem;
  font-weight: 500;
  color: #ef4444;
  margin-bottom: 1rem;
}

.book-availability {
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.125rem 0.375rem;
  border-radius: 9999px;
  display: inline-block;
  margin-bottom: 0.75rem;
  width: fit-content;
}

.book-availability.available {
  background-color: #d1fae5;
  color: #065f46;
}

.book-availability.unavailable {
  background-color: #fee2e2;
  color: #991b1b;
}

.book-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: auto;
}

.return-button, .borrow-button, .remove-button {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
}

.return-button {
  background-color: #ef4444;
  color: white;
  border: none;
  width: 100%;
}

.return-button:hover {
  background-color: #dc2626;
}

.borrow-button {
  background-color: #d97706;
  color: white;
  border: none;
  flex: 1;
}

.borrow-button:hover:not(:disabled) {
  background-color: #b45309;
}

.borrow-button:disabled {
  background-color: #d1d5db;
  cursor: not-allowed;
}

.remove-button {
  background-color: white;
  color: #6b7280;
  border: 1px solid #d1d5db;
}

.remove-button:hover {
  background-color: #f9fafb;
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