# 🚀 TaskFlow - MERN Task Management Application

A full-stack Task Management Application built with the **MERN Stack** that allows users to securely manage their daily tasks with authentication, task prioritization, filtering, and real-time state management.

## ✨ Features

### 🔐 Authentication

* User Registration & Login
* JWT-Based Authentication
* Protected Routes
* Password Hashing using bcryptjs
* Secure Middleware Authorization

### 📋 Task Management

* Create Tasks
* View Tasks
* Update Tasks
* Delete Tasks
* Toggle Task Status
* Set Task Priority (Low, Medium, High)
* Due Date Management

### 🔍 Search & Filtering

* Search Tasks by Title or Description
* Filter by Status
* Sort by:

  * Recent
  * Oldest
  * Priority
  * Due Date

### 📊 Dashboard Analytics

* Total Tasks
* Completed Tasks
* Pending Tasks
* High Priority Tasks

### 🎨 User Experience

* Responsive Design
* Clean UI
* Loading States
* Error Handling
* Form Validation
* Mobile Friendly

---

# 🛠️ Tech Stack

## Frontend

* React.js
* Vite
* React Router DOM
* Zustand
* Axios
* Tailwind CSS

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs
* dotenv
* cookie-parser
* cors

---

# 📂 Project Structure

```bash
taskflow/
│
├── backend/
│   ├── src/
│   │   ├── DB/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   │
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   ├── store/
    │   ├── App.jsx
    │   └── main.jsx
    │
    └── vite.config.js
```

---

# 🗄️ Database Schema

## User

```javascript
{
  name: String,
  email: String,
  password: String
}
```

## Task

```javascript
{
  title: String,
  description: String,
  status: String,
  priority: String,
  dueDate: Date,
  userId: ObjectId
}
```

---

# 🔑 API Endpoints

## Authentication

| Method | Endpoint           | Description   |
| ------ | ------------------ | ------------- |
| POST   | /api/auth/register | Register User |
| POST   | /api/auth/login    | Login User    |
| GET    | /api/auth/me       | Current User  |

## Tasks

| Method | Endpoint              | Description        |
| ------ | --------------------- | ------------------ |
| GET    | /api/tasks            | Get All Tasks      |
| GET    | /api/tasks/:id        | Get Single Task    |
| POST   | /api/tasks            | Create Task        |
| PUT    | /api/tasks/:id        | Update Task        |
| DELETE | /api/tasks/:id        | Delete Task        |
| PATCH  | /api/tasks/:id/toggle | Toggle Task Status |

---

# ⚙️ Environment Variables

Create a `.env` file inside the backend directory:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

ACCESS_TOKEN_SECRET=your_secret_key

ACCESS_TOKEN_EXPIRY=1d

NODE_ENV=development
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/your-username/taskflow.git
cd taskflow
```

## Backend Setup

```bash
cd backend

npm install

npm run dev
```

Backend Server:

```bash
http://localhost:5000
```

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend Application:

```bash
http://localhost:5173
```

---

# 🔒 Security Features

* JWT Authentication
* Password Hashing with bcryptjs
* Protected API Routes
* Custom Error Handling
* Input Validation
* Secure Middleware

---

# 📈 Future Enhancements

* Dark Mode
* Task Categories
* Email Notifications
* File Attachments
* Team Collaboration
* Activity Logs
* Kanban Board
* Analytics Dashboard

---

# 👨‍💻 Author

**Digvijay Tripathy**

B.Tech CSE | NIT Rourkela

GitHub: https://github.com/your-username

LinkedIn: https://linkedin.com/in/your-profile

---

# ⭐ Project Highlights

✅ MERN Stack Application

✅ JWT Authentication

✅ Zustand State Management

✅ Protected Routes

✅ Custom ApiError & ApiResponse

✅ Async Error Handling

✅ Responsive UI

✅ CRUD Operations

✅ Scalable Folder Structure

---

If you found this project useful, consider giving it a ⭐ on GitHub.
