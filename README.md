# Task Manager - SEPM

A full-stack task management application built with React, Node.js, Express, and MongoDB. The app supports admin and employee roles, task assignment, task status tracking, notifications, team management, and dashboard statistics.

## Tech Stack

- Frontend: React, Vite, Redux Toolkit, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB with Mongoose
- Authentication: JWT
- Deployment: Render or Railway

## Project Structure

```text
task-system/
+-- client/          # React frontend
+-- server/          # Express backend
+-- package.json     # Root build/start scripts
+-- railway.json     # Railway deployment config
+-- README.md
```

## Environment Variables

Create a `.env` file inside the `server` folder:

```env
NODE_ENV=development
PORT=8800
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:3000
```

For production, set these variables in Render or Railway:

```env
NODE_ENV=production
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

If frontend and backend are deployed separately, also set:

```env
CLIENT_URL=your_frontend_url
VITE_API_BASE_URL=your_backend_url/api
```

## Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/harshdipsinhzala/task-system.git
cd task-system
```

### 2. Install backend dependencies

```bash
cd server
npm install
```

### 3. Install frontend dependencies

```bash
cd ../client
npm install
```

### 4. Start the backend

From the `server` folder:

```bash
npm run dev
```

Backend will run on:

```text
http://localhost:8800
```

### 5. Start the frontend

Open a new terminal and run from the `client` folder:

```bash
npm run dev
```

Frontend will run on:

```text
http://localhost:3000
```

## Run as a Full-Stack Production App

From the root folder:

```bash
npm run build
npm start
```

The backend will serve the built React frontend from `client/dist`, and API routes will be available under:

```text
/api
```

## Main Routes

Frontend:

```text
/login
/dashboard
/tasks
/team
/trashed
/task/:id
/completed
/progress
/todo
```

Backend:

```text
/api/user
/api/tasks
/api/notifications
/health
```

## Author

Harshdip Sinh Zala
