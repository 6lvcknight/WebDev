<template>
  <div class="page blog">
    <h1>BookNest Blog</h1>
    <p class="intro">
      Dive into our blog where we share news, reviews, author interviews, and insightful articles 
      about the literary world. Stay updated with the latest trends and discover hidden gems 
      across all genres.
    </p>

    <!-- Featured Posts Grid -->
    <div class="posts-grid">
      <div v-for="post in posts" :key="post.id" class="post-card">
        <h2 class="post-title">{{ post.title }}</h2>
        <p class="post-date">{{ post.date }}</p>
        <p class="post-excerpt">{{ post.excerpt }}</p>
        <router-link :to="`/blog/${post.id}`" class="read-more">
          Read more →
        </router-link>
      </div>
    </div>

    <!-- Creators footer -->
    <footer class="blog-footer">
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

// Sample blog posts
const posts = ref([
  {
    id: 1,
    title: 'Top 10 Fantasy Novels of 2024',
    date: 'March 15, 2025',
    excerpt: 'From epic world‑building to unforgettable heroes, these ten fantasy novels defined the genre in 2024...'
  },
  {
    id: 2,
    title: 'Interview: Behind the Scenes with Author Jane Doe',
    date: 'April 2, 2025',
    excerpt: 'We sat down with Jane Doe to talk inspiration, writing rituals, and her upcoming thriller that has everyone talking...'
  },
  {
    id: 3,
    title: 'How to Build a Reading Habit That Lasts',
    date: 'April 10, 2025',
    excerpt: 'Struggling to make time for books? Here are five science‑backed tips to turn reading into a lifelong habit...'
  }
])
</script>

<style scoped>
.page.blog {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  font-family: 'Helvetica Neue', sans-serif;
  color: #333;
  background-color: #fefefe;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.page.blog h1 {
  font-size: 3rem;
  text-align: center;
  color: #b45309;
  margin-bottom: 1rem;
}

.page.blog .intro {
  font-size: 1.25rem;
  text-align: justify;
  margin-bottom: 2rem;
  color: #555;
}

/* Posts grid */
.posts-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .posts-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.post-card {
  background: white;
  padding: 1.5rem;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.post-title {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #111827;
}

.post-date {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 1rem;
}

.post-excerpt {
  flex-grow: 1;
  font-size: 1rem;
  color: #374151;
  margin-bottom: 1rem;
}

.read-more {
  align-self: flex-start;
  font-weight: 600;
  color: #d97706;
  text-decoration: none;
  transition: color 0.2s;
}

.read-more:hover {
  color: #b45309;
}

/* Creators footer styling */
.blog-footer {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
  text-align: center;
  font-size: 0.875rem;
  color: #6b7280;
}

.blog-footer strong {
  color: #111827;
}
</style>
