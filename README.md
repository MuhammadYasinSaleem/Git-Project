# 🚀 Express Auth API

A secure, modular, and production-ready authentication REST API built using **Express.js**, **JWT**, **MongoDB**, and **Mongoose**. Includes CI/CD via **GitHub Actions**, **pre-commit hooks** with **Husky**, and test coverage using **Jest + Supertest + mongodb-memory-server**.

---

## 📁 Folder Structure

```
express-auth-api/
├── config/            # Database connection
│   └── db.js
├── controllers/       # Route logic
│   └── authController.js
├── middleware/        # (Reserved for JWT middleware)
│   └── authMiddleware.js
├── models/            # Mongoose schemas
│   └── User.js
├── routes/            # API endpoints
│   └── authRoutes.js
├── utils/             # Utility functions (e.g., token generator)
│   └── generateToken.js
├── tests/             # Jest tests
│   └── auth.test.mjs
├── .env               # Environment variables
├── .gitignore         # Ignore node_modules, .env, etc.
├── .prettierrc        # Prettier config
├── .prettierignore    # Prettier ignore
├── package.json       # Project metadata and scripts
├── index.js           # App entry point
└── README.md
```

---

## ✨ Features

### 🔐 Authentication (Email + Password)
- ✅ **Signup** (`POST /api/auth/signup`)
  - Registers new user
  - Hashes password using `bcrypt`
  - Returns a `JWT token`
- ✅ **Login** (`POST /api/auth/login`)
  - Validates credentials
  - Returns `JWT` if valid
- ❌ **(No protected routes)** – you can easily add later!

---

### 📦 MongoDB Integration
- Uses `Mongoose` to connect to **MongoDB Atlas**
- Models stored in `models/User.js`
- Connection logic in `config/db.js`

---

### 🧪 Testing
- ✅ Tests written using **Jest** + **Supertest**
- ✅ In-memory database for isolated testing using `mongodb-memory-server`
- ✅ Four end-to-end test cases covering:
  - User registration
  - Duplicate signup
  - Valid login
  - Invalid login
- ✅ Run tests with:
  ```bash
  npm test
  ```

---

### 🧹 Code Formatting & Linting
- ✅ Prettier for consistent formatting
- ✅ `.prettierrc` and `.prettierignore` for config
- ✅ Pre-commit hooks using Husky + lint-staged
- 🚫 Ensures no bad code is committed

---

### ⚙️ CI/CD Pipeline
- ✅ GitHub Actions workflow configured at `.github/workflows/ci.yml`
- **Triggers:**
  - On push to `main`, `dev`, and any `feature/*` branch
  - On pull requests to `main` or `dev`
- **Workflow steps:**
  - Install dependencies
  - Run Prettier/lint
  - Run tests

---

### ⚙️ Scripts
| Command         | Description                        |
|-----------------|------------------------------------|
| npm run dev     | Run app in dev mode with nodemon   |
| npm test        | Run all tests with Jest            |
| npm start       | Run the app in production mode     |

---

### 📄 Environment Variables
Create a `.env` file:

```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

---

### 📦 Tech Stack
- **Express.js** ⚡️
- **MongoDB Atlas** 🟢
- **Mongoose** 🍃
- **JWT** 🔐
- **Bcrypt** 🔑
- **Jest + Supertest** 🧪
- **Husky + Prettier + Lint-staged** 🧼
- **GitHub Actions** 🤖

---

## 🙌 Author
Made with ❤️ by Muhammad Yasin Saleem
