<script setup lang="ts">
</script>

<template>
  <div class="layout">
    <!-- Header -->
    <header class="header">
      <h1>Cashflow App</h1>

      <div class="menu">
        <router-link to="/">
          View Cashflow
        </router-link>

        <router-link to="/add">
          Add Cashflow
        </router-link>
      </div>
    </header>

    <!-- Page Content -->
    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.layout {
  font-family: sans-serif;
}

.header {
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: #222;
  color: white;
}

.menu {
  position: relative;
}

.dropdown a {
  padding: 5px 10px;
  text-decoration: none;
}

.dropdown a:hover {
  background: #eee;
}

.content {
  padding: 20px;
}
</style>