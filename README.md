# Task Manager App (Fullstack CRUD)

A fullstack task management application built with **React (Vite)** on the frontend and **Express (TypeScript)** on the backend.  
It supports full CRUD operations, user authentication, filtering, pagination, and is fully documented with Swagger and tested with Vitest and Jest.

## 🔧 Tech Stack

### Frontend
- **React (Vite)** + **TypeScript**
- **CSS Modules** for scoped styling
- **React Testing Library + Vitest** for unit tests
- **Accessible and semantic HTML** practices

### Backend
- **Express.js (TypeScript)**
- **Prisma ORM** with PostgreSQL
- **JWT Authentication**
- **Swagger** for REST API documentation
- **Helmet + CORS + Rate Limiting** for security
- **Jest** for backend unit and integration tests

## 📦 Features

### ✅ Tasks
- Create, read, update, and delete tasks
- Toggle task completion
- Filter tasks by search or completion status
- Paginate through task list

### 🔐 Auth
- User registration and login
- JWT-based protected routes
- Logout on 401/403 from any endpoint

### 🧪 Testing
- **Backend:** `services` and `routes` tested using Jest
- **Frontend:** Components tested with React Testing Library and Vitest

### 📚 API Documentation
- Available at: `/api-docs`
- Powered by Swagger UI and OpenAPI schema

## 🏁 Getting Started

### 1. Clone and Install
```bash
git clone git@github.com:higorasilverio/curotec.git
cd curotec
```

### 2. Backend Setup
```bash
cd backend
npm install
npx prisma migrate dev --name init
npm start
```

**Environment Variables (backend):**
```
DATABASE_URL=
JWT_SECRET=
PORT=
RATE_LIMIT_TIME=
RATE_LIMIT_REQUESTS=
ENABLE_TRANSPORT_SECURITY=
WEB_APPLICATION_DOMAIN_URL=
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm start
```

**Environment Variables (frontend):**
```
VITE_API_TASK_URL=
VITE_API_AUTH_URL=
```

## 🧪 Running Tests

### Backend
```bash
cd backend
npm test
```

### Frontend
```bash
cd frontend
npm test
```

## 🧰 Folder Structure Highlights

### Backend
```
/backend
├── prisma/
├───── migrations/
├── src/
├──── __mocks__/
├──── controllers/
├──── services/
├──── routes/
├──── middlewares/
├──── config/ (Swagger & rate limiter)
├──── lib/ (Prisma client)
```

### Frontend
```
/frontend
├── src/
├──── components/
├────── __tests__/
├──── hooks/
├──── styles/
├──── types/
├──── test/
├──── lib/
```

## 🔐 Security

- **Helmet**: Sets secure HTTP headers
- **Rate Limiter**: Prevents API abuse
- **CORS**: Configured for frontend domain
- **JWT**: Access control and session management
- **Error Handling**: Centralized and user-friendly

## 🚀 Deployment Tips

- Use **Amazon Aurora Serverless v2** or PostgreSQL in production
- Setup **HTTPS** and secure cookie handling
- Leverage **CI/CD** pipelines for test coverage enforcement

## 🙌 Acknowledgments

Built as part of a technical assessment, with a focus on:
- Code clarity and maintainability
- Testing discipline
- Security best practices
- RESTful design and OpenAPI documentation

## 📄 License

MIT License.
