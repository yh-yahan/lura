import { Link } from 'react-router-dom'
import LoginForm from '../components/Auth/LoginForm'

function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="flex flex-col items-center gap-4 w-full max-w-sm mx-5">
        <h1 className="text-lura-blue font-semibold text-2xl">Login</h1>

        <LoginForm />

        <p className="mt-5 self-start">
          Don't have an account yet?{' '}
          <Link to="/signup" className="text-lura-blue underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
