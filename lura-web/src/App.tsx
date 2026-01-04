import { Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from './lib/api'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import UserRoutes from './routes/UserRoutes'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await api.post('/me', { withCredentials: true })
        setIsLoggedIn(true)
        if (!response.data?.user && location.pathname !== '/') {
          navigate('/')
        }
      } catch (error: any) {
        setIsLoggedIn(false)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  if (loading) return <p className="flex justify-center items-center min-h-screen text-lura-blue">Loading...</p>

  return (
    <>
      <Routes>
        {isLoggedIn ? (
          <Route path="/*" element={<UserRoutes />} />
        ) : (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<RegisterPage />} />
          </>
        )}
      </Routes>
    </>
  )
}

export default App
