<template>
  <aside class="sidebar">
    <nav>
      <router-link to="/clientes" exact-active-class="active">📋 Clientes</router-link>
      <router-link to="/cliente/novo" exact-active-class="active">➕ Novo Cliente</router-link>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 220px;
  background-color: #f7f8fc;
  border-right: 1px solid #e6e6e6;
  padding: 1rem;
  min-height: 100vh;
  position: sticky;
  top: 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
}

.logo {
  font-size: 1.4rem;
  font-weight: bold;
  color: #5e72e4;
  margin-bottom: 2rem;
}

nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

nav a {
  display: block;
  padding: 0.7rem 1rem;
  text-decoration: none;
  color: #333;
  font-weight: 600;
  border-radius: 6px;
  transition: background 0.2s;
}

nav a:hover {
  background-color: #e9ecff;
}

nav a.active {
  background-color: #5e72e4;
  color: white;
}

.sidebar-bottom {
  text-align: center;
  font-size: 0.75rem;
  color: #999;
  padding-top: 1rem;
  border-top: 1px solid #ddd;
}

/* Responsivo */
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    top: 60px;
    left: -100%;
    height: calc(100% - 60px);
    transition: left 0.3s ease;
    z-index: 20;
  }

  .mobile-menu-open .sidebar {
    left: 0;
  }
}


</style>
