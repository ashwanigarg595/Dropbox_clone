# Dropbox (Full Stack App)

A simple Dropbox full stack application built with **React**, **Node.js (Express)**, and **MongoDB**.  
This project allows users to signup, login/logout, upload, view, download and open files with persistent storage.

---

## Features
- User Login, Logout and Signip
- Upload files (`.txt`, `.json`, `.jpg`, `.png`, `.pdf`)
- Get Paginated list of all uploaded files
- Download files
- Open supported files (`.txt`, `.json`, `.jpg`, `.png`, `.pdf`) in a new browser tab
- Persistent storage using MongoDB

---

## Tech Stack

| Layer | Technology |
|--------|-------------|
| Frontend | React + Tailwind CSS + Axios |
| Backend | Node.js + Express + Multer + Mongoose |
| Database | MongoDB (Local instance) |

---

## Prerequisites

Ensure the following are installed on your system:

- [Node.js (v18 or later)](https://nodejs.org/)
- [npm (comes with Node.js)](https://www.npmjs.com/)
- [MongoDB Community Edition](https://www.mongodb.com/try/download/community)

---


## Setup & Run Instructions

1️⃣ Start MongoDB locally
- Install MongoDB via Homebrew (Mac):
- Run: brew services start mongodb-community

(Make sure MongoDB is running on port 27017)



2️⃣ Run the Backend: Open a new terminal and run:
- cd backend
- npm install
- npm start

(Backend runs on: http://localhost:5000)

Expected output:
MongoDB connected: mongodb://127.0.0.1:27017/dropbox_demo
Server running on port 5000




3️⃣ Run the Frontend - Open another terminal and run:
- cd frontend
- npm install
 -npm start

(Frontend runs on: http://localhost:3000)



4️⃣ Open the App: 
Now go to → http://localhost:3000



---
## You can:
- Signup/Login
- Upload a file
- View uploaded files
- Click on a file to view
- Download any file


---

<img width="2498" height="882" alt="image" src="https://github.com/user-attachments/assets/d789da5d-c6b9-43a1-b674-9b54f3c16590" />


---

<img width="2498" height="882" alt="image" src="https://github.com/user-attachments/assets/b2f851c7-3af6-490f-9b01-bef383ee8cf5" />


---


<img width="2758" height="872" alt="image" src="https://github.com/user-attachments/assets/69af597c-4f9e-414c-a472-ed8b69a1d0a5" />


