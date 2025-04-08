<template>
    <div class="book-detail-container">
      <!-- Navigation -->
      <nav class="navbar">
        <div class="navbar-container">
          <div class="navbar-left">
            <div class="navbar-logo">
              <h1>BookNest</h1>
            </div>
            <div class="navbar-links">
              <router-link to="/home" class="navbar-link">Home</router-link>
              <router-link to="/browse" class="navbar-link">Browse</router-link>
              <router-link to="/my-books" class="navbar-link">My Books</router-link>
            </div>
          </div>
          <div class="navbar-right">
            <div class="user-menu">
              <button class="user-button">
                <span class="sr-only">Open user menu</span>
                <img src="https://via.placeholder.com/150" alt="User profile" />
              </button>
            </div>
          </div>
        </div>
      </nav>
  
      <!-- Book Detail Content -->
      <main class="main-content">
        <div class="book-detail-wrapper">
          <!-- Breadcrumbs -->
          <div class="breadcrumbs">
            <router-link to="/home" class="breadcrumb-link">Home</router-link>
            <span class="breadcrumb-separator">/</span>
            <router-link to="/browse" class="breadcrumb-link">Browse</router-link>
            <span class="breadcrumb-separator">/</span>
            <span class="breadcrumb-current">{{ book.title }}</span>
          </div>
  
          <!-- Book Detail -->
          <div class="book-detail">
            <div class="book-image-section">
              <img :src="book.coverImage" :alt="book.title" class="book-cover">
              
              <div class="book-actions">
                <button 
                  class="btn-primary" 
                  :disabled="!book.isAvailable"
                  @click="borrowBook"
                >
                  {{ book.isAvailable ? 'Borrow Book' : 'Currently Unavailable' }}
                </button>
                
                <button class="btn-secondary" @click="addToWishlist">
                  Add to Wishlist
                </button>
              </div>
            </div>
            
            <div class="book-info-section">
              <h1 class="book-title">{{ book.title }}</h1>
              
              <div class="book-meta">
                <p class="book-author">By <span>{{ book.author }}</span></p>
                
                <div class="book-rating">
                  <div class="stars">
                    <svg v-for="i in 5" :key="i" class="star" :class="i <= Math.floor(book.rating) ? 'filled' : ''" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <span class="rating-text">{{ book.rating }} out of 5</span>
                  <span class="reviews-count">({{ book.reviewsCount }} reviews)</span>
                </div>
                
                <div class="book-categories">
                  <span v-for="(category, index) in book.categories" :key="index" class="book-category">
                    {{ category }}
                  </span>
                </div>
                
                <div class="book-availability" :class="book.isAvailable ? 'available' : 'unavailable'">
                  {{ book.isAvailable ? 'Available' : 'Currently Borrowed' }}
                </div>
              </div>
              
              <div class="book-details">
                <div class="book-detail-item">
                  <span class="detail-label">Publisher:</span>
                  <span class="detail-value">{{ book.publisher }}</span>
                </div>
                
                <div class="book-detail-item">
                  <span class="detail-label">Publication Date:</span>
                  <span class="detail-value">{{ book.publicationDate }}</span>
                </div>
                
                <div class="book-detail-item">
                  <span class="detail-label">ISBN:</span>
                  <span class="detail-value">{{ book.isbn }}</span>
                </div>
                
                <div class="book-detail-item">
                  <span class="detail-label">Pages:</span>
                  <span class="detail-value">{{ book.pages }}</span>
                </div>
                
                <div class="book-detail-item">
                  <span class="detail-label">Language:</span>
                  <span class="detail-value">{{ book.language }}</span>
                </div>
              </div>
              
              <div class="book-description">
                <h2 class="section-title">Description</h2>
                <div class="description-content" v-html="book.description"></div>
              </div>
            </div>
          </div>
          
          <!-- Reviews Section -->
          <div class="reviews-section">
            <h2 class="section-title">Reviews</h2>
            
            <div class="reviews-summary">
              <div class="rating-summary">
                <div class="average-rating">
                  <span class="rating-number">{{ book.rating }}</span>
                  <div class="stars">
                    <svg v-for="i in 5" :key="i" class="star" :class="i <= Math.floor(book.rating) ? 'filled' : ''" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <span class="reviews-count">{{ book.reviewsCount }} reviews</span>
                </div>
                
                <div class="rating-bars">
                  <div v-for="i in 5" :key="i" class="rating-bar-item">
                    <span class="rating-label">{{ 6 - i }} stars</span>
                    <div class="rating-bar">
                      <div 
                        class="rating-bar-fill" 
                        :style="{ width: `${(book.ratingDistribution[6 - i] / book.reviewsCount) * 100}%` }"
                      ></div>
                    </div>
                    <span class="rating-count">{{ book.ratingDistribution[6 - i] }}</span>
                  </div>
                </div>
              </div>
              
              <div class="write-review">
                <button class="btn-secondary" @click="toggleReviewForm">
                  {{ showReviewForm ? 'Cancel' : 'Write a Review' }}
                </button>
              </div>
            </div>
            
            <!-- Review Form -->
            <div v-if="showReviewForm" class="review-form">
              <h3 class="form-title">Write Your Review</h3>
              
              <div class="form-group">
                <label for="review-rating">Rating</label>
                <div class="rating-input">
                  <button 
                    v-for="i in 5" 
                    :key="i" 
                    type="button"
                    class="rating-star" 
                    :class="{ active: i <= reviewRating }"
                    @click="reviewRating = i"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div class="form-group">
                <label for="review-title">Review Title</label>
                <input 
                  id="review-title" 
                  v-model="reviewTitle" 
                  type="text" 
                  placeholder="Summarize your review"
                />
              </div>
              
              <div class="form-group">
                <label for="review-content">Review</label>
                <textarea 
                  id="review-content" 
                  v-model="reviewContent" 
                  rows="4" 
                  placeholder="Write your review here"
                ></textarea>
              </div>
              
              <div class="form-actions">
                <button class="btn-primary" @click="submitReview">Submit Review</button>
              </div>
            </div>
            
            <!-- Reviews List -->
            <div class="reviews-list">
              <div v-for="review in book.reviews" :key="review.id" class="review-item">
                <div class="review-header">
                  <div class="reviewer-info">
                    <img :src="review.userAvatar" :alt="review.userName" class="reviewer-avatar">
                    <div class="reviewer-details">
                      <h4 class="reviewer-name">{{ review.userName }}</h4>
                      <p class="review-date">{{ review.date }}</p>
                    </div>
                  </div>
                  
                  <div class="review-rating">
                    <div class="stars">
                      <svg v-for="i in 5" :key="i" class="star" :class="i <= review.rating ? 'filled' : ''" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div class="review-content">
                  <h4 class="review-title">{{ review.title }}</h4>
                  <p class="review-text">{{ review.content }}</p>
                </div>
                
                <div class="review-footer">
                  <div class="review-actions">
                    <button class="action-button" @click="review.helpful++">
                      <span>Helpful ({{ review.helpful }})</span>
                    </button>
                    <button class="action-button">Report</button>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="load-more">
              <button class="btn-secondary">Load More Reviews</button>
            </div>
          </div>
          
          <!-- Similar Books -->
          <div class="similar-books-section">
            <h2 class="section-title">Similar Books</h2>
            
            <div class="books-grid">
              <div v-for="similarBook in similarBooks" :key="similarBook.id" class="book-card">
                <img :src="similarBook.coverImage" :alt="similarBook.title" class="book-cover">
                <div class="book-info">
                  <h3 class="book-title">{{ similarBook.title }}</h3>
                  <p class="book-author">{{ similarBook.author }}</p>
                  <div class="book-rating">
                    <div class="stars">
                      <svg v-for="i in 5" :key="i" class="star" :class="i <= similarBook.rating ? 'filled' : ''" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <span class="rating-text">{{ similarBook.rating }}/5</span>
                  </div>
                  <router-link :to="`/book/${similarBook.id}`" class="book-link">
                    View details
                  </router-link>
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
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  
  const route = useRoute();
  const router = useRouter();
  
  // Review form state
  const showReviewForm = ref(false);
  const reviewRating = ref(0);
  const reviewTitle = ref('');
  const reviewContent = ref('');
  
  const toggleReviewForm = () => {
    showReviewForm.value = !showReviewForm.value;
  };
  
  // Sample book data
  const book = ref({
    id: 1,
    title: 'The Midnight Library',
    author: 'Matt Haig',
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    reviewsCount: 428,
    categories: ['Fiction', 'Fantasy', 'Contemporary'],
    isAvailable: true,
    publisher: 'Viking',
    publicationDate: 'August 13, 2020',
    isbn: '9780525559474',
    pages: 304,
    language: 'English',
    description: `<p>Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices... Would you have done anything different, if you had the chance to undo your regrets?</p>
    <p>A dazzling novel about all the choices that go into a life well lived, from the internationally bestselling author of Reasons to Stay Alive and How To Stop Time.</p>
    <p>Somewhere out beyond the edge of the universe there is a library that contains an infinite number of books, each one the story of another reality. One tells the story of your life as it is, along with another book for the other life you could have lived if you had made a different choice at any point in your life. While we all wonder how our lives might have been, what if you had the chance to go to the library and see for yourself? Would any of these other lives truly be better?</p>`,
    ratingDistribution: {
      5: 250,
      4: 120,
      3: 40,
      2: 10,
      1: 8
    },
    reviews: [
      {
        id: 1,
        userName: 'Sarah Johnson',
        userAvatar: 'https://randomuser.me/api/portraits/women/12.jpg',
        date: 'January 15, 2023',
        rating: 5,
        title: 'A life-changing read',
        content: 'This book completely changed my perspective on life and the choices we make. The concept is fascinating and the execution is flawless. I couldn\'t put it down and finished it in one sitting.',
        helpful: 42
      },
      {
        id: 2,
        userName: 'Michael Chen',
        userAvatar: 'https://randomuser.me/api/portraits/men/22.jpg',
        date: 'December 3, 2022',
        rating: 4,
        title: 'Thought-provoking and beautiful',
        content: 'Matt Haig has a way with words that makes even the most complex philosophical concepts accessible. The story is both heartwarming and heartbreaking at the same time. My only criticism is that some parts felt a bit rushed.',
        helpful: 28
      },
      {
        id: 3,
        userName: 'Emma Wilson',
        userAvatar: 'https://randomuser.me/api/portraits/women/32.jpg',
        date: 'November 18, 2022',
        rating: 5,
        title: 'One of my favorites of the year',
        content: 'I don\'t often give 5-star reviews, but this book deserves it. The premise is unique, the characters are well-developed, and the writing is beautiful. It\'s one of those books that stays with you long after you\'ve finished reading.',
        helpful: 35
      }
    ]
  });
  
  // Sample similar books
  const similarBooks = ref([
    {
      id: 2,
      title: 'The Invisible Life of Addie LaRue',
      author: 'V.E. Schwab',
      coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      rating: 4.5
    },
    {
      id: 3,
      title: 'Klara and the Sun',
      author: 'Kazuo Ishiguro',
      coverImage: 'https://images.unsplash.com/photo-1589998059171-988d887df646?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      rating: 4
    },
    {
      id: 4,
      title: 'Project Hail Mary',
      author: 'Andy Weir',
      coverImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      rating: 5
    },
    {
      id: 5,
      title: 'The Four Winds',
      author: 'Kristin Hannah',
      coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      rating: 4
    }
  ]);
  
  // Fetch book data based on route params
  onMounted(() => {
    // In a real app, you would fetch the book data from an API
    // const bookId = route.params.id;
    // fetchBookData(bookId);
  });
  
  const borrowBook = () => {
    if (book.value.isAvailable) {
      // In a real app, you would call an API to borrow the book
      alert('Book borrowed successfully!');
      book.value.isAvailable = false;
    }
  };
  
  const addToWishlist = () => {
    // In a real app, you would call an API to add the book to the wishlist
    alert('Book added to wishlist!');
  };
  
  const submitReview = () => {
    if (reviewRating.value === 0) {
      alert('Please select a rating');
      return;
    }
  
    if (!reviewTitle.value.trim()) {
      alert('Please enter a review title');
      return;
    }
  
    if (!reviewContent.value.trim()) {
      alert('Please enter your review');
      return;
    }
  
    // In a real app, you would call an API to submit the review
    const newReview = {
      id: book.value.reviews.length + 1,
      userName: 'Current User',
      userAvatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      rating: reviewRating.value,
      title: reviewTitle.value,
      content: reviewContent.value,
      helpful: 0
    };
  
    book.value.reviews.unshift(newReview);
    book.value.reviewsCount++;
    book.value.ratingDistribution[reviewRating.value]++;
  
    // Recalculate average rating
    let totalRating = 0;
    let totalReviews = 0;
    for (let i = 1; i <= 5; i++) {
      totalRating += i * book.value.ratingDistribution[i];
      totalReviews += book.value.ratingDistribution[i];
    }
    book.value.rating = (totalRating / totalReviews).toFixed(1);
  
    // Reset form
    reviewRating.value = 0;
    reviewTitle.value = '';
    reviewContent.value = '';
    showReviewForm.value = false;
  
    alert('Review submitted successfully!');
  };
  </script>
  
  <style scoped>
  .book-detail-container {
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
  
  .book-detail-wrapper {
    max-width: 1280px;
    margin: 0 auto;
  }
  
  /* Breadcrumbs */
  .breadcrumbs {
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
    font-size: 0.875rem;
  }
  
  .breadcrumb-link {
    color: #6b7280;
    text-decoration: none;
  }
  
  .breadcrumb-link:hover {
    color: #111827;
  }
  
  .breadcrumb-separator {
    margin: 0 0.5rem;
    color: #9ca3af;
  }
  
  .breadcrumb-current {
    color: #111827;
    font-weight: 500;
  }
  
  /* Book Detail */
  .book-detail {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-bottom: 3rem;
  }
  
  @media (min-width: 768px) {
    .book-detail {
      flex-direction: row;
    }
  }
  
  .book-image-section {
    width: 100%;
  }
  
  @media (min-width: 768px) {
    .book-image-section {
      width: 30%;
      max-width: 20rem;
    }
  }
  
  .book-cover {
    width: 100%;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .book-actions {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 1.5rem;
  }
  
  .btn-primary {
    padding: 0.75rem 1rem;
    background-color: #d97706;
    color: white;
    border: none;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    text-align: center;
  }
  
  .btn-primary:hover:not(:disabled) {
    background-color: #b45309;
  }
  
  .btn-primary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .btn-secondary {
    padding: 0.75rem 1rem;
    background-color: white;
    color: #4b5563;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    color: #4b5563;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    text-align: center;
  }
  
  .btn-secondary:hover {
    background-color: #f9fafb;
  }
  
  .book-info-section {
    flex: 1;
  }
  
  .book-title {
    font-size: 1.875rem;
    font-weight: 800;
    color: #111827;
    margin-bottom: 1rem;
  }
  
  .book-meta {
    margin-bottom: 1.5rem;
  }
  
  .book-author {
    font-size: 1.125rem;
    color: #6b7280;
    margin-bottom: 0.5rem;
  }
  
  .book-author span {
    font-weight: 600;
    color: #111827;
  }
  
  .book-rating {
    display: flex;
    align-items: center;
    margin-bottom: 0.75rem;
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
    margin-left: 0.5rem;
  }
  
  .reviews-count {
    font-size: 0.875rem;
    color: #6b7280;
    margin-left: 0.25rem;
  }
  
  .book-categories {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
  }
  
  .book-category {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    background-color: #f3f4f6;
    color: #4b5563;
    border-radius: 9999px;
  }
  
  .book-availability {
    font-size: 0.875rem;
    font-weight: 500;
    padding: 0.25rem 0.5rem;
    border-radius: 9999px;
    display: inline-block;
  }
  
  .book-availability.available {
    background-color: #d1fae5;
    color: #065f46;
  }
  
  .book-availability.unavailable {
    background-color: #fee2e2;
    color: #991b1b;
  }
  
  .book-details {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 0.75rem;
    margin-bottom: 1.5rem;
    padding: 1rem;
    background-color: #f9fafb;
    border-radius: 0.5rem;
  }
  
  @media (min-width: 640px) {
    .book-details {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  .book-detail-item {
    display: flex;
    flex-direction: column;
  }
  
  .detail-label {
    font-size: 0.75rem;
    font-weight: 500;
    color: #6b7280;
  }
  
  .detail-value {
    font-size: 0.875rem;
    color: #111827;
  }
  
  .book-description {
    margin-bottom: 1.5rem;
  }
  
  .section-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #111827;
    margin-bottom: 1rem;
  }
  
  .description-content {
    font-size: 1rem;
    color: #4b5563;
    line-height: 1.5;
  }
  
  .description-content p {
    margin-bottom: 1rem;
  }
  
  /* Reviews Section */
  .reviews-section {
    margin-bottom: 3rem;
  }
  
  .reviews-summary {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
  
  @media (min-width: 768px) {
    .reviews-summary {
      flex-direction: row;
      align-items: flex-start;
    }
  }
  
  .rating-summary {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  @media (min-width: 768px) {
    .rating-summary {
      flex-direction: row;
      align-items: center;
    }
  }
  
  .average-rating {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .rating-number {
    font-size: 3rem;
    font-weight: 800;
    color: #111827;
    line-height: 1;
  }
  
  .rating-bars {
    flex: 1;
  }
  
  .rating-bar-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }
  
  .rating-label {
    font-size: 0.75rem;
    color: #6b7280;
    width: 3.5rem;
  }
  
  .rating-bar {
    flex: 1;
    height: 0.5rem;
    background-color: #e5e7eb;
    border-radius: 9999px;
    overflow: hidden;
  }
  
  .rating-bar-fill {
    height: 100%;
    background-color: #fbbf24;
  }
  
  .rating-count {
    font-size: 0.75rem;
    color: #6b7280;
    width: 2rem;
    text-align: right;
  }
  
  .write-review {
    display: flex;
    justify-content: flex-end;
  }
  
  /* Review Form */
  .review-form {
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .form-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: #111827;
    margin-bottom: 1.5rem;
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  .form-group label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
    margin-bottom: 0.5rem;
  }
  
  .rating-input {
    display: flex;
    gap: 0.25rem;
  }
  
  .rating-star {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    color: #d1d5db;
  }
  
  .rating-star.active {
    color: #fbbf24;
  }
  
  .rating-star svg {
    height: 2rem;
    width: 2rem;
  }
  
  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    font-size: 0.875rem;
  }
  
  .form-group input:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: #d97706;
    box-shadow: 0 0 0 2px rgba(217, 119, 6, 0.2);
  }
  
  .form-actions {
    display: flex;
    justify-content: flex-end;
  }
  
  /* Reviews List */
  .reviews-list {
    margin-bottom: 2rem;
  }
  
  .review-item {
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  .review-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  
  .reviewer-info {
    display: flex;
    align-items: center;
  }
  
  .reviewer-avatar {
    height: 2.5rem;
    width: 2.5rem;
    border-radius: 9999px;
    margin-right: 0.75rem;
  }
  
  .reviewer-name {
    font-size: 0.875rem;
    font-weight: 600;
    color: #111827;
  }
  
  .review-date {
    font-size: 0.75rem;
    color: #6b7280;
  }
  
  .review-content {
    margin-bottom: 1rem;
  }
  
  .review-title {
    font-size: 1rem;
    font-weight: 600;
    color: #111827;
    margin-bottom: 0.5rem;
  }
  
  .review-text {
    font-size: 0.875rem;
    color: #4b5563;
    line-height: 1.5;
  }
  
  .review-footer {
    display: flex;
    justify-content: flex-end;
  }
  
  .review-actions {
    display: flex;
    gap: 1rem;
  }
  
  .action-button {
    background: none;
    border: none;
    font-size: 0.75rem;
    color: #6b7280;
    cursor: pointer;
  }
  
  .action-button:hover {
    color: #111827;
  }
  
  .load-more {
    display: flex;
    justify-content: center;
  }
  
  /* Similar Books */
  .similar-books-section {
    margin-bottom: 3rem;
  }
  
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
    height: 12rem;
    object-fit: cover;
  }
  
  .book-info {
    padding: 1rem;
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