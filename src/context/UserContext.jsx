import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import axios from 'axios'

const UserContext = createContext()

// ================= AXIOS =================
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000
})

// ================= INTERCEPTORS =================
API.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

API.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/#/login'
    }
    return Promise.reject(err)
  }
)

export const UserProvider = ({ children }) => {
  // ================= STATE =================
  const [users, setUsers] = useState([])
  const [tasks, setTasks] = useState([])
  const [projects, setProjects] = useState([])
  const [currentUser, setCurrentUser] = useState(null)

  const [loading, setLoading] = useState(true)
  const [dataLoading, setDataLoading] = useState(false)

  // ================= COMMON HANDLER =================
  const handleRequest = async (apiCall, setter = null) => {
    setDataLoading(true)
    try {
      const res = await apiCall()

      const data =
        res.data?.data ||
        res.data?.users ||
        res.data ||
        []

      if (setter) setter(data)

      return data
    } catch (err) {
      console.error(err.response?.data || err.message)
      throw err.response?.data || err.message
    } finally {
      setDataLoading(false)
    }
  }

  // ================= AUTH =================
  const loginUser = async credentials => {
    const data = await handleRequest(() =>
      API.post('/auth/login', credentials)
    )

    localStorage.setItem('token', data.token)
    await loadCurrentUser()
    return data
  }

  const logoutUser = () => {
    localStorage.removeItem('token')
    setCurrentUser(null)
  }

  const loadCurrentUser = async () => {
    const token = localStorage.getItem('token')

    if (!token) {
      setLoading(false)
      return null
    }

    setLoading(true)
    try {
      const data = await handleRequest(() => API.get('/auth/me'))
      setCurrentUser(data)
      return data
    } catch {
      setCurrentUser(null)
      localStorage.removeItem('token')
      return null
    } finally {
      setLoading(false)
    }
  }

  // ================= USERS =================
  const fetchUsers = () =>
    handleRequest(() => API.get('/users'), setUsers)

  const createUser = async data => {
    const res = await handleRequest(() => API.post('/users', data))
    await fetchUsers()
    return res
  }

  const getUserById = id =>
    handleRequest(() => API.get(`/users/${id}`))

  const updateUser = async (id, data) => {
    const res = await handleRequest(() =>
      API.put(`/users/${id}`, data)
    )
    await fetchUsers()
    return res
  }

  const deleteUser = async id => {
    const res = await handleRequest(() =>
      API.delete(`/users/${id}`)
    )
    await fetchUsers()
    return res
  }

  // ================= TASKS =================
  const fetchTasks = () =>
    handleRequest(() => API.get('/tasks'), setTasks)

  const createTask = async data => {
    const res = await handleRequest(() =>
      API.post('/tasks', data)
    )
    await fetchTasks()
    return res
  }

  const getTaskById = id =>
    handleRequest(() => API.get(`/tasks/${id}`))

  const updateTask = async (id, data) => {
    const res = await handleRequest(() =>
      API.put(`/tasks/${id}`, data)
    )
    await fetchTasks()
    return res
  }

  const deleteTask = async id => {
    const res = await handleRequest(() =>
      API.delete(`/tasks/${id}`)
    )
    await fetchTasks()
    return res
  }

  

  // ================= PROJECTS =================
  const fetchProjects = () =>
    handleRequest(() => API.get('/projects'), setProjects)

  const createProject = async data => {
    const res = await handleRequest(() =>
      API.post('/projects', data)
    )
    await fetchProjects()
    return res
  }

  const getProjectById = id =>
    handleRequest(() => API.get(`/projects/${id}`))

  const updateProject = async (id, data) => {
    const res = await handleRequest(() =>
      API.put(`/projects/${id}`, data)
    )
    await fetchProjects()
    return res
  }

  const deleteProject = async id => {
    const res = await handleRequest(() =>
      API.delete(`/projects/${id}`)
    )
    await fetchProjects()
    return res
  }

  // ================= INIT =================
  useEffect(() => {
    loadCurrentUser()
  }, [])


  // ================= PROFILE =================
const fetchProfile = () =>
  handleRequest(() => API.get('/users/me'))

  // ================= MEMO =================
  const value = useMemo(
    () => ({
      users,
      tasks,
      projects,
      currentUser,
      loading,
      dataLoading,

      loginUser,
      logoutUser,

      fetchUsers,
      createUser,
      getUserById,
      updateUser,
      deleteUser,

      fetchTasks,
      createTask,
      getTaskById,
      updateTask,
      deleteTask,

      fetchProjects,
      createProject,
      getProjectById,
      updateProject,
      deleteProject,


      fetchProfile,



    }),
    [users, tasks, projects, currentUser, loading, dataLoading]
  )

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

// ================= HOOK =================
export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within UserProvider')
  }
  return context
}