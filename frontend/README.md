
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


# captain Home Page

<img width="300" height="500" alt="image" src="https://github.com/user-attachments/assets/89410a96-4e79-4409-92a1-d78cca69ea32" />

# user Home Page

<img width="300" height="500" alt="image" src="https://github.com/user-attachments/assets/8e578efa-329f-4faa-94bf-115d959c4c3c" />

# Dynamic Location suggestion
<img width="300" height="500" alt="image" src="https://github.com/user-attachments/assets/553e5e6e-dca3-40b9-960a-ca5e8827d2aa" />

# choose vehicle 
<img width="300" height="500" alt="image" src="https://github.com/user-attachments/assets/c8fd56aa-2daf-4389-aff3-b690ddfdd53f" />

# confirm ride 
<img width="300" height="500" alt="image" src="https://github.com/user-attachments/assets/54a1a53d-fbfa-49e8-90ad-2b733298fc50" />

# Looking for driver 
<img width="300" height="500" alt="image" src="https://github.com/user-attachments/assets/c2f4298f-97e6-4f8c-969a-2eb6de028891" />

# New Ride popup on captain page
<img width="300" height="500" alt="image" src="https://github.com/user-attachments/assets/22cbd7f6-9837-4194-84b3-b408fb998108" />

# otp verification on user and captain page
<img width="300" height="500" alt="image" src="https://github.com/user-attachments/assets/2b0e5ec0-d19a-4a83-8a5e-84d2ae95c5af" />
<img width="300" height="500" alt="image" src="https://github.com/user-attachments/assets/f6a5a774-239d-426c-ba99-4e711fb9e1f2" />

# user riding page 
<img width="300" height="500" alt="image" src="https://github.com/user-attachments/assets/057b5efa-ab01-49be-9bf7-0f9f6d274f22" />

# Captain riding page
<img width="300" height="500" alt="image" src="https://github.com/user-attachments/assets/94e1a2ce-b9c7-44f7-9f45-f3e7e90d0f34" />

# captain finsih ride 
<img width="300" height="500" alt="image" src="https://github.com/user-attachments/assets/8215fae5-373d-48eb-98c2-9ebfbb77c74d" />
