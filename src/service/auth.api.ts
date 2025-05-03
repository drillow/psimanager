import axios from 'axios'

const apiWithoutHeader = axios.create({
  // baseURL: `http://localhost:8080`,
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export { apiWithoutHeader }
