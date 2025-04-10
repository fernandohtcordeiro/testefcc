
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
              <div>
                <label>Nome <small>(mín. 3 letras)</small></label>
                <input v-model="form.nome" :class="{ error: errors.nome }" placeholder="Ex: João da Silva" />
                <span class="erro" v-if="errors.nome">{{ errors.nome }}</span>
              </div>
              <div>
                <label>CPF <small>(somente números)</small></label>
                <input v-model="form.cpf" :class="{ error: errors.cpf }" placeholder="Ex: 12345678901" />
                <span class="erro" v-if="errors.cpf">{{ errors.cpf }}</span>
              </div>
              <div>
                <label>Data Nascimento <small>(DD/MM/AAAA)</small></label>
                <input v-model="form.dataNascimento" :class="{ error: errors.dataNascimento }" placeholder="Ex: 15/01/1990" />
                <span class="erro" v-if="errors.dataNascimento">{{ errors.dataNascimento }}</span>
              </div>
              <div>
                <label>Data Expedição <small>(DD/MM/AAAA)</small></label>
                <input v-model="form.dataExpedicao" :class="{ error: errors.dataExpedicao }" placeholder="Ex: 20/05/2015" />
                <span class="erro" v-if="errors.dataExpedicao">{{ errors.dataExpedicao }}</span>
              </div>
              <div>
                <label>UF <small>(2 letras)</small></label>
                <input v-model="form.uf" :class="{ error: errors.uf }" placeholder="Ex: SP" />
                <span class="erro" v-if="errors.uf">{{ errors.uf }}</span>
              </div>
              <div>
                <label>Sexo</label>
                <input v-model="form.sexo" :class="{ error: errors.sexo }" placeholder="Ex: Masculino" />
                <span class="erro" v-if="errors.sexo">{{ errors.sexo }}</span>
              </div>
              <div>
                <label>Estado Civil</label>
                <input v-model="form.estadoCivil" :class="{ error: errors.estadoCivil }" placeholder="Ex: Solteiro" />
                <span class="erro" v-if="errors.estadoCivil">{{ errors.estadoCivil }}</span>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>🏠 Endereço</legend>
            <div class="form-grid">
              <div>
                <label>CEP <small>(8 dígitos)</small></label>
                <input v-model="form.cep" :class="{ error: errors.cep }" placeholder="Ex: 01001000" />
                <span class="erro" v-if="errors.cep">{{ errors.cep }}</span>
              </div>
              <div>
                <label>Número</label>
                <input v-model="form.numero" :class="{ error: errors.numero }" placeholder="Ex: 123" />
                <span class="erro" v-if="errors.numero">{{ errors.numero }}</span>
              </div>
              <div>
                <label>Logradouro</label>
                <input v-model="form.logradouro" :class="{ error: errors.logradouro }" placeholder="Ex: Rua das Flores" />
                <span class="erro" v-if="errors.logradouro">{{ errors.logradouro }}</span>
              </div>
              <div>
                <label>Bairro</label>
                <input v-model="form.bairro" :class="{ error: errors.bairro }" placeholder="Ex: Centro" />
                <span class="erro" v-if="errors.bairro">{{ errors.bairro }}</span>
              </div>
              <div>
                <label>Cidade</label>
                <input v-model="form.cidade" :class="{ error: errors.cidade }" placeholder="Ex: São Paulo" />
                <span class="erro" v-if="errors.cidade">{{ errors.cidade }}</span>
              </div>
              <div>
                <label>UF Endereço <small>(2 letras)</small></label>
                <input v-model="form.ufEndereco" :class="{ error: errors.ufEndereco }" placeholder="Ex: SP" />
                <span class="erro" v-if="errors.ufEndereco">{{ errors.ufEndereco }}</span>
              </div>
              <div>
                <label>Complemento</label>
                <input v-model="form.complemento" placeholder="Ex: Apto 12" />
              </div>
            </div>

          </fieldset>

            <div class="alert-error" v-if="Object.keys(errors).length">
              ❌ Corrija os campos destacados antes de continuar.
            </div>
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

const errors = ref({})

function formatarParaBR(dataISO) {
  if (!dataISO) return ''
  const [ano, mes, dia] = dataISO.split('T')[0].split('-')
  return `${dia}/${mes}/${ano}`
}

function formatarParaISO(dataBR) {
  if (!dataBR) return ''
  const [dia, mes, ano] = dataBR.split('/')
  return `${ano}-${mes}-${dia}`
}

const validarCampos = () => {
  const e = {}

  if (!form.value.nome || form.value.nome.length < 3) e.nome = 'Nome deve ter pelo menos 3 letras.'
  if (!form.value.cpf || form.value.cpf.length !== 11) e.cpf = 'CPF deve conter 11 dígitos.'
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(form.value.dataNascimento)) e.dataNascimento = 'Use DD/MM/AAAA.'
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(form.value.dataExpedicao)) e.dataExpedicao = 'Use DD/MM/AAAA.'

  if (!form.value.uf || form.value.uf.length !== 2) e.uf = 'UF deve conter 2 letras.'
  if (!form.value.sexo) e.sexo = 'Sexo é obrigatório.'
  if (!form.value.estadoCivil) e.estadoCivil = 'Estado civil é obrigatório.'

  if (!form.value.cep || form.value.cep.length !== 8) e.cep = 'CEP deve conter 8 dígitos.'
  if (!form.value.numero) e.numero = 'Número é obrigatório.'
  if (!form.value.logradouro) e.logradouro = 'Logradouro é obrigatório.'
  if (!form.value.bairro) e.bairro = 'Bairro é obrigatório.'
  if (!form.value.cidade) e.cidade = 'Cidade é obrigatória.'
  if (!form.value.ufEndereco || form.value.ufEndereco.length !== 2) e.ufEndereco = 'UF do endereço deve conter 2 letras.'

  errors.value = e
  return Object.keys(e).length === 0
}

const carregarCliente = async (id) => {
  const response = await clientService.getById(id)
  const cliente = response.data
  form.value = {
    ...cliente,
    ...cliente.endereco,
    dataExpedicao: formatarParaBR(cliente.dataExpedicao),
    dataNascimento: formatarParaBR(cliente.dataNascimento),
    ufEndereco: cliente.endereco?.uf
  }
}

const salvarCliente = async () => {
  if (!validarCampos()) return

  const payload = {
    cpf: String(form.value.cpf),
    nome: String(form.value.nome),
    rg: String(form.value.rg),
    dataExpedicao: formatarParaISO(form.value.dataExpedicao),
    orgaoExpedicao: String(form.value.orgaoExpedicao),
    uf: String(form.value.uf),
    dataNascimento: formatarParaISO(form.value.dataNascimento),
    sexo: String(form.value.sexo),
    estadoCivil: String(form.value.estadoCivil),
    endereco: {
      cep: String(form.value.cep),
      logradouro: String(form.value.logradouro),
      numero: String(form.value.numero),
      complemento: String(form.value.complemento),
      bairro: String(form.value.bairro),
      cidade: String(form.value.cidade),
      uf: String(form.value.ufEndereco)
    }
  }

  try {
    if (editando.value) {
      payload.clienteId = route.params.id
      await clientService.update(payload)
    } else {
      await clientService.create(payload)
    }

    router.push('/clientes')
  } catch (err) {
    console.error('Erro ao salvar cliente:', err)
    alert('Erro ao salvar cliente. Verifique os dados e tente novamente.')
  }
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
input.error {
  border-color: #e74c3c;
}
.erro {
  color: #e74c3c;
  font-size: 0.85rem;
  margin-top: 0.25rem;
  display: block;
}
.alert-error {
  background-color: #ffe5e5;
  color: #c0392b;
  border: 1px solid #e74c3c;
  padding: 1rem;
  margin-bottom: 1.5rem;
  border-radius: 6px;
  font-weight: bold;
}


small {
  font-weight: normal;
  font-size: 0.8rem;
  color: #888;
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
