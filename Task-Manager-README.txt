TASK MANAGER - SEPM
===================

Project Overview
----------------
Task Manager - SEPM is a full-stack task management web application designed to help teams create, assign, monitor, and organize tasks efficiently. The system provides user authentication, team management, task tracking, dashboard statistics, task status updates, notifications, and trash/restore functionality.

The application is built with a React frontend and an Express/MongoDB backend. It can be deployed as a single full-stack service where the backend serves the built React frontend and handles all API requests under /api.


Main Features
-------------
1. User authentication
   - User login and logout
   - JWT-based protected routes
   - Password change support

2. Dashboard
   - Overview of task statistics
   - Visual task data using charts
   - Quick access to task categories

3. Task management
   - Create new tasks
   - Edit and update tasks
   - Assign team members
   - Set task priority
   - Track task status: todo, in progress, completed
   - View task details
   - Add task activities and subtasks

4. Board and table views
   - View tasks in organized lists
   - Drag-and-drop task status updates
   - Filter tasks by status pages

5. Team management
   - View users
   - Add new users
   - Update user profiles
   - Admin-based user controls

6. Trash and restore
   - Move tasks to trash
   - Restore individual tasks
   - Restore all trashed tasks
   - Permanently delete tasks
   - Permanently delete all trashed tasks

7. Notifications
   - Fetch user notifications
   - Mark notifications as read
   - Mark all notifications as read

8. Deployment support
   - React Router refresh support
   - Full-stack Render deployment support
   - Railway deployment configuration included


Technology Stack
----------------
Frontend:
- React 18
- Vite
- React Router DOM
- Redux Toolkit
- React Redux
- Axios
- Tailwind CSS
- Headless UI
- React Hook Form
- Recharts
- React Icons
- Sonner / React Hot Toast
- React Beautiful DnD

Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token
- bcryptjs
- cors
- dotenv
- cookie-parser
- morgan

Database:
- MongoDB Atlas or any MongoDB-compatible database


Project Structure
-----------------
task-system/
|
|-- client/
|   |-- src/
|   |   |-- components/
|   |   |-- pages/
|   |   |-- redux/
|   |   |-- utils/
|   |   |-- App.jsx
|   |   |-- main.jsx
|   |
|   |-- package.json
|   |-- vite.config.js
|   |-- vercel.json
|
|-- server/
|   |-- controllers/
|   |-- middlewares/
|   |-- models/
|   |-- routes/
|   |-- utils/
|   |-- index.js
|   |-- package.json
|
|-- package.json
|-- railway.json
|-- README.md
|-- Task-Manager-README.txt


Frontend Pages
--------------
/login
    User login page.

/dashboard
    Main dashboard with task statistics.

/tasks
    Task listing and management page.

/team
    Team/user management page.

/trashed
    Trashed tasks page.

/task/:id
    Individual task details page.

/completed
    Completed tasks page.

/progress
    In-progress tasks page.

/todo
    Todo tasks page.


Backend API Routes
------------------
Base API path:
/api

User routes:
/api/user/register
/api/user/login
/api/user/logout
/api/user/get-team
/api/user/notifications
/api/user/profile
/api/user/read-noti
/api/user/change-password
/api/user/all
/api/user/:id

Task routes:
/api/tasks/create
/api/tasks/duplicate/:id
/api/tasks/activity/:id
/api/tasks/dashboard
/api/tasks
/api/tasks/trash
/api/tasks/:id
/api/tasks/create-subtask/:id
/api/tasks/trash/:id
/api/tasks/restore/:id
/api/tasks/restore-all
/api/tasks/delete/:id
/api/tasks/delete-all

Notification routes:
/api/notifications
/api/notifications/:id/read

Health check route:
/health


Environment Variables
---------------------
Create a .env file inside the server folder for local development:

NODE_ENV=development
PORT=8800
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:3000

For production deployment, set these variables in the hosting platform:

NODE_ENV=production
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

If frontend and backend are deployed separately, also set:

CLIENT_URL=your_frontend_url
VITE_API_BASE_URL=your_backend_url/api

If frontend and backend are deployed together as one full-stack service, VITE_API_BASE_URL is optional because the frontend uses /api by default in production.


Local Installation
------------------
1. Clone the repository:

git clone https://github.com/harshdipsinhzala/task-system.git

2. Go to the project folder:

cd task-system

3. Install backend dependencies:

cd server
npm install

4. Install frontend dependencies:

cd ../client
npm install

5. Add environment variables in server/.env.

6. Start the backend:

cd ../server
npm run dev

7. Start the frontend:

cd ../client
npm run dev

The frontend will run on:
http://localhost:3000

The backend API will run on:
http://localhost:8800/api


Full-Stack Build
----------------
From the root folder, run:

npm run build

This command installs backend dependencies, installs frontend dependencies, and builds the React frontend.

To start the production server from the root folder:

npm start


Deployment Notes
----------------
Single-service deployment:
The backend server can serve the React production build from client/dist. This means the whole app can run on one service, and frontend routes like /dashboard will work after refresh.

Render settings:
Root Directory: empty
Build Command: npm run build
Start Command: npm start

Railway settings:
The project includes railway.json.
Railway should automatically use:
Build Command: npm run build
Start Command: npm start
Healthcheck Path: /health


Common Troubleshooting
----------------------
1. Reloading /dashboard shows Not Found
   - Make sure the backend is serving client/dist.
   - Make sure React Router fallback is enabled.
   - In this project, server/index.js handles this for single-service deployment.

2. API requests go to localhost in production
   - Set VITE_API_BASE_URL if frontend and backend are separate.
   - If deployed together, production uses /api automatically.

3. Railway healthcheck fails
   - Make sure /health returns status 200.
   - This project includes a /health route.

4. MongoDB connection fails
   - Check MONGODB_URI.
   - Make sure the MongoDB Atlas network access allows the deployment platform.

5. Login or protected API fails
   - Check JWT_SECRET.
   - Make sure the token is sent correctly from the frontend.


Future Enhancements
-------------------
- Email notifications
- Better role-based permissions
- File attachments for tasks
- Task comments
- Search and advanced filters
- Calendar view
- Dark mode
- Better analytics dashboard
- Unit and integration tests


Conclusion
----------
Task Manager - SEPM is a practical full-stack MERN-style project for managing team tasks, tracking progress, and improving collaboration. It includes authentication, protected API routes, task workflows, notifications, and deployment-ready configuration for modern hosting platforms.
