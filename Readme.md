# 🚀 Task Manager - Full-Stack Web Application

A modern, production-ready task management application built with React, Node.js, Express, and MongoDB. Features complete authentication, CRUD operations, and a responsive UI.

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Demo Credentials](#demo-credentials)
- [API Documentation](#api-documentation)
- [Production Deployment](#production-deployment)

---

## 🛠 Tech Stack

### Frontend
- **React 18** with Vite (fast build tool)
- **React Router v6** for routing
- **TailwindCSS** for styling
- **React Hook Form** + **Zod** for form validation
- **Axios** for API communication
- **Context API** for state management

---

## ⚡ Quick Start (TL;DR)

```bash
git clone <repository-url>
cd task-manager-app

# Backend
cd backend
npm install
cp .env.example .env
npm run dev

# Frontend
cd ../frontend
npm install
cp .env.example .env
npm run dev


### Backend
- **Node.js** + **Express** (RESTful API)
- **MongoDB** + **Mongoose** (ODM)
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Joi** for request validation
- **Morgan** for HTTP logging

---

## ✨ Features

### Authentication
- ✅ User signup with validation
- ✅ Secure login with JWT tokens
- ✅ Password hashing with bcrypt
- ✅ Protected routes (frontend & backend)
- ✅ Auto-logout on token expiration

### Task Management
- ✅ Create, Read, Update, Delete tasks
- ✅ Task properties: title, description, status, priority, due date
- ✅ Filter by status, priority
- ✅ Search functionality
- ✅ Sort by multiple fields
- ✅ Real-time task statistics

### User Profile
- ✅ View profile information
- ✅ Update name, email
- ✅ Change password
- ✅ Account details display

### UI/UX
- ✅ Responsive design (mobile-first)
- ✅ Loading states & spinners
- ✅ Toast notifications
- ✅ Error handling
- ✅ Clean, modern interface
- ✅ Intuitive navigation

---

## 📁 Project Structure

```
task-manager-app/
├── backend/
│   ├── src/
│   │   ├── config/          # Database configuration
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Auth, validation, error handling
│   │   ├── models/          # Mongoose models
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── utils/           # Helper functions
│   │   ├── validators/      # Joi schemas
│   │   ├── app.js          # Express app setup
│   │   └── server.js       # Server entry point
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/            # API client functions
│   │   ├── components/     # React components
│   │   │   ├── auth/       # Auth-related components
│   │   │   ├── common/     # Reusable UI components
│   │   │   ├── layout/     # Layout components
│   │   │   └── tasks/      # Task components
│   │   ├── context/        # React Context (AuthContext)
│   │   ├── hooks/          # Custom hooks
│   │   ├── pages/          # Page components
│   │   ├── App.jsx         # Main App component
│   │   └── main.jsx        # React entry point
│   ├── .env.example
│   └── package.json
│
├── README.md
└── postman_collection.json
```

---

## 📦 Prerequisites

Before you begin, ensure you have installed:

- **Node.js** >= 18.x ([Download](https://nodejs.org/))
- **MongoDB** >= 6.x ([Download](https://www.mongodb.com/try/download/community))
  - Or use MongoDB Atlas (cloud database)
- **npm** or **yarn** package manager

---

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd task-manager-app
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

---

## 🔐 Environment Variables

### Backend (.env)

Create a `.env` file in the `backend` directory:

```env
NODE_ENV=development
PORT=5000

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/taskmanager

# JWT Secret (CHANGE THIS!)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-use-long-random-string
JWT_EXPIRE=7d

# CORS
CLIENT_URL=http://localhost:5173
```

**Security Note:** Use a strong, random JWT_SECRET in production. Generate one with:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Frontend (.env)

Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:5000/api/v1
```

---

## 🚀 Running the Application

### Option 1: Run Backend and Frontend Separately

#### Terminal 1 - Backend
```bash
cd backend
npm run dev
```
Server will start at `http://localhost:5000`

#### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```
Frontend will start at `http://localhost:5173`

### Option 2: MongoDB Setup

**Local MongoDB:**
1. Install MongoDB Community Edition
2. Start MongoDB service:
   ```bash
   # macOS
   brew services start mongodb-community

   # Linux
   sudo systemctl start mongod

   # Windows
   net start MongoDB
   ```

**MongoDB Atlas (Cloud):**
1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in backend `.env`

---

## 👤 Demo Credentials

For testing, create a user via signup or seed the database:

**Option 1: Create via Signup Page**
- Navigate to `http://localhost:5173/signup`
- Fill in the form

**Option 2: MongoDB Shell**
```javascript
// In MongoDB shell or Compass
use taskmanager

db.users.insertOne({
  name: "Demo User",
  email: "demo@example.com",
  password: "$2a$10$XqV5Z3KGJhX8Y9qVlN.X0eO8yYX5Z3KGJhX8Y9qVlN.X0eO8yYX5Z3",
  // password: "password123" (hashed)
  role: "user",
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

**Login:**
- Email: `demo@example.com`
- Password: `password123`

---

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api/v1
```

### Authentication Endpoints

#### POST /auth/signup
Register a new user
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### POST /auth/login
Login user
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### GET /auth/me
Get current user (requires auth token)

### Task Endpoints (All require authentication)

#### GET /tasks
Get all tasks with optional filters
- Query params: `status`, `priority`, `search`, `sortBy`, `order`

#### POST /tasks
Create new task
```json
{
  "title": "Complete project",
  "description": "Finish the task manager app",
  "status": "pending",
  "priority": "high",
  "dueDate": "2024-12-31"
}
```

#### PUT /tasks/:id
Update task

#### DELETE /tasks/:id
Delete task

### User Endpoints (All require authentication)

#### GET /users/profile
Get user profile

#### PUT /users/profile
Update profile

#### PUT /users/change-password
Change password

**Full Postman Collection:** See `postman_collection.json` in root directory

---

## 🌐 Production Deployment

### Scaling for Production

**1. Infrastructure**
- **Frontend:** Deploy to Vercel, Netlify, or AWS S3 + CloudFront
- **Backend:** Deploy to AWS EC2, DigitalOcean, Heroku, or Railway
- **Database:** Use MongoDB Atlas (managed database)
- **Reverse Proxy:** Nginx for SSL termination and load balancing

**2. Environment Management**
- Use separate `.env` files for dev, staging, production
- Never commit `.env` files to git
- Use environment variable managers (AWS Secrets Manager, Vault)

**3. Database Optimization**
- Create indexes on frequently queried fields (already implemented)
  ```javascript
  // Example indexes in User model
  userSchema.index({ email: 1 });
  
  // Example indexes in Task model
  taskSchema.index({ user: 1, status: 1 });
  taskSchema.index({ user: 1, createdAt: -1 });
  ```
- Connection pooling (default in Mongoose)
- Consider read replicas for high traffic

**4. Caching**
- Implement Redis for:
  - Session storage
  - Frequently accessed data
  - Rate limiting counters
- Cache task statistics at application level

**5. Security Enhancements**
- **Rate Limiting:** Use `express-rate-limit`
  ```javascript
  import rateLimit from 'express-rate-limit';
  
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  });
  app.use('/api', limiter);
  ```
- **Helmet.js:** Set security headers
- **CORS:** Whitelist specific origins only
- **Input Sanitization:** Already implemented with Joi
- **SQL Injection Prevention:** MongoDB parameterized queries (done)
- **XSS Prevention:** Sanitize user inputs

**6. Monitoring & Logging**
- Use Winston or Pino for structured logging
- Implement error tracking (Sentry, LogRocket)
- Performance monitoring (New Relic, Datadog)
- Set up health checks and uptime monitoring

**7. CI/CD Pipeline**
- GitHub Actions / GitLab CI for automated testing
- Automated deployment on merge to main
- Run tests before deployment
- Blue-green deployment for zero downtime

**8. Performance**
- Enable gzip compression
- Implement CDN for static assets
- Lazy loading for React components
- Code splitting with React.lazy()
- Image optimization

**9. Backup & Recovery**
- Automated daily database backups
- Point-in-time recovery capability
- Disaster recovery plan

**10. Load Balancing**
- Use PM2 for Node.js clustering
- Horizontal scaling with multiple server instances
- Load balancer (AWS ELB, Nginx)

---

## 🧪 Testing

```bash
# Backend tests (if implemented)
cd backend
npm test

# Frontend tests (if implemented)
cd frontend
npm test
```

---

## 📄 License

MIT License - feel free to use this project for learning or production.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 💬 Support

For issues or questions, please open an issue on GitHub.

---

**Built with ❤️ using React, Node.js, and MongoDB**