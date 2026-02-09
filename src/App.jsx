import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import React, { useState } from "react";
import Calendar from "react-calendar";
// Layouts
import AdminLayout from "./components/layout/AdminLayout";
import UserLayout from "./components/layout/UserLayout";
import CreateUserPage from "./pages/admin/CreateUserPage";
import CreateProjectPage from "./pages/admin/CreateProjectPage";
import ProjectPage from "./pages/admin/projectpage";

// Public pages
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));

// Admin pages
const AdminDashboard = lazy(() => import("./pages/admin/DashboardPage"));
const TaskPage = lazy(() => import("./pages/admin/TaskPage"));
const CreateTaskPage = lazy(() => import("./pages/admin/CreateTaskPage"));
const EditTaskPage = lazy(() => import("./pages/admin/EditTaskPage"));
const AdminProfile = lazy(() => import("./pages/admin/ProfilePage"));
const ViewUserPage = lazy(() => import("./pages/admin/ViewUserPage"));

// User pages
const UserDashboard = lazy(() => import("./pages/user/DashboardPage"));
const MyTasksPage = lazy(() => import("./pages/user/MyTasksPage"));
const UserProfile = lazy(() => import("./pages/user/ProfilePage"));

// Common
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

function App() {
  return (
    <Suspense fallback={<div className="loader">Loading...</div>}>
      <Routes>

        {/* ================= PUBLIC ================= */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* ================= ADMIN ================= */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="tasks" element={<TaskPage />} />
          <Route path="task/create" element={<CreateTaskPage />} />
          <Route path="task/edit/:id" element={<EditTaskPage />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="createuser" element={<CreateUserPage />} />
          <Route path="createproject" element={<CreateProjectPage />} />
          <Route path="project" element={<ProjectPage />} />
          <Route path="viewuser" element={<ViewUserPage />} />
        </Route>

        {/* ================= USER ================= */}
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<UserDashboard />} />
          <Route path="tasks" element={<MyTasksPage />} />
          <Route path="profile" element={<UserProfile />} />
        </Route>

        {/* ================= 404 ================= */}
        <Route path="*" element={<PageNotFound />} />

      </Routes>
    </Suspense>
  );
}

export default App;
