import { createContext, useContext, useEffect, useState } from 'react'
import { loginAPI } from '../api/auth.api' // 🔥 API import

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // ============================================
  // 🔥 On app load
  // ============================================
  useEffect(() => {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')

    if (token) {
      setUser({ token, role })
    }

    setLoading(false)
  }, [])

  // ============================================
  // 🔐 LOGIN (UPDATED 🔥)
  // ============================================
  const loginUser = async formData => {
    try {
      const data = await loginAPI(formData)

      // 🔥 Save to localStorage
      localStorage.setItem('token', data.token)
      localStorage.setItem('role', data.user.role)

      // 🔥 Update state
      setUser({
        token: data.token,
        role: data.user.role
      })

      return data // 🔥 important
    } catch (err) {
      throw err
    }
  }

  // ============================================
  // 🚪 LOGOUT
  // ============================================
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')

    setUser(null)
  }

  const isAuthenticated = !!user

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loginUser, // 🔥 updated function
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Hook
export const useAuth = () => useContext(AuthContext)
