(# Frontend README)

This folder contains the frontend application (Vite + React) for the Uber-like project. The app provides the user and captain UI, connects to the backend via REST and to the realtime server via Socket.IO.

## Quick Start

- Install dependencies:

	```bash
	cd frontend
	npm install
	```

- Run development server:

	```bash
	npm run dev
	```

- Build for production:

	```bash
	npm run build
	```

- Preview production build locally:

	```bash
	npm run preview
	```

Notes
- The dev server runs on Vite default port (usually `5173`). The frontend expects the backend base URL in `VITE_BASE_URL` (see `frontend/.env`).

## Environment

- Example `frontend/.env`:

	```env
	VITE_BASE_URL = http://localhost:4000
	```

- `VITE_BASE_URL` is used by the app for REST and Socket.IO connections (see `src/contexts/SocketContext.jsx` and API calls across pages).

## Project Structure (key files)

- `index.html` — App entry HTML
- `src/main.jsx` — React entry file; mounts React app and providers
- `src/App.jsx` — Top-level app; sets up routes and auth bootstrapping

Components
- `src/components/ConfirmRide.jsx` — UI to confirm ride on user side
- `src/components/ConfirmRidePopUp.jsx` — Captain-side confirmation popup
- `src/components/RidePopUp.jsx` — Incoming ride popup for captains
- `src/components/LiveTracking.jsx` — (if present) live location UI for rides
- `src/components/LocationSearchPanel.jsx` — Address input & suggestions
- `src/components/VehiclePanel.jsx` — Vehicle selection UI

Pages
- `src/pages/Home.jsx` — Main user flow (request ride, get fare, confirm)
- `src/pages/CaptainHome.jsx` — Captain dashboard (receives ride requests via socket)
- `src/pages/UserLogin.jsx`, `UserSignup.jsx` — User auth pages
- `src/pages/CaptainLogin.jsx`, `CaptainSignup.jsx` — Captain auth pages
- `src/pages/Riding.jsx`, `CaptainRiding.jsx` — Ride active pages

Contexts
- `src/contexts/UserContext.jsx` — User auth & profile state
- `src/contexts/CaptainContext.jsx` — Captain auth & profile state
- `src/contexts/SocketContext.jsx` — Socket.IO connection provider

Routing
- Routes are declared under `src/routes/` with separate protected/ public route sets:
	- `userProtectedRoutes` and `captainProtectedRoutes` use context auth to protect pages.

API usage
- The frontend uses `axios` for API calls. Base URL comes from `import.meta.env.VITE_BASE_URL`.
- Example call locations: `src/pages/Home.jsx` (create ride & get-fare), `src/pages/CaptainHome.jsx` (confirm-ride).

Realtime (Socket.IO)
- `SocketContext.jsx` initializes socket with `io(VITE_BASE_URL)` and exposes `socket` to components.
- Captains and users `emit('join', { userId, userType })` on mount to join their socket rooms.

Debugging tips
- If API calls fail, confirm `VITE_BASE_URL` is correct and the backend is running.
- For CORS or authorization issues, check browser DevTools Network tab and server logs.
- To test endpoints directly, use the curl examples in `../Backend/README.md`.

Development utilities
- Lint / format: check `package.json` scripts (may include `lint` / `format`).
- Hot reload: Vite will live-reload while running `npm run dev`.

How to get a test access token
- Use the login endpoints in the backend (see `../Backend/README.md`) to obtain an `accessToken` value. The frontend stores the token in context after login and sends it as `Authorization: Bearer <token>` in requests.

Contributing
- Follow the existing coding style (React + JSX). Keep components small and reuse `contexts` for cross-cutting state.
