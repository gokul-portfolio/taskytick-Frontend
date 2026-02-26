TaskyTick – Task Management System
📌 Project Overview

TaskyTick is a simple and efficient Task Management System designed to manage tasks between Admin and Users.
The system allows Admins to create and assign tasks, and Users to view and update their assigned tasks.

This project is built for practice and learning full-stack development concepts.

🛠 Tech Stack

Frontend: React.js
Backend: node js
Database: Mongo DB

👥 User Roles

TaskyTick has two main roles:
🔹 Admin
🔹 User
Each role has different access permissions.
🔐 Authentication
Login System
Role-based access control (Admin / User)
Seure session handling

👤 User Features
Users can:
View tasks assigned by Admin
Add notes to tasks
Update task status (Pending / In Progress / Completed)
View task details
Users cannot:
Create other users
Assign tasks to others
Access admin panel

👨‍💼 Admin Features
Admin has full control over the system.
Admin can:
👥 User Management
Create new users
View users
Edit user details
Delete users

📁 Project Management

Create projects
Edit projects
View project details

✅ Task Management
Create tasks
Assign tasks to users
Edit tasks
Delete tasks
View task status
Track progress of all users
----------------------------------------------------------------------------
frontend/
│
├── public/
│
├── src/
│   │
│   ├── assets/                # Static files
│   │   ├── images/
│   │   ├── icons/
│   │   └── styles/
│   │
│   ├── components/            # Reusable UI components
│   │   ├── common/            # Button, Modal, Loader, Badge etc.
│   │   ├── form/              # InputField, Select, TextArea
│   │   ├── layout/            # Navbar, Sidebar, Footer
│   │   ├── task/              # TaskCard, TaskList
│   │   └── project/           # ProjectCard, ProjectList
│   │
│   ├── pages/                 # Page level components
│   │   ├── admin/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Users.jsx
│   │   │   ├── Projects.jsx
│   │   │   └── Tasks.jsx
│   │   │
│   │   ├── user/
│   │   │   ├── Dashboard.jsx
│   │   │   └── MyTasks.jsx
│   │   │
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   └── PageNotFound.jsx
│   │
│   ├── context/               # Global state
│   │   ├── AuthContext.jsx
│   │   └── UserContext.jsx
│   │
│   ├── hooks/                 # Custom hooks
│   │   ├── useAuth.js
│   │   ├── useFetch.js
│   │   └── useDebounce.js
│   │
│   ├── services/              # API calls
│   │   ├── authService.js
│   │   ├── taskService.js
│   │   ├── userService.js
│   │   └── projectService.js
│   │
│   ├── routes/                # Route config
│   │   ├── AdminRoutes.jsx
│   │   ├── UserRoutes.jsx
│   │   └── ProtectedRoute.jsx
│   │
│   ├── utils/                 # Helper functions
│   │   ├── formatDate.js
│   │   ├── constants.js
│   │   └── validators.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .env
├── .gitignore
└── package.json
----------------------------------------------------------------------------
