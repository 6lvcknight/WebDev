<template>
  <div class="page about">
    <h1>About BookNest</h1>
    <p class="intro">
      Welcome to <strong>BookNest</strong>—your go‑to digital library where we connect readers
      with their next great adventure! Our mission is to curate outstanding recommendations,
      foster an engaged community, and inspire lifelong learning through the written word.
    </p>

    <!-- Toggle button for more info -->
    <button class="btn-toggle" @click="toggleDetails">
      {{ showDetails ? 'Show Less' : 'Learn More' }}
    </button>

    <!-- Additional details that can be toggled -->
    <div v-if="showDetails" class="extra-info" :class="{ animate: animateInfo }">
      <h2>Our Journey</h2>
      <p>
        BookNest was conceived in early 2025 by a team of Ontario Tech students as part of our capstone project.
        Over a focused spring semester, we designed and built the platform from the ground up, emphasizing usability,
        accessibility, and community-driven recommendations.
      </p>
      <p>
        In April 2025, we officially launched the first version of BookNest, featuring curated book lists,
        user reviews, and an intuitive interface. We continue to iterate, adding features based on user feedback
        and expanding our library with diverse titles.
      </p>
    </div>

    <!-- Creators footer -->
    <footer class="about-footer">
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

const showDetails = ref(false)
const animateInfo = ref(false)

const toggleDetails = () => {
  showDetails.value = !showDetails.value
  if (showDetails.value) {
    animateInfo.value = true
    setTimeout(() => {
      animateInfo.value = false
    }, 500)
  }
}
</script>

<style scoped>
.page.about {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  line-height: 1.6;
  font-family: 'Helvetica Neue', sans-serif;
  color: #333;
  background-color: #fefefe;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.page.about h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  text-align: center;
  color: #b45309;
}

.page.about .intro {
  font-size: 1.25rem;
  text-align: justify;
  margin-bottom: 1.5rem;
}

.btn-toggle {
  display: block;
  margin: 0 auto 1.5rem;
  padding: 0.75rem 1.5rem;
  background-color: #d97706;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.btn-toggle:hover {
  background-color: #b45309;
  transform: scale(1.05);
}

.extra-info {
  overflow: hidden;
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.extra-info.animate {
  animation: fadeIn 0.5s ease-out;
}

.about-footer {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
  text-align: center;
  font-size: 0.875rem;
  color: #6b7280;
}

.about-footer strong {
  color: #111827;
}
</style>