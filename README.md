# user-authentication
This project is based on user authentication using Node JS with Express JS
# Project Management Backend (Express.js + MongoDB)

This is the backend for a basic Project Management tool built with Node.js, Express.js, MongoDB, and JWT-based authentication.

## Features

### ✅ User Authentication

* Register and login with email & password
* Passwords hashed using bcrypt
* JWT-based authentication

### ✅ Project Management

* Users can create, view, update, and delete their own projects
* Project fields: `title`, `description`, `status` ("active", "completed")

### ✅ Task Management

* Tasks are associated with projects
* Task fields: `title`, `description`, `status` ("todo", "in-progress", "done"), `dueDate`
* CRUD operations
* Filter tasks by status

### ✅ Seed Script

* Creates one test user: `test@example.com` / `Test@123`
* Adds 2 projects with 3 tasks each

---

## Getting Started

### Prerequisites

* Node.js
* MongoDB

### Setup

1. Clone this repository
2. Navigate to the `backend/` directory
3. Create a `.env` file based on the sample below:

```env
MONGO_URL =mongodb://localhost:27017/userdb
JWT_SECRET="sandhya@123"
```

4. Install dependencies:

```bash
npm install
```

### Run the server

```bash
npm start
```

The server will run at: `http://localhost:3000`

---

## Running the Seeder

Populate the database with demo user, projects, and tasks:

```bash
npm run seed
```

---

## API Endpoints

### Auth

```
POST /api/auth/register
POST /api/auth/login
```

### Projects (JWT required)

```
GET    /api/projects
POST   /api/projects
PUT    /api/projects/:id
DELETE /api/projects/:id
```

### Tasks (JWT required)

```
GET    /api/tasks/:projectId?status=todo|in-progress|done
POST   /api/tasks/:projectId
PUT    /api/tasks/:id
DELETE /api/tasks/:id
```

---

## Tech Stack

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT
* bcrypt

---
