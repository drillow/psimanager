import axios from "axios";

const apiWithoutHeader = axios.create({
  baseURL: `http://localhost:8080`,
  headers: {
    'Content-Type': 'application/json',
  },
})

export { apiWithoutHeader }