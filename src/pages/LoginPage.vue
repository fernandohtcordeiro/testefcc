<template>
    <div class="login-layout">
      <div class="login-box">
        <h1 class="login-title">🔐 Acesso ao Sistema</h1>
  
        <form @submit.prevent="fazerLogin" class="login-form">
          <input
            v-model="usuario"
            type="text"
            placeholder="Usuário"
            required
          />
          <input
            v-model="senha"
            type="password"
            placeholder="Senha"
            required
          />
          <button class="btn btn-login" type="submit">Entrar</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '../store/authStore'
  
  const usuario = ref('')
  const senha = ref('')
  const router = useRouter()
  const authStore = useAuthStore()
  
  const fazerLogin = async () => {
    const sucesso = await authStore.login(usuario.value, senha.value)
    if (sucesso) {
      router.push('/clientes')
    } else {
      alert('Usuário ou senha inválidos!')
    }
  }
  </script>
  
  <style scoped>
  .login-layout {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: #f7f8fc;
  }
  
  .login-box {
    background: #ffffff;
    padding: 2rem 2.5rem;
    border-radius: 12px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
    width: 100%;
    max-width: 400px;
    text-align: center;
  }
  
  .login-title {
    font-size: 1.5rem;
    color: #2e3a59;
    margin-bottom: 1.5rem;
  }
  
  .login-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  input {
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 1rem;
  }
  
  .btn-login {
    background-color: #5e72e4;
    color: #fff;
    font-weight: bold;
    font-size: 1rem;
    padding: 0.8rem;
    border-radius: 6px;
    cursor: pointer;
    border: none;
  }
  
  .btn-login:hover {
    background-color: #324cdd;
  }
  </style>
  