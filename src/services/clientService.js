import axios from 'axios'

const api = axios.create({
  baseURL: 'https://extranet.fcc.org.br/webapi/testecandidato/v1'
})

export default {
  getAll() {
    return api.get('/Cliente/Listar')
  },
  getById(id) {
    return api.get(`/Cliente/ListarPorId/${id}`)
  },
  create(cliente) {
    return api.post('/Cliente/Adicionar', cliente)
  },
  update(cliente) {
    return api.put('/Cliente/Alterar', cliente)
  },
  remove(id) {
    return api.delete(`/Cliente/Excluir/${id}`)
  }
}
