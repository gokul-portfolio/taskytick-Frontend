






import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  // ================= STATE =================
  const [users, setUsers] = useState([])
  const [tasks, setTasks] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [dataLoading, setDataLoading] = useState(false)

  // ================= AXIOS =================
  const API = axios.create({
    baseURL: 'http://localhost:5000/api'
  })

  //  Attach Token
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

      await loadCurrentUser()

      return data
    } catch (err) {
      throw err.response?.data || err.message
    }
  }
  const logoutUser = () => {
    localStorage.removeItem('token')
    setCurrentUser(null)
    setLoading(false)
  }

  const loadCurrentUser = async () => {
    const token = localStorage.getItem('token')

    if (!token) {
      setCurrentUser(null)
      setLoading(false)
      return null
    }

    setLoading(true)
    try {
      const res = await API.get('/auth/me')
      const user = res.data?.data || res.data

      setCurrentUser(user)
      return user
    } catch (err) {
      console.log('No logged user')
      setCurrentUser(null)
      localStorage.removeItem('token')
      return null
    } finally {
      setLoading(false)
    }
  }

  // ================= USERS =================

  const fetchUsers = async () => {
    const token = localStorage.getItem('token')

    //  stop API call if no token
    if (!token) {
      console.log('No token - skipping fetchUsers')
      return
    }

    setDataLoading(true)

    try {
      const res = await API.get('/users')

      const data = res.data?.data || res.data || []

      setUsers(data)

      return data
    } catch (err) {
      console.error('Fetch Users Error:', err)

      //  auto handle unauthorized
      if (err.response?.status === 401) {
        localStorage.removeItem('token')
        window.location.href = '/#/login'
      }
    } finally {
      setDataLoading(false)
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
    const token = localStorage.getItem('token')

    //  STOP if no token
    if (!token) {
      console.log('No token - skipping fetchTasks')
      return
    }

    setDataLoading(true)

    try {
      const res = await API.get('/tasks')

      const data = res.data?.data || res.data || []

      setTasks(data)

      return data
    } catch (err) {
      console.error('Fetch Tasks Error:', err)

      // handle 401
      if (err.response?.status === 401) {
        localStorage.removeItem('token')
        window.location.href = '/#/login'
      }
    } finally {
      setDataLoading(false)
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
    const token = localStorage.getItem('token')

    if (!token) {
      console.log('No token - skipping fetchProjects')
      return
    }

    setDataLoading(true)
    try {
      const res = await API.get('/projects')
      const data = res.data?.data || res.data || []
      setProjects(data)
      return data
    } catch (err) {
      console.error('Fetch Projects Error:', err)

      if (err.response?.status === 401) {
        localStorage.removeItem('token')
        window.location.href = '/#/login'
      }
    } finally {
      setDataLoading(false)
    }
  }

  const createProject = async projectData => {
    const res = await API.post('/projects', projectData)
    await fetchProjects()
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
    const token = localStorage.getItem('token')

    if (!token) {
      setLoading(false) //  MUST ADD
      return
    }

    loadCurrentUser()
  }, [])
  // ================= EXPORT =================

  return (
    <UserContext.Provider
      value={{
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
        deleteProject
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
