## 📘 Chapter Performance Dashboard Backend

A RESTful API built using **Node.js**, **Express**, **MongoDB**, and **Redis** to manage and evaluate chapter performance.
This project was built as part of the MathonGo backend developer task.

---

### 🚀 Live Demo

🌐 **API Base URL:**
`https://chapter-dashboard-backend.onrender.com`
*Root response: 📘 Chapter Dashboard API is running!*
*Use /api/v1/chapters for GET and POST*


📬 **Postman Collection:**
[View Public Collection](https://www.postman.com/jatinjotsingh/chapter-api-demo/collection/f3lk6i8/chapter-api-demo?action=share&creator=43658500)


---

### 📦 Features Implemented

* **GET /api/v1/chapters**

  * Retrieve all chapters with filters & pagination
* **POST /api/v1/chapters**

  * Upload chapters via `.json` file (admin-only)

#### 🔍 Filters Supported:

* `class`
* `subject`
* `unit`
* `status` (e.g. `"completed"`, `"pending"`)
* `weakChapters` (e.g. `true`, `false`)
* `page` and `limit` for pagination

#### 🧠 Caching:

* `GET /chapters` results are cached for **1 hour** using **Redis**

#### 🔒 Rate Limiting:

* Max **30 requests per minute** per IP using Redis

#### 🗃 Schema Validation:

* Invalid chapters during upload are skipped and reported

---

### 🧪 Tech Stack

* **Node.js**, **Express.js**
* **MongoDB Atlas**, **Mongoose**
* **Redis Cloud** for caching and rate limiting
* **Multer** for file upload
* **Render** for deployment
* **Postman** for API testing

---

### ⚙️ Environment Variables

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongo_uri_here
REDIS_URL=your_redis_url_here
```

Use the `.env.example` file as a reference.

---

### 📂 Sample JSON Format for Upload

```json
[
  {
    "name": "Algebra",
    "class": "10",
    "subject": "Math",
    "unit": "Unit 1",
    "status": "completed",
    "isWeak": false
  },
  {
    "name": "Geometry",
    "class": "10",
    "subject": "Math",
    "unit": "Unit 2",
    "status": "pending",
    "isWeak": true
  }
]
```

---

### 📁 Folder Structure

```
.
├── controllers/
├── middlewares/
├── models/
├── routes/
├── utils/
├── uploads/
├── server.js
├── .env.example
├── package.json
```

---

### 🧾 Submission Checklist

* [x] ✅ Working API Endpoints
* [x] ✅ Redis Caching
* [x] ✅ Rate Limiting
* [x] ✅ MongoDB Atlas + Redis Cloud
* [x] ✅ Postman Public Collection
* [x] ✅ Render Deployment

---

### 📬 Contact

**Jatinjot Singh**
📧 \[[jatinjot28@example.com](mailto:jatinjot28@example.com)]
🔗 GitHub: [github.com/JSingh1130](https://github.com/JSingh1130)

---

