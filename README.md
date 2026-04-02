Workflow

AI-Integrated Project Management System

A Full-Stack Project & Production-Ready Portfolio Application

🔗 Live Demo: https://tinyurl.com/Codewithbry-Workflow


---

📘 Project Overview

Workflow is a full-stack AI-powered project management web application designed to enhance productivity through structured task organization, intelligent AI assistance, and real-time analytics.

This system was developed as a capstone-level project to demonstrate applied knowledge in:

Full-stack development

AI integration architecture

Secure API design

Cloud-based services

Analytics computation logic

Scalable frontend structure


Unlike traditional task managers, Workflow embeds AI directly into individual tasks, enabling contextual assistance such as task breakdown, code generation, writing help, idea expansion, and problem-solving.


---

🎓 Capstone Documentation Structure

1. Problem Statement

Traditional project management tools provide organization but lack intelligent task-level assistance. Users must manually interpret tasks, plan execution, and track productivity without automated guidance.

There is a need for a system that:

Assists users contextually at the task level

Tracks productivity behavior through analytics

Secures AI API communication

Maintains scalable and modular architecture


Workflow addresses these gaps through AI integration and structured analytics.


---

2. Objectives

General Objective

To design and develop a full-stack AI-integrated project management system that enhances task execution efficiency and productivity tracking.

Specific Objectives

Implement structured project and task grouping

Integrate AI assistance per task

Compute daily and weekly productivity averages

Secure AI communication through backend routing

Design a scalable modular frontend architecture



---

3. System Architecture

Workflow follows a layered full-stack architecture:

Frontend (React + TypeScript) ↓ Backend (Node.js + Express) ↓ Cloud Services (Firebase, Cloudinary) ↓ AI Integration Layer (Google Generative AI)

Architecture Flow

1. User creates project


2. User adds task groups and tasks


3. AI Assist button sends structured task data to backend


4. Backend formats controlled prompt template


5. AI generates response


6. User completes task


7. Analytics automatically update



This architecture ensures separation of concerns, security, and maintainability.


---

4. AI System Design

AI Integration Model

Structured prompt generation

Backend API isolation

JSON safety parsing

Conversation persistence

Markdown rendering with syntax highlighting


AI Capabilities

Task breakdown

Code generation

Writing assistance

Planning guidance

Idea expansion


Security Consideration

API keys are stored exclusively in backend environment variables

Frontend never directly exposes AI credentials



---

5. Analytics Computation Logic

Analytics transform raw task completion data into interpretable productivity metrics.

Daily Average

Average = Total Finished Tasks / Active Days

Weekly Average

Average = Total Finished Tasks / Active Weeks

Implemented Features

Weekly range calculation

Selected week filtering

Line and bar chart visualization

Task progress indicators

Behavioral productivity insights


This enables users to evaluate patterns and measure consistency.


---

6. Database Structure (Conceptual Schema)

Projects

projectId

projectName


TaskGroups

groupId

groupName

projectId (Foreign Key)


Tasks

taskId

taskDescription

dateCreated

status (pending | finished)

groupId (Foreign Key)


Firebase is used for authentication and cloud-based persistence.


---

🏗 Technical Implementation

Frontend

React

TypeScript

Vite

CSS Modules

Context API

Custom Hooks


Architectural Principles

Separation of concerns

Utility-driven business logic

Modular feature-based structure

Reusable UI components

Clean state management


Backend

Node.js

Express

TypeScript

CORS middleware

Environment-based configuration


Cloud & External Services

Firebase Authentication

Cloudinary (Image Storage)

Google Generative AI API



---

🔐 Security & Best Practices

Backend AI key isolation

CORS configuration

Environment variable protection

Controlled image upload and deletion

Structured AI prompt formatting



---

🧪 Testing & Validation

Manual validation performed for:

CRUD operations

Authentication flows

AI response rendering

Analytics accuracy

UI responsiveness


Planned Improvements:

Unit testing (Vitest/Jest)

Integration testing

AI endpoint rate limiting



---

🚀 Deployment Guide

Frontend

npm install
npm run dev

Backend

cd server
npm install
npm run dev

Environment variables required for:

Firebase

Cloudinary

Google Generative AI



---

💼 Recruiter-Focused Highlights

Workflow demonstrates:

Full-stack TypeScript proficiency

AI integration architecture

Secure backend API routing

Analytics computation logic

Cloud service integration

Production-ready project structure

Modular scalable frontend design

Real-world SaaS development thinking


This project reflects intermediate-to-advanced full-stack capabilities and practical AI system implementation.


---

📈 Future Roadmap

Team collaboration features

Role-based access control

AI-driven task prioritization

Predictive productivity modeling

Calendar integration

Backend-level analytics aggregation

Usage quota management



---

📄 License

Developed for educational, capstone, and portfolio purposes.


---

👨‍💻 Author

Developed by Bry
Full-Stack Developer | AI-Integrated Systems Builder
### Backend

-   TypeScript
-   Node.js
-   Express 5
-   dotenv
-   cors
-   nodemon
-   @google/generative-ai
-   cloudinary
-   Firebase

------------------------------------------------------------------------

## 🔑 Key Methods & Core Functions

### React Hooks

-   useState()
-   useEffect()

### Routing

-   BrowserRouter
-   Routes
-   Route
-   useNavigate()

### Firebase Authentication

-   createUserWithEmailAndPassword()
-   signInWithEmailAndPassword()
-   updatePassword()
-   onAuthStateChanged()

### Markdown Rendering

-   `<ReactMarkdown />`{=html}
-   remarkGfm
-   rehypeHighlight
-   rehypeSanitize

### Charts

-   `<Line />`{=html}
-   `<Bar />`{=html}

### Animations

-   motion.div
-   initial
-   animate
-   exit

### Express Server

-   express()
-   app.use()
-   app.listen()

### Middleware

-   cors()
-   dotenv.config()
-   express.json()

### Google Generative AI

-   new GoogleGenerativeAI()
-   model.generateContent()

### Cloudinary

-   cloudinary.uploader.upload()
-   cloudinary.uploader.destroy()

------------------------------------------------------------------------

## 📦 Installation

### Frontend

npm install\
npm run dev

### Backend

cd server\
npm install\
npm run dev

------------------------------------------------------------------------

## 🔐 Environment Variables (Server)

PORT=\
GOOGLE_API_KEY=\
CLOUDINARY_CLOUD_NAME=\
CLOUDINARY_API_KEY=\
CLOUDINARY_API_SECRET=\
FIREBASE_CONFIG=

------------------------------------------------------------------------

## 📈 What This Project Demonstrates

-   Clean full-stack architecture
-   Secure authentication implementation
-   AI-powered response system
-   Cloud-based file management
-   Data visualization techniques
-   Production-level TypeScript usage

------------------------------------------------------------------------

## 📄 License

This project is open-source and available under the MIT License.
