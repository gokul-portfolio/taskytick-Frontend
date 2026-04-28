import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'

/* ================= LAYOUTS ================= */
import AdminLayout from './components/layout/AdminLayout'
import UserLayout from './components/layout/UserLayout'

/* ================= ROUTE GUARDS ================= */
import ProtectedRoute from './routes/ProtectedRoute'

/* ================= ADMIN PAGES ================= */
import CreateUserPage from './pages/admin/CreateUserPage'
import CreateProjectPage from './pages/admin/CreateProjectPage'
import EditProjectPage from './pages/admin/EditProjectPage'
import EditUserPage from './pages/admin/EditUserPage'

/* Lazy ADMIN */
const LoginPage = lazy(() => import('./pages/LoginPage'))
const AdminDashboard = lazy(() => import('./pages/admin/DashboardPage'))
const ViewTaskPage = lazy(() => import('./pages/admin/ViewTaskPage'))
const CreateTaskPage = lazy(() => import('./pages/admin/CreateTaskPage'))
const EditTaskPage = lazy(() => import('./pages/admin/EditTaskPage'))
const TaskBoardPage = lazy(() => import('./pages/admin/TaskBoardPage'))
const AdminProfile = lazy(() => import('./pages/admin/ProfilePage'))
const ViewUserPage = lazy(() => import('./pages/admin/ViewUserPage'))
const ViewProjectPage = lazy(() => import('./pages/admin/ViewProjectPage'))
const ViewProject = lazy(() => import('./pages/admin/ViewProjectPage'))
const ReportPage = lazy(() => import('./pages/admin/ReportPage'))

/* ================= USER ================= */
import UserNotifications from './pages/user/UserNotifications'

const UserDashboard = lazy(() => import('./pages/user/DashboardPage'))
const MyTasksPage = lazy(() => import('./pages/user/MyTasksPage'))
const UserProfile = lazy(() => import('./pages/user/ProfilePage'))
const TaskBoardUserPage = lazy(() => import('./pages/user/TaskBoardPage'))
const UserProjectPage = lazy(() => import('./pages/user/UserProjectPage'))

/* ================= COMMON ================= */
const PageNotFound = lazy(() => import('./pages/PageNotFound'))

function App () {
  return (
    <Suspense fallback={<div className='loader'>Loading...</div>}>
      <Routes>
        {/* PUBLIC */}
        <Route path='/login' element={<LoginPage />} />

        {/* ADMIN */}
        <Route
          path='/admin'
          element={
            <ProtectedRoute role='admin'>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />

          {/* PROFILE */}
          <Route path='profile' element={<AdminProfile />} />

          {/* USERS */}
          <Route path='users' element={<ViewUserPage />} />
          <Route path='users/create' element={<CreateUserPage />} />
          <Route path='users/edit/:id' element={<EditUserPage />} />

          {/* TASKS */}
          <Route path='tasks' element={<ViewTaskPage />} />
          <Route path='tasks/create' element={<CreateTaskPage />} />
          <Route path='tasks/edit/:id' element={<EditTaskPage />} />
          <Route path='tasks/board' element={<TaskBoardPage />} />

          {/* PROJECTS */}
          <Route path='projects' element={<ViewProjectPage />} />
          <Route path='projects/create' element={<CreateProjectPage />} />
          <Route path='projects/edit/:id' element={<EditProjectPage />} />
          <Route path='projects/view/:id' element={<ViewProject />} />

          <Route path='reports' element={<ReportPage />} />
        </Route>

        {/* USER */}
        <Route
          path='/user'
          element={
            <ProtectedRoute role='user'>
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<UserDashboard />} />
          <Route path='tasks' element={<MyTasksPage />} />
          <Route path='board' element={<TaskBoardUserPage />} />
          <Route path='profile' element={<UserProfile />} />
          <Route path='notifications' element={<UserNotifications />} />
          <Route path='projects' element={<UserProjectPage />} />
        </Route>

        {/* 404 */}
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </Suspense>
  )
}

export default App
