# 🚕 Uber Clone – Full Stack Ride Booking Platform

A full-stack Uber-like ride booking application built with **MERN stack**, **Socket.IO**, and **Google Maps**.  
The system supports **real-time ride matching, live location tracking**, and **role-based authentication** for Users and Captains (Drivers).

This project focuses on **real-world architecture**, **scalability**, and **production-ready practices**.

---

## 🌟 Features

### 👤 User
- Signup / Login (JWT + Refresh Token)
- Location autocomplete
- Fare estimation
- Create ride requests
- Real-time ride status updates
- Live driver tracking

### 🚗 Captain (Driver)
- Signup / Login
- Live GPS location sharing
- Real-time ride requests
- Ride confirmation
- Ride completion

### ⚡ Real-Time System
- Socket-based ride matching
- Nearby driver discovery
- Instant user ↔ captain communication

---

## 🧠 System Architecture

```
    uber-clone/
    ├── backend/ # Express + MongoDB + Socket.IO
    ├── frontend/ # React + Vite + Tailwind
    └── README.md

```


---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- GSAP animations
- Google Maps JavaScript API
- Socket.IO Client

### Backend
- Node.js + Express
- MongoDB + Mongoose
- Socket.IO
- JWT Authentication
- Google Maps APIs (Geocoding, Distance Matrix)

---

## 🔐 Authentication Design

- Access Token (short-lived)
- Refresh Token (HTTP-only cookie)
- Auto session restoration on refresh
- Role-based route protection:
  - User
  - Captain

---

## 📡 Socket.IO Events

### Client → Server
- `join`
- `update-location-captain`
- `confirm-ride`
- `end-ride`

### Server → Client
- `new-ride-request`
- `ride-confirmed`
- `ride-ended`

---

## 🗺 Ride Lifecycle (Flow)

1. User enters pickup & destination
2. Backend calculates fare
3. Nearby captains are discovered
4. Ride request sent via sockets
5. Captain accepts ride
6. User receives confirmation
7. Ride becomes ongoing
8. Ride ends and status updates

---

## 🗺 Maps & Location

- Google Maps integration
- Live GPS tracking
- Distance & time calculation
- Radius-based captain matching

---

## ⚙ Environment Variables

### Backend
```env
PORT=4000
MONGODB_URI=your_mongo_uri
JWT_SECRET=your_secret
JWT_REFRESH_SECRET=your_refresh_secret
GOOGLE_MAPS_API_KEY=your_key
```


## Frontend
```
VITE_BASE_URL=http://localhost:4000
VITE_GOOGLE_MAPS_API_KEY=your_key
```

## 🚀 Getting Started

# Backend

```
cd backend
npm install
npm run dev
```

# Frontend

```
cd frontend
npm install
npm run dev
```


