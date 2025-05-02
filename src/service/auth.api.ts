import axios from 'axios'

const apiWithoutHeader = axios.create({
  // baseURL: `http://localhost:8080`,
  baseURL: 'https://api-core.up.railway.app',
  headers: {
    'Content-Type': 'application/json',
  },
})

export { apiWithoutHeader }
