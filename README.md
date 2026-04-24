# 🗂 TaskyTick – Task Management System

---
# router use panniruken so url munnadi # erukanum 

Tro dashboard 
   1.Admin dashboard
   2.User Dashboard





## 📌 Project Overview

TaskyTick is a simple and efficient Task Management System designed to manage tasks between Admin and Users.

The system allows:
- Admins to create and assign tasks
- Users to view and update their assigned tasks

This project is built for practice and learning full-stack development concepts.

---

## 🛠 Tech Stack

- **Frontend:** React.js  
- **Backend:** Node.js  
- **Database:** MongoDB  

---

## 👥 User Roles

TaskyTick has two main roles:

- 🔹 Admin  
- 🔹 User  

Each role has different access permissions.

---

## 🔐 Authentication

- Login system
- Role-based access control (Admin / User)
- Secure session handling

---

## 👤 User Features

Users can:

- View tasks assigned by Admin  
- Add notes to tasks  
- Update task status (Pending / In Progress / Completed)  
- View task details  

Users cannot:

- Create other users  
- Assign tasks to others  
- Access admin panel  

---

## 👨‍💼 Admin Features

Admin has full control over the system.

### 👥 User Management
- Create new users  
- View users  
- Edit user details  
- Delete users  

### 📁 Project Management
- Create projects  
- Edit projects  
- View project details  

### ✅ Task Management
- Create tasks  
- Assign tasks to users  
- Edit tasks  
- Delete tasks  
- View task status  
- Track progress of all users  

---

## 📂 Frontend Folder Structure
frontend/
│
├── public/
│
├── src/
│ ├── assets/
│ │ ├── images/
│ │ ├── icons/
│ │ └── styles/
│ │
│ ├── components/
│ │ ├── common/
│ │ ├── form/
│ │ ├── layout/
│ │ ├── task/
│ │ └── project/
│ │
│ ├── pages/
│ │ ├── admin/
│ │ ├── user/
│ │ ├── LoginPage.jsx
│ │ ├── RegisterPage.jsx
│ │ └── PageNotFound.jsx
│ │
│ ├── context/
│ ├── hooks/
│ ├── services/
│ ├── routes/
│ ├── utils/
│ │
│ ├── App.jsx
│ ├── main.jsx
│ └── index.css
│
├── .env
├── .gitignore
└── package.json


---

## 🎯 Purpose of the Project

- Practice role-based access control  
- Understand task assignment logic  
- Learn CRUD operations  
- Improve frontend + backend integration  

---

## 🚀 Future Improvements

- Email notifications  
- Task priority system  
- File attachments  
- Dashboard analytics  
- Search & filtering  
- Pagination  

---

## 📦 Version

TaskyTick v1.0 (Practice Version)

---

Made with ❤️ for learning and development.