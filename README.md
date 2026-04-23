# SkillConnect
## Client – Job Portal Frontend

This is the frontend of the Job Portal Application, built using React, Redux Toolkit, RTK Query, and React Router.
The frontend interacts with the backend API to allow users to register, log in, apply for jobs, create job posts, and manage their profile.

## 🚀 Features

User Registration & Login (JWT + Cookies)

Forgot Password & Reset Password

Role-based access (Jobseeker / Recruiter)

Job Post Creation & Editing

View All Job Posts

Apply for Jobs

React Router Navigation

Fully Responsive UI

Form Validation

Toast Notifications

Secure API requests using RTK Query

## 🛠️ Tech Stack

### Frontend

React.js

Redux Toolkit

RTK Query

React Router DOM

Bootstrap

Toast notifications

## Screenshots

<img width="1857" height="816" alt="Screenshot 2025-11-23 174500" src="https://github.com/user-attachments/assets/c6809d93-0869-4046-908a-e29c085505fc" />


<img width="1879" height="793" alt="Screenshot 2025-11-23 174811" src="https://github.com/user-attachments/assets/0c6418c7-6518-4c67-87c0-2871f74085be" />






## Server – Job Portal API

This repository contains the backend/server of the Job Portal Application, built using Node.js, Express.js, MongoDB (Mongoose), and JWT authentication.
It provides secure REST APIs for user authentication, job posting, job editing, deleting, and managing user profiles.

## 🚀 Features

User Registration & Login

JWT-Based Authentication

Forgot Password + Reset

CRUD tasks for Job Posts

Protected Routes (Auth Middleware)

MongoDB Atlas Integration

Fully deployed on Render

## 🛠️ Tech Stack 

Server -	Node.js, Express.js

Database -	MongoDB Atlas, Mongoose

Authentication -	JWT, bcrypt

Email Service	Nodemailer (Gmail SMTP)

Deployment -	Render

### 🔗 API Base URL

https://server-s9je.onrender.com/api



## 📚 API Endpoints

### Auth Routes

Method	Endpoint	Description

POST	  /register	  Register new user

POST	  /login	    Login user

GET	    /me	        Get logged-in user profile 

### Job Routes

Method	Endpoint	    Description

POST	  /postjob	    Create job post

GET	   /getjobs	      Fetch all jobs

GET	   /jobview/:id	  Get single job by ID


## 🔐 Authentication Workflow

User logs in → Server sends JWT token via cookies

Cookie is stored with HttpOnly & Secure

Protected routes require auth middleware

If token invalid → 401 Unauthorized
