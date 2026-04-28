# 📄 Architecture Notes – Content Broadcasting System

---

## 1. 🔐 Authentication & RBAC Flow

The system uses **JWT-based authentication**.

* User logs in → receives JWT token
* Token is sent in headers:

  ```
  Authorization: Bearer <token>
  ```

### Middleware Flow:

1. `authUser` → verifies JWT and attaches user to request
2. `authorizeRoles` → restricts access based on role

### Roles:

* **Teacher**

  * Upload content
  * View own content
* **Principal**

  * View all content
  * Approve / Reject content

---

## 2. 📚 Subject-Based System Design

* Each content belongs to a **subject** (maths, science, etc.)
* Content is grouped dynamically based on subject
* Each subject has **independent rotation logic**

Example:

* Maths → rotates among Maths content only
* Science → rotates among Science content only

---

## 3. 📂 Upload Handling Approach

* File upload handled using **Multer + AWS S3**
* Files are stored in S3 bucket
* Only allowed formats:

  * JPG
  * PNG
  * GIF
* File size limit: 10MB

### Metadata stored in DB:

* fileUrl
* fileType
* fileSize

---

## 4. ✅ Approval Workflow Design

Content lifecycle:

```
uploaded → pending → approved / rejected
```

### Rules:

* Only **Principal** can approve/reject

* Approval sets:

  * status = approved
  * approvedBy
  * approvedAt

* Rejection sets:

  * status = rejected
  * rejectionReason (mandatory)
  * rejectedAt

### Important:

* Only **approved content** is eligible for broadcasting

---

## 5. ⏱️ Scheduling & Rotation Logic (CORE)

### Step 1: Filtering

Content is eligible only if:

```
status = approved
startTime <= currentTime <= endTime
isActive = true
```

---

### Step 2: Grouping

* Content is grouped by subject

---

### Step 3: Rotation Logic

For each subject:

1. Calculate total duration:

   ```
   totalDuration = sum(rotationDuration)
   ```

2. Calculate elapsed time:

   ```
   timePassed = (currentTime - firstContentTime)
   ```

3. Find current cycle:

   ```
   cycleTime = timePassed % totalDuration
   ```

4. Select active content:

   * Iterate and find where cumulative duration matches

---

### Output:

* One active content per subject
* If no content → return empty response

---

## 6. 🗄️ Database Design Decisions

Using **MongoDB (NoSQL)** instead of relational DB.

### Reason:

* Flexible schema
* Nested scheduling fields
* Faster development

### Key Collections:

#### Users

* id, name, email, role

#### Content

* title, subject, file details
* uploadedBy
* status
* schedule (nested object)

---

## 7. 📁 Folder Structure

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

### Architecture Pattern:

Controller → Service → Repository

---

## 8. 🧩 Middleware Usage

* **authUser** → JWT verification
* **authorizeRoles** → role-based access
* **upload middleware** → file handling
* **validation middleware** → request validation
* **error handler** → centralized error handling
* **rate limiting** → request handling

---

## 9. 🚀 Scalability Approach

### Current:

* Clean modular architecture
* Optimized queries using `.lean()`
* Pagination support
* Rate limiting

### Future Improvements:

* Redis caching for live API
* Queue system for heavy processing
* Logging & monitoring

---

## 🏁 Conclusion

The system is designed with a **scalable and modular backend architecture**, ensuring proper separation of concerns, secure role-based access, and efficient real-time content broadcasting using scheduling and rotation logic.
