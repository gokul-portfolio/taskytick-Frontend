import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  // ================= STATE =================
  const [users, setUsers] = useState([])
  const [tasks, setTasks] = useState([]) // 🔥 IMPORTANT FIX
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(false)

  // ================= AXIOS =================
  const API = axios.create({
    baseURL: 'http://localhost:5000/api'
  })

  // 🔥 Attach Token
  API.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  })

  // ================= AUTH =================

  const loginUser = async credentials => {
    try {
      const res = await API.post('/auth/login', credentials)
      const data = res.data?.data || res.data

      localStorage.setItem('token', data.token)
      setCurrentUser(data.user)

      return data
    } catch (err) {
      throw err.response?.data || err.message
    }
  }

  const logoutUser = () => {
    localStorage.removeItem('token')
    setCurrentUser(null)
  }

  const loadCurrentUser = async () => {
    try {
      const res = await API.get('/auth/me')
      const user = res.data?.data || res.data
      setCurrentUser(user)
    } catch {
      console.log('No logged user')
    }
  }

  // ================= USERS =================

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const res = await API.get('/users')
      const data = res.data?.data || res.data || []
      setUsers(data)
      return data
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const createUser = async data => {
    const res = await API.post('/users', data)
    await fetchUsers()
    return res.data
  }

  const getUserById = async id => {
    const res = await API.get(`/users/${id}`)
    return res.data?.data || res.data
  }

  const updateUser = async (id, data) => {
    const res = await API.put(`/users/${id}`, data)
    await fetchUsers()
    return res.data
  }

  const deleteUser = async id => {
    const res = await API.delete(`/users/${id}`)
    await fetchUsers()
    return res.data
  }

  // ================= TASKS =================

  const fetchTasks = async () => {
    setLoading(true)
    try {
      const res = await API.get('/tasks')
      const data = res.data?.data || res.data || []
      setTasks(data)
      return data
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const createTask = async taskData => {
    const res = await API.post('/tasks', taskData)
    await fetchTasks()
    return res.data
  }

  const getTaskById = async id => {
    const res = await API.get(`/tasks/${id}`)
    return res.data?.data
  }

  const updateTask = async (id, data) => {
    const res = await API.put(`/tasks/${id}`, data)
    await fetchTasks()
    return res.data
  }

  const deleteTask = async id => {
    const res = await API.delete(`/tasks/${id}`)
    await fetchTasks()
    return res.data
  }

  // ================= PROJECTS =================

  const [projects, setProjects] = useState([])

  const fetchProjects = async () => {
    setLoading(true)
    try {
      const res = await API.get('/projects')
      const data = res.data?.data || res.data || []
      setProjects(data)
      return data
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const createProject = async projectData => {
    const res = await API.post('/projects', projectData)
    await fetchProjects() // refresh list
    return res.data
  }

  const getProjectById = async id => {
    const res = await API.get(`/projects/${id}`)
    return res.data?.data
  }

  const updateProject = async (id, data) => {
    const res = await API.put(`/projects/${id}`, data)
    await fetchProjects()
    return res.data
  }

  const deleteProject = async id => {
    const res = await API.delete(`/projects/${id}`)
    await fetchProjects()
    return res.data
  }

  // ================= INIT =================

  useEffect(() => {
    fetchUsers()
    fetchTasks() // 🔥 IMPORTANT
    loadCurrentUser()
  }, [])

  // ================= EXPORT =================

  return (
    <UserContext.Provider
      value={{
        users,
        tasks,
        projects, // ✅ ADD
        currentUser,
        loading,

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

        fetchProjects, // ✅ ADD
        createProject,
        getProjectById,
        updateProject,
        deleteProject
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
