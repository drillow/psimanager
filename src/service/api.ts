import { EPaths } from '@/types'
import { ACCESS_TOKEN_KEY } from '@/utils/constants'
import axios from 'axios'
import Cookies from 'universal-cookie'

const cookies = new Cookies()
const accessTokenCookie = cookies.get(ACCESS_TOKEN_KEY)

const api = axios.create({
  // baseURL: `http://localhost:8080`,
  baseURL: 'https://api-core.up.railway.app',
  headers: {
    'Content-Type': 'application/json',
    [ACCESS_TOKEN_KEY]: accessTokenCookie,
  },
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status !== 401) throw error
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    window.location.assign(EPaths.LOGIN)
  },
)

export { api }
