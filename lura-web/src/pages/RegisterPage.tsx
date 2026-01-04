import { Link } from 'react-router-dom'
import RegisterForm from '../components/Auth/RegisterForm'

function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="flex flex-col items-center gap-4 w-full max-w-sm mx-5">
        <h1 className="text-lura-blue font-semibold text-2xl">Sign Up</h1>

        <RegisterForm />

        <p className="mt-5 self-start">
          Already have an account?{' '}
          <Link to="/login" className="text-lura-blue underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
