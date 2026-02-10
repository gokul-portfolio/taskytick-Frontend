import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

/* ================= LAYOUTS ================= */
import AdminLayout from "./components/layout/AdminLayout";
import UserLayout from "./components/layout/UserLayout";

/* ================= ADMIN PAGES ================= */
import CreateUserPage from "./pages/admin/CreateUserPage";
import CreateProjectPage from "./pages/admin/CreateProjectPage";
import EditProjectPage from "./pages/admin/EditProjectPage";
import EditUserPage from "./pages/admin/EditUserPage";
import UserNotifications from "./pages/user/UserNotifications";

/* Lazy loaded */
const LoginPage = lazy(() => import("./pages/LoginPage"));

const AdminDashboard = lazy(() => import("./pages/admin/DashboardPage"));
const TaskPage = lazy(() => import("./pages/admin/TaskPage"));
const CreateTaskPage = lazy(() => import("./pages/admin/CreateTaskPage"));
const EditTaskPage = lazy(() => import("./pages/admin/EditTaskPage"));
const AdminProfile = lazy(() => import("./pages/admin/ProfilePage"));
const ViewUserPage = lazy(() => import("./pages/admin/ViewUserPage"));
const ViewProjectPage = lazy(() => import("./pages/admin/ViewProjectPage"));

/* ================= USER PAGES ================= */
const UserDashboard = lazy(() => import("./pages/user/DashboardPage"));
const MyTasksPage = lazy(() => import("./pages/user/MyTasksPage"));
const UserProfile = lazy(() => import("./pages/user/ProfilePage"));

/* ================= COMMON ================= */
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

function App() {
  return (
    <Suspense fallback={<div className="loader">Loading...</div>}>
      <Routes>

        {/* ================= PUBLIC ================= */}
        <Route path="/login" element={<LoginPage />} />

        {/* ================= ADMIN ================= */}
        <Route path="/admin" element={<AdminLayout />}>

          {/* DASHBOARD */}
          <Route index element={<AdminDashboard />} />

          {/* PROFILE */}
          <Route path="profile" element={<AdminProfile />} />

          {/* USERS */}
          <Route path="users" element={<ViewUserPage />} />
          <Route path="users/create" element={<CreateUserPage />} />
          <Route path="users/edit/:id" element={<EditUserPage />} />

          {/* TASKS */}
          <Route path="tasks" element={<TaskPage />} />
          <Route path="tasks/create" element={<CreateTaskPage />} />
          <Route path="tasks/edit/:id" element={<EditTaskPage />} />

          {/* PROJECTS */}
          <Route path="projects" element={<ViewProjectPage />} />
          <Route path="projects/create" element={<CreateProjectPage />} />
          <Route path="projects/edit/:id" element={<EditProjectPage />} />

        </Route>

        {/* ================= USER ================= */}
        <Route path="/user" element={<UserLayout />}>

          <Route index element={<UserDashboard />} />
          <Route path="tasks" element={<MyTasksPage />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="/user/notifications" element={<UserNotifications />} />

        </Route>

        {/* ================= 404 ================= */}
        <Route path="*" element={<PageNotFound />} />

      </Routes>
    </Suspense>
  );
}

export default App;
