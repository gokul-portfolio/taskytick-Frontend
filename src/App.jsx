import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

import MainLayout from "./components/layout/MainLayout";

// Lazy pages
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const TaskPage = lazy(() => import("./pages/TaskPage"));
const CreateTaskPage = lazy(() => import("./pages/CreateTaskPage"));
const EditTaskPage = lazy(() => import("./pages/EditTaskPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

function App() {
  return (
    <Suspense fallback={<div className="loader">Loading...</div>}>
      <Routes>

        {/* PUBLIC PAGES (no layout if you want) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* MAIN LAYOUT PAGES */}
        <Route element={<MainLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="/tasks" element={<TaskPage />} />
          <Route path="task/create" element={<CreateTaskPage />} />
          <Route path="task/edit/:id" element={<EditTaskPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<PageNotFound />} />

      </Routes>
    </Suspense>
  );
}

export default App;
