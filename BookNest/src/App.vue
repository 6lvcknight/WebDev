<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/browse">Browse</router-link> |
      <router-link to="/my-books">My Books</router-link> | <!-- Add new link -->
      <router-link to="/login">Login</router-link> |
      <router-link to="/register">Register</router-link> |
      <router-link to="/admin">Admin</router-link>
    </nav>
    <hr />
    <router-view />
  </div>
</template>

<style>
nav {
  padding: 1rem;
  background-color: #f5f5f5;
}
router-link {
  margin-right: 1rem;
}
</style>