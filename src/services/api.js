import axios from 'axios'

const api = axios.create({
  baseURL: 'https://extranet.fcc.org.br/webapi/testecandidato/v1/'
})

export default api
