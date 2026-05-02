# 🎓 College Discovery Platform

A full-stack web application that helps users explore colleges, compare them, ask questions, and save their preferences — built as a production-grade MVP.

---

## 🚀 Live Demo

* 🌐 Frontend: https://college-platform-opal.vercel.app/
* ⚙️ Backend: https://college-platform-4xz6.onrender.com

---

## ✨ Features

### 🔍 College Listing & Search

* Browse colleges with key details:

  * Name, Location, Fees, Rating
* Search colleges by name
* Clean and responsive UI

---

### 🏫 College Detail Page

* Detailed view of each college
* Sections include:

  * Overview (fees, rating, location)
  * Courses offered
  * Placement data (mock)
  * Reviews (mock)

---

### ⚖️ Compare Colleges (Core Feature)

* Select 2 colleges to compare
* View side-by-side comparison:

  * Fees
  * Rating
  * Location
  * Placement %

---

### 💬 Q&A Section

* Ask questions about colleges
* View all questions
* Add answers to existing questions

---

### ⭐ Saved Colleges

* Save colleges for later
* Persistent storage using localStorage
* Dedicated saved items page

---

## 🛠️ Tech Stack

### Frontend

* React.js (Vite)
* Tailwind CSS
* Axios
* React Router

### Backend

* Node.js
* Express.js
* REST APIs

### Deployment

* Frontend: Vercel
* Backend: Render

---

## 📁 Project Structure

```
college-platform/
├── frontend/   # React + Tailwind
├── backend/    # Node + Express APIs
```

---

## ⚙️ How It Works

* Frontend communicates with backend via REST APIs
* Backend handles:

  * College data
  * Q&A system
* Saved items are managed via browser localStorage
* Designed to be easily extendable to full authentication and database systems

---

## 🧠 Design Decisions

* Focused on **core product features** rather than over-engineering
* Used **mock data via backend APIs** to simulate real database behavior
* Implemented modular and scalable structure for easy future enhancements

---

## 🔮 Future Improvements

* Add authentication (login/signup)
* Replace localStorage with database persistence
* Add pagination and advanced filters
* Implement predictor tool (rank-based college suggestions)

---

## 👨‍💻 Author

* GitHub: https://github.com/aniket-dev30

---


