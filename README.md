# 🎓 CourseTutor — Online Learning Platform

CourseTutor is a full-stack web application that connects teachers and students through an online learning platform. It supports course management, student enrollment, premium courses, payment integration, and real-time communication.

## 🔗 Project Links

- **Demo Video:** [Watch CourseTutor Demo](https://youtu.be/GmdO2F0NVgA)

The demo video provides a walkthrough of the application's features and workflow. The project documents contain additional information related to the project.

## 🌐 Project Overview

CourseTutor provides a platform where teachers can create and manage courses, while students can explore courses and enroll in learning opportunities.

- **Frontend:** React.js
- **Backend:** Python, Django, Django REST Framework
- **Database:** PostgreSQL
- **Real-Time Chat:** Django Channels and WebSockets
- **Payment Gateway:** Razorpay

## ✨ Features

- **Course Management:** Create, view, and edit courses.
- **Course Types:** Organize courses using course categories and images.
- **Premium Courses:** Browse and manage premium course offerings.
- **Payment Integration:** Razorpay integration for premium course payments.
- **Student Enrollment:** Track student enrollment and payment status.
- **Teacher–Student Chat:** Real-time communication using WebSockets.
- **REST API:** Connect the React frontend with the Django backend.
- **Database Management:** Store course, user, and enrollment information in PostgreSQL.

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend user interface |
| Redux | Frontend state management |
| Python & Django | Backend application |
| Django REST Framework | REST API development |
| PostgreSQL | Relational database |
| Django Channels | Real-time communication |
| WebSockets | Live chat |
| Razorpay | Payment integration |
| Axios | API requests |

## 🚀 Run Locally

### Prerequisites

- Python
- Node.js and npm
- PostgreSQL
- Git

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/CourseTuotor_webApp.git
cd CourseTuotor_webApp
```

### 2. Set up the Django backend

```bash
cd backend
python -m venv venv
```

Activate the virtual environment on Windows:

```powershell
.\venv\Scripts\Activate.ps1
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Configure your database and required environment variables, then run:

```bash
python manage.py migrate
python manage.py runserver
```

### 3. Set up the React frontend

Open another terminal:

```bash
cd frontend
npm install
npm start
```

If the project uses Vite, run `npm run dev` instead.

Ensure the frontend is configured to communicate with the Django backend.

## 💳 Payment Integration

CourseTutor uses Razorpay for its premium course payment workflow. Configure the appropriate Razorpay test credentials for development and verify payment results on the backend before updating enrollment status.

## 💬 Real-Time Chat

Django Channels and WebSockets enable real-time communication between teachers and students. The deployment environment must support ASGI and the configured channel layer.

## ☁️ Deployment

The application can be deployed using services such as Render:

- **Frontend:** React Static Site
- **Backend:** Django Web Service configured for ASGI
- **Database:** PostgreSQL
- **Channel Layer:** Redis or another compatible configured backend, if required

Configure environment variables, CORS, allowed hosts, database migrations, and production security settings before deployment.

## 🔐 Security

- Keep API keys, database credentials, and Django secret keys private.
- Never commit `.env` files or payment secrets.
- Validate payment signatures on the backend.
- Apply authentication and authorization to protected endpoints.
- Use HTTPS and secure WebSocket connections in production.

## 👨‍💻 Author

**SalmanSaalu**

GitHub: [SalmanSaalu](https://github.com/SalmanSaalu)

---

*CourseTutor — Connecting teachers and students through technology.*
