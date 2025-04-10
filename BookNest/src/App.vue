<template>
  <div>
    <nav>
      <router-link to="/"></router-link>
      <router-link to="/browse"></router-link>
      <router-link to="/my-books"></router-link>
      <router-link to="/login"></router-link>
      <router-link to="/register"></router-link>
      <router-link to="/admin"></router-link>
    </nav>
    <hr />
    <router-view />
  </div>
</template>

<style>
nav {
  padding: 1rem;
  background-color: white;
}
router-link {
  margin-right: 1rem;
}
</style>
