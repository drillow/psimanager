import { EPaths } from '@/types'
import axios from 'axios'

const ACCESS_TOKEN_KEY = "x-access-token"
const accessToken = typeof window !== 'undefined' ? localStorage.getItem(ACCESS_TOKEN_KEY) : ''

const api = axios.create({
  baseURL: `http://localhost:8080`,
  headers: {
    [ACCESS_TOKEN_KEY]: accessToken ?? '',
    'Content-Type': 'application/json',
  },
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem(ACCESS_TOKEN_KEY)
      window.location.assign(EPaths.LOGIN)
    }
    return error.response
  },
)


export { api }