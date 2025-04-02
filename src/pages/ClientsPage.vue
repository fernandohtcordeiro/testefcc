<template>
    <div class="layout" :class="{ 'mobile-menu-open': menuAberto }">
      <Header @logout="logout" @toggle-menu="menuAberto = !menuAberto" />
      <div class="main-content">
        <Menu />
        <div class="content">
          <h2 class="page-title">📋 Lista de Clientes</h2>
  
          <section class="search-section">
            <input v-model="cpfBusca" placeholder="Buscar CPF exato" class="search-input" />
            <button class="btn btn-search" @click="buscarPorCPF">🔍 Buscar CPF</button>
          </section>
  
          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>CPF</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="cliente in clientes" :key="cliente.clienteId">
                  <td>{{ cliente.nome }}</td>
                  <td>{{ cliente.cpf }}</td>
                  <td>
                    <button class="btn btn-edit" @click="editarCliente(cliente)">✏️</button>
                    <button class="btn btn-delete" @click="excluirCliente(cliente.clienteId)">🗑️</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '../store/authStore'
  import clientService from '../services/clientService'
  import Header from '../components/Header.vue'
  import Menu from '../components/Menu.vue'
  import Footer from '../components/Footer.vue'
  
  const authStore = useAuthStore()
  const router = useRouter()
  const clientes = ref([])
  const cpfBusca = ref('')
  const menuAberto = ref(false)
  
  const carregarClientes = async () => {
    const response = await clientService.getAll()
    clientes.value = response.data
  }
  
  const buscarPorCPF = () => {
    const cliente = clientes.value.find(c => c.cpf === cpfBusca.value)
    if (cliente) {
      alert('Cliente encontrado: ' + cliente.nome)
    } else {
      alert('Cliente não encontrado.')
    }
  }
  
  const editarCliente = (cliente) => {
    router.push({ path: '/cliente/editar/' + cliente.clienteId })
  }
  
  const excluirCliente = async (id) => {
    if (confirm('Deseja excluir este cliente?')) {
      await clientService.remove(id)
      carregarClientes()
    }
  }
  
  const logout = () => {
    authStore.logout()
    router.push('/')
  }
  
  onMounted(carregarClientes)
  </script>
  
  <style scoped>
  .page-title {
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: #2e3a59;
  }
  
  .search-section {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
  }
  
  .search-input {
    padding: 0.6rem 1rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    width: 100%;
    max-width: 300px;
    font-size: 1rem;
  }
  
  .table-wrapper {
    overflow-x: auto;
    border: 1px solid #eee;
    border-radius: 8px;
    background: #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.03);
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #eee;
  }
  
  th {
    background-color: #f7f8fc;
    font-weight: 600;
    color: #333;
  }
  
  tr:hover {
    background-color: #f1f4ff;
  }
  
  td:last-child {
    text-align: right;
  }
  
  td:last-child .btn {
    margin-left: 0.4rem;
    margin-right: 0;
  }
  
  .btn {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
    border-radius: 4px;
    font-weight: 600;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  .btn-search {
    background-color: #5e72e4;
  }
  
  .btn-edit {
    background-color: #11cdef;
  }
  
  .btn-delete {
    background-color: #f5365c;
  }
  
  @media (max-width: 768px) {
    .search-section {
      flex-direction: column;
      align-items: stretch;
    }
  
    .content {
      padding: 1rem;
    }
  
    .table-wrapper {
      font-size: 0.9rem;
    }
  
    .layout.mobile-menu-open .sidebar {
      left: 0;
    }
  }
  </style>
  