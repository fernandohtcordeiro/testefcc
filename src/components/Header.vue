<template>
  <header class="dashboard-header">
    <button class="menu-toggle" @click="$emit('toggle-menu')">☰</button>
    <h1 class="header-title">📊 Dashboard Clientes</h1>
    <button @click="$emit('logout')" class="logout-btn">Sair</button>
  </header>
</template>

<style scoped>
.dashboard-header {
  background-color: #ffffff;
  border-bottom: 1px solid #e6e6e6;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 10;
}

.header-title {
  font-size: 1.4rem;
  color: #2e3a59;
}

.logout-btn {
  background: #f5365c;
  color: white;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

.logout-btn:hover {
  background: #d82f4b;
}

.menu-toggle {
  display: none;
  font-size: 1.5rem;
  background: #ffffff;
  color: #5e72e4;
  border: 2px solid #5e72e4;
  padding: 0.3rem 0.7rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.menu-toggle:hover {
  background-color: #e9ecff;
}

@media (max-width: 768px) {
  .menu-toggle {
    display: block;
  }

  .header-title {
    font-size: 1.1rem;
  }
}
</style>
