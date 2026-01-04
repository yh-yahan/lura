import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../lib/api'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const navigate = useNavigate()

  async function login() {
    if (!email || !password) return

    try {
      await api.post('/login', { email, password, client_type: 'web' })

      setErrorMessage('')
      navigate('/')
    } catch (error: any) {
      setErrorMessage(error.message)
    }
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <input
        type="email"
        className="border border-gray-300 mb-3 p-3 rounded-md"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="relative w-full">
        <input
          type={showPassword ? 'text' : 'password'}
          className="border border-gray-300 p-3 rounded-md w-full"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <i
          className={`fa-regular ${
            showPassword ? 'fa-eye' : 'fa-eye-slash'
          } absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500`}
          onClick={() => setShowPassword(!showPassword)}
        ></i>
      </div>
      {errorMessage && <div className="mt-2 text-red-600">{errorMessage}</div>}
      <button
        className="bg-lura-blue rounded-md text-white p-3 w-full cursor-pointer mt-5"
        onClick={() => login()}
      >
        Login
      </button>
    </div>
  )
}

export default LoginForm
