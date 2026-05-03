# 📡 Content Broadcasting System (Backend)

A scalable backend system for broadcasting subject-based educational content to students’ devices. Teachers upload content, the Principal reviews and approves it, and approved content is served via a public API with time-based scheduling and rotation.

---

## 🚀 Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **Authentication:** JWT (JSON Web Token)
* **File Upload:** Multer + AWS S3
* **Validation:** Express Validator
* **Architecture:** Controller → Service → Repository

---

## 📌 Features

### 🔐 Authentication & RBAC

* Secure login/signup with JWT
* Role-based access:

  * Teacher
  * Principal

---

### 👨‍🏫 Teacher Features

* Upload content (image-based)
* Add:

  * Title
  * Subject
  * Description
  * Start & End time
  * Rotation duration
* View own uploaded content with status

---

### 👨‍💼 Principal Features

* View all uploaded content
* View pending content
* Approve content
* Reject content (with reason)

---

### 🔥 Public Broadcasting API

* Endpoint: `/api/content/live/:teacherId`
* Returns:

  * Only approved content
  * Only within active schedule window
  * Subject-wise rotation logic
* If no content available → returns proper message

---

### 🧠 Scheduling & Rotation Logic

* Content is active only if:

  ```
  startTime <= currentTime <= endTime
  ```
* Each subject has independent rotation
* Content rotates based on `rotationDuration`
* Loop-based dynamic selection of active content

---

### 📂 File Upload

* Supported formats:

  * JPG
  * PNG
  * GIF
* Max file size: 10MB
* Stored in AWS S3

---

## 🗂️ Folder Structure

```
src/
├── controllers/
├── services/
├── repositories/
├── models/
├── routes/
├── middlewares/
├── utils/
├── config/
```

---

## 🔑 API Endpoints

### Auth

* `POST /auth/signup` → Register new user
* `POST /auth/login` → Authenticate and get JWT

---

### Teacher

* `POST /api/teacher/content/upload` → Upload content
* `GET /api/teacher/content/my` → Get teacher’s content

---

### Principal

* `GET /api/principal/content/all` → Get all content
* `GET /api/principal/content/pending` → Get pending content
* `PATCH /api/principal/content/:id/approve` → Approve content
* `PATCH /api/principal/content/:id/reject` → Reject content

---

### Public

* `GET /content/live/:teacherId` → Get live content for a teacher

---

## ⚙️ Setup Instructions

---

### 1. Install Dependencies

```
npm install
```

---

### 2. Environment Variables (.env)

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret

AWS_ACCESS_KEY=your_key
AWS_SECRET_KEY=your_secret
AWS_REGION=your_region
AWS_BUCKET_NAME=your_bucket
```

---

### 3. Run Server

```
npx nodemon
```

---

## 🧪 Testing

Use Postman to test APIs:

1. Login → get token
2. Use token in headers:

   ```
   Authorization: Bearer <token>
   ```

---

## ⚠️ Edge Cases Handled

* No content available
* Approved but outside schedule window
* Invalid teacherId
* File validation errors
* Unauthorized access
* Missing required fields

---

## 📊 Production Considerations

* Clean layered architecture
* Optimized DB queries (`lean()`)
* Pagination support
* Centralized error handling
* Scalable design approach

---

## ⚠️ Note on Database Choice

Although the assignment suggested PostgreSQL/MySQL, I chose MongoDB to focus on rapid development and flexible schema design.

I am currently learning PostgreSQL and relational database design and can easily adapt this system to a SQL-based architecture if required.

---

## 🌟 Bonus Features (Optional)

* Redis caching (for live API)
* Rate limiting
* Logging system
* Analytics tracking

---

## 📹 Demo

https://your-demo-video-link

---

## 🔗 API Documentation

https://documenter.getpostman.com/view/35153003/2sBXqJJfH8

---

## 👨‍💻 Author

Annu Singh
Backend Developer

---

## 🏁 Conclusion

This project demonstrates a real-world backend system with authentication, approval workflows, and dynamic content broadcasting using scheduling and rotation logic. It reflects strong backend fundamentals, clean architecture, and scalability considerations.m
