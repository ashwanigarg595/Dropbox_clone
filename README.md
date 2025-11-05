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

<img width="2758" height="872" alt="image" src="https://github.com/user-attachments/assets/7674465a-47b4-488e-81cd-f1a15f086fb5" />



---

<img width="2728" height="884" alt="image" src="https://github.com/user-attachments/assets/7800f559-fafd-4ee9-890d-cf52479f1048" />


---


<img width="2828" height="1162" alt="image" src="https://github.com/user-attachments/assets/18da8096-e3db-42e4-9745-ac8623a1bce3" />
