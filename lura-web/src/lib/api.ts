import axios from 'axios'

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
})

api.interceptors.response.use(
  res => res,
  error => {
    const status = error.response?.status
    const message =
      error.response?.data?.message ?? 'Something went wrong'

    return Promise.reject({
      status,
      message,
    })
  }
)

export default api
