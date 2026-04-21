# CampusFlow - Student Support Hub

CampusFlow is a modern helpdesk and student support portal built with the MERN stack (MongoDB, Express, React, Node.js).

## Prerequisites
- Node.js (v18 or higher recommended)
- MongoDB (running locally on port 27017)

## Setup and Running Locally

Both the backend and frontend run from the same repository. You need two terminal windows to run them simultaneously.

### 1. Install Dependencies
Open a terminal in the project root folder and run:
```bash
npm install
```

### 2. Start the Backend Server
In the same terminal, start the Express backend server:
```bash
npm run dev
```
> The backend server will start on `http://localhost:5003`

### 3. Start the Frontend Application
Open a **new** terminal window in the project root folder and start the Vite development server:
```bash
npm run client
```
> The frontend will be available at `http://localhost:5173`

## Environment Variables
The application uses the following default environment variables (already configured in `.env`):
- `PORT=5003`
- `MONGO_URI=mongodb://127.0.0.1:27017/college_helpdesk`
- `CLIENT_URL=http://localhost:5173`

Make sure MongoDB is running locally before starting the backend server.
