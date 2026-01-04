import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../lib/api'

function RegisterForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const navigate = useNavigate()

  async function register() {
    if (!name || !email || !password || !passwordConfirmation) return

    try {
      await api.post('/register', {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
        client_type: 'web',
      })

      setErrorMessage('')
      navigate('/')
    } catch (error: any) {
      setErrorMessage(error.message)
    }
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <input
        type="text"
        className="border border-gray-300 mb-3 p-2 py-3 rounded-md"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        className="border border-gray-300 mb-3 p-2 py-3 rounded-md"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="relative w-full">
        <input
          type={showPassword ? 'text' : 'password'}
          className="border border-gray-300 p-2 py-3 rounded-md w-full"
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
      <input
        type={showPassword ? 'text' : 'password'}
        className="border border-gray-300 mt-3 p-2 py-3 rounded-md"
        placeholder="Confirm Password"
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
      />

      {errorMessage && <div className="mt-2 text-red-600">{errorMessage}</div>}

      <button
        className="bg-lura-blue rounded-md cursor-pointer text-white mt-5 p-2 w-full"
        onClick={() => register()}
      >
        Sign Up
      </button>
    </div>
  )
}

export default RegisterForm
