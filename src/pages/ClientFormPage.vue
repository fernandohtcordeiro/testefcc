<template>
    <div class="layout" :class="{ 'mobile-menu-open': menuAberto }">
      <Header @logout="logout" @toggle-menu="menuAberto = !menuAberto" />
      <div class="main-content">
        <Menu />
        <div class="content">
          <h2 class="page-title">{{ editando ? '✏️ Editar Cliente' : '➕ Novo Cliente' }}</h2>
  
          <form @submit.prevent="salvarCliente" class="form-wrapper">
            <fieldset>
              <legend>🧑‍💼 Dados Pessoais</legend>
              <div class="form-grid">
                <input v-model="form.nome" placeholder="Nome" required />
                <input v-model="form.cpf" placeholder="CPF" required />
                <input v-model="form.rg" placeholder="RG" />
                <input v-model="form.dataExpedicao" placeholder="Data Expedição (YYYY-MM-DD)" />
                <input v-model="form.orgaoExpedicao" placeholder="Órgão Expedição" />
                <input v-model="form.uf" placeholder="UF" />
                <input v-model="form.dataNascimento" placeholder="Data Nascimento (YYYY-MM-DD)" required />
                <input v-model="form.sexo" placeholder="Sexo" />
                <input v-model="form.estadoCivil" placeholder="Estado Civil" />
              </div>
            </fieldset>
  
            <fieldset>
              <legend>🏠 Endereço</legend>
              <div class="form-grid">
                <input v-model="form.cep" placeholder="CEP" />
                <input v-model="form.numero" placeholder="Número" />
                <input v-model="form.logradouro" placeholder="Logradouro" />
                <input v-model="form.complemento" placeholder="Complemento" />
                <input v-model="form.bairro" placeholder="Bairro" />
                <input v-model="form.cidade" placeholder="Cidade" />
                <input v-model="form.ufEndereco" placeholder="UF Endereço" />
              </div>
            </fieldset>
  
            <button type="submit" class="btn btn-save">
              {{ editando ? '💾 Atualizar Cliente' : '💾 Salvar Cliente' }}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useAuthStore } from '../store/authStore'
  import clientService from '../services/clientService'
  import Header from '../components/Header.vue'
  import Menu from '../components/Menu.vue'
  import Footer from '../components/Footer.vue'
  
  const router = useRouter()
  const route = useRoute()
  const authStore = useAuthStore()
  const menuAberto = ref(false)
  const editando = ref(false)
  
  const form = ref({
    nome: '', cpf: '', rg: '', dataExpedicao: '', orgaoExpedicao: '', uf: '',
    dataNascimento: '', sexo: '', estadoCivil: '', cep: '', logradouro: '',
    numero: '', complemento: '', bairro: '', cidade: '', ufEndereco: ''
  })
  
  const carregarCliente = async (id) => {
    const response = await clientService.getById(id)
    const cliente = response.data
    form.value = {
      ...cliente,
      ...cliente.endereco,
      ufEndereco: cliente.endereco?.uf
    }
  }
  
  const salvarCliente = async () => {
    const payload = {
      cpf: form.value.cpf,
      nome: form.value.nome,
      rg: form.value.rg,
      dataExpedicao: form.value.dataExpedicao,
      orgaoExpedicao: form.value.orgaoExpedicao,
      uf: form.value.uf,
      dataNascimento: form.value.dataNascimento,
      sexo: form.value.sexo,
      estadoCivil: form.value.estadoCivil,
      endereco: {
        cep: form.value.cep,
        logradouro: form.value.logradouro,
        numero: form.value.numero,
        complemento: form.value.complemento,
        bairro: form.value.bairro,
        cidade: form.value.cidade,
        uf: form.value.ufEndereco
      }
    }
  
    if (editando.value) {
      payload.clienteId = route.params.id
      await clientService.update(payload)
    } else {
      await clientService.create(payload)
    }
  
    router.push('/clientes')
  }
  
  const logout = () => {
    authStore.logout()
    router.push('/')
  }
  
  onMounted(() => {
    if (route.params.id) {
      editando.value = true
      carregarCliente(route.params.id)
    }
  })
  </script>
  
  <style scoped>
  .page-title {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    color: #2e3a59;
  }
  
  .form-wrapper {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  
  fieldset {
    border: 1px solid #ddd;
    padding: 1.5rem;
    border-radius: 8px;
    background-color: #f8f9fc;
  }
  
  legend {
    font-size: 1.1rem;
    font-weight: bold;
    color: #5e72e4;
    padding: 0 0.5rem;
  }
  
  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-top: 1rem;
  }
  
  input {
    padding: 0.6rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 1rem;
    width: 100%;
  }
  
  .btn-save {
    background-color: #2dce89;
    font-weight: bold;
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    border-radius: 6px;
    align-self: flex-end;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  .btn-save:hover {
    background-color: #24b57b;
  }
  
  @media (max-width: 768px) {
    .form-grid {
      grid-template-columns: 1fr;
    }
  
    .layout.mobile-menu-open .sidebar {
      left: 0;
    }
  }
  </style>
  