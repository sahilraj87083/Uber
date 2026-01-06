Backend API Documentation

This document describes backend endpoints (path, method, auth, request fields, and example response). Paths are relative to the API base: `/api/v1`.

Common notes
- Responses follow two shapes from the codebase:
  - Success: `ApiResponse` — `{ errorCode, message, data, success }` (success when `errorCode < 400`).
  - Error: `ApiError` — `{ statusCode, message, errors, data, success }`.
- Authentication: tokens are provided in a cookie `accessToken` or `Authorization: Bearer <token>` header.

---

`/users/register` Endpoint

Description
Registers a new user by creating a user account with the provided information.

HTTP Method
POST

Endpoint
/users/register

Request Body
JSON with:
- `fullName` (object):
  - `firstName` (string, required): minimum 3 characters
  - `lastName` (string, optional)
- `email` (string, required): valid email
- `password` (string, required): minimum 6 characters
- `contact` (string, optional)

Example Response (success)
- `data.user` (object): user object (without password)
- `data.accessToken` (string): JWT access token

`/users/login` Endpoint

Description
Authenticates a user using their email and password, returning a JWT token upon successful login.

HTTP Method
POST

Endpoint
/users/login

Request Body
- `email` (string, required)
- `password` (string, required)

Example Response (success)
- `data.user` (object)
- `data.accessToken` (string)

`/users/profile` Endpoint

Description
Retrieves the profile information of the currently authenticated user.

HTTP Method
GET

Authentication
Requires `Authorization: Bearer <token>` or cookie `accessToken`.

Example Response
- `data.user` (object)

`/users/logout` Endpoint

Description
Logout the curr**Backend API Reference**

This document lists all backend endpoints implemented in the `Backend/` folder, their request parameters, validation rules, authentication requirements, and example success/error responses.

**General response formats**
- **Success (ApiResponse)**: `{ errorCode, message, data, success }` — `success` is `true` when `errorCode < 400`.
- **Error (ApiError)**: `{ statusCode, message, errors, data, success }` — `success` is `false`.

Auth notes
- Endpoints that require an authenticated user or captain expect an access token either in a cookie (`accessToken`) or in the `Authorization` header as `Bearer <token>`.

---------

**Base paths**
- Users: `POST /api/v1/users/*` and `GET/POST /api/v1/users/*`
- Captains: `POST /api/v1/captain/*` and `GET/POST /api/v1/captain/*`
- Maps: `GET /api/v1/maps/*`
- Rides: `POST /api/v1/ride/*` and `GET /api/v1/ride/*`

---------

**Users** (`/api/v1/users`)

- `POST /register`
  - Validation: `email` (valid email), `fullName.firstName` (min 3 chars), `password` (min 6 chars)
  - Body: `{ fullName: { firstName, lastName? }, email, password, contact? }`
  - Auth: none
  - Success (200): sets `accessToken` and `refreshToken` cookies and returns `{ user, accessToken }` in `data`.
    - Example `data`: `{ user: { _id, fullName, email, contact, ... }, accessToken: "<token>" }`
  - Errors: 400 (validation), 409 (already exists), 500

- `POST /login`
  - Validation: `email`, `password` (min 6)
  - Body: `{ email, password }`
  - Auth: none
  - Success (200): sets cookies and returns `{ user, accessToken }` in `data`.
  - Errors: 400 (validation), 401 (invalid credentials), 404 (user not found)

- `GET /profile`
  - Auth: required — `verifyUser` (cookie or `Authorization: Bearer <token>`)
  - Success (200): `{ user: req.user }` in `data`.

- `POST /logout`
  - Auth: required (`verifyUser`)
  - Clears auth cookies and returns success (200)

- `POST /refresh`
  - Reads `refreshToken` cookie, validates, and issues a new access token cookie and returns `{ user, accessToken }`.
  - Errors: 401 for invalid/missing refresh token

**Captains** (`/api/v1/captain`)

- `POST /register`
  - Validation: `email`, `fullName.firstName` (min 3), `password` (min 6), `vehicle.color`, `vehicle.plate`, `vehicle.capacity` (int >=1), `vehicle.vehicleType` (one of `car`, `motorcycle`, `auto`)
  - Body: `{ fullName, email, password, vehicle: { color, plate, capacity, vehicleType }, contact }`
  - Auth: none
  - Success (200): sets cookies and returns `{ captain, accessToken }`.
  - Errors: 400 validation, 409 exists, 500

- `POST /login`
  - Validation: `email`, `password`
  - Body: `{ email, password }`
  - Success (200): sets cookies and returns `{ captain, accessToken }`.

- `GET /profile`
  - Auth: required — `verifyCaptain`
  - Success (200): `{ captain: req.captain }` in `data`.

- `POST /logout`
  - Auth: required (`verifyCaptain`)
  - Clears cookies and returns success (200)

- `POST /refresh`
  - Uses `refreshToken` cookie to refresh captain access token (similar to users)

**Maps** (`/api/v1/maps`)

- `GET /get-coordinates?address=<address>`
  - Query: `address` (string, min length 3)
  - Auth: `verifyUser` (requires user auth)
  - Success (200): `data: { coordinates }` where `coordinates` is from the maps service (lat/lng)
  - Errors: 400 validation, 404 not found

- `GET /get-distance-time?origin=<origin>&destination=<destination>`
  - Query: `origin`, `destination` (strings, min 3)
  - Auth: `verifyUser`
  - Success (200): `data` contains `distance` and `duration` information (shape provided by Google Maps distance matrix service wrapper in `maps.services.js`).
  - Errors: 400 validation, 500

- `GET /get-suggestions?input=<partial_address>`
  - Query: `input` (min length 3)
  - Auth: `verifyUser`
  - Success (200): `data` is the list of autocomplete suggestions.

**Rides** (`/api/v1/ride`)

- `POST /create`
  - Body: `{ pickup: string, destination: string, vehicleType: 'auto'|'car'|'moto' }`
  - Validation: `pickup` (min 3), `destination` (min 3), `vehicleType` (one of `auto`, `car`, `moto`)
  - Auth: `verifyUser` required
  - Behavior: creates a `Ride` document, responds immediately with ride (OTP cleared in response), then in background finds nearby captains and emits socket messages.
  - Success (200): `data: { ride }` where `ride` contains ride fields (pickup, destination, fare, status, distance, duration, createdAt, user info when aggregated in background)
  - Errors: 400 validation, 500

- `GET /get-fare?pickup=<addr>&destination=<addr>`
  - Query: `pickup`, `destination` (strings)
  - Auth: `verifyUser`
  - Success (200): `data: { fare }`, where `fare` is an object: `{ auto: number, car: number, moto: number }` (calculated from distance/time)
  - Errors: 400 validation, 500

- `POST /confirm-ride`
  - Body: `{ rideId: <mongoId> }`
  - Validation: `rideId` must be a MongoDB ObjectId
  - Auth: `verifyCaptain` required (the captain confirms the ride)
  - Behavior: `confirmRideService` sets ride `status: 'accepted'`, associates captain, and returns aggregated ride data including `user` and `captain` sub-documents (projected fields)
  - Success (200): `data: { ride }` — `ride` includes `pickup`, `destination`, `fare`, `status`, `otp`, `distance`, `duration`, `createdAt`, `user`, `captain` (with `socketId`, `vehicle`, etc.)
  - Errors: 400 validation, 401 unauthorized (if token missing/invalid), 404 ride not found, 500

- `POST /start-ride` and `POST /end-ride` (stubs)
  - Controllers exist (`startRide`, `endRide`) but are currently empty in `ride.controller.js` — refer to `rides.services.js` for expected service implementations `startRideService` and `endRideService`.

---------

Example success response (ApiResponse):
```
{
  "errorCode": 200,
  "message": "Ride confirmed successfully",
  "data": {
    "ride": {
      "_id": "642...",
      "pickup": "...",
      "destination": "...",
      "fare": 120,
      "status": "accepted",
      "otp": "123456",
      "distance": {...},
      "duration": {...},
      "createdAt": "2026-01-07T...",
      "user": { "fullName": {...}, "contact": "...", "socketId": "..." },
      "captain": { "fullName": {...}, "vehicle": {...}, "socketId": "..." }
    }
  },
  "success": true
}
```

Example error response (ApiError):
```
{
  "statusCode": 401,
  "message": "Unauthorized request",
  "errors": [],
  "data": null,
  "success": false
}
```
ent user and clear auth cookies.

HTTP Method
POST

Authentication
Requires a valid JWT token (header or cookie).

Example Response
- success message (ApiResponse)

`/users/refresh` Endpoint

Description
Refreshes access token using the `refreshToken` cookie.

HTTP Method
POST

Authentication
Requires `refreshToken` cookie.

Example Response
- `data.accessToken` and `data.user`

---

`/captain/register` Endpoint

Description
Registers a new captain account.

HTTP Method
POST

Endpoint
/captain/register

Request Body
- `fullName` (object): `firstName` (string, required, min 3), `lastName` (optional)
- `email` (string, required)
- `password` (string, required, min 6)
- `vehicle` (object):
  - `color` (string, required, min 3)
  - `plate` (string, required, min 3)
  - `capacity` (number, required, min 1)
  - `vehicleType` (string, required): one of `car`, `motorcycle`, `auto`
- `contact` (string, optional)

Example Response (success)
- `data.captain` (object)
- `data.accessToken` (string)

`/captain/login` Endpoint

Description
Authenticates a captain and returns access token.

HTTP Method
POST

Endpoint
/captain/login

Request Body
- `email`, `password`

Example Response (success)
- `data.captain` and `data.accessToken`

`/captain/profile` Endpoint

Description
Retrieves profile of authenticated captain.

HTTP Method
GET

Authentication
Requires `Authorization: Bearer <token>` or cookie `accessToken`.

Example Response
- `data.captain`

`/captain/logout` Endpoint

Description
Logs out the captain and clears cookies.

HTTP Method
POST

Authentication
Requires a valid token.

Example Response
- success message

`/captain/refresh` Endpoint

Description
Refreshes captain access token via `refreshToken` cookie.

HTTP Method
POST

Example Response
- `data.accessToken` and `data.captain`

---

`/maps/get-coordinates` Endpoint

Description
Retrieves lat/lng for an address.

HTTP Method
GET

Endpoint
/maps/get-coordinates?address=<address>

Request Parameters
- `address` (string, required, min 3)

Authentication
Requires user auth (`verifyUser`).

Example Response (success)
```
{ "ltd": 37.4224764, "lng": -122.0842499 }
```

Errors
- 400 when validation fails
- 404 when coordinates not found

`/maps/get-distance-time` Endpoint

Description
Retrieves distance and estimated travel time between two locations.

HTTP Method
GET

Endpoint
/maps/get-distance-time?origin=<origin>&destination=<destination>

Request Parameters
- `origin` (string, required)
- `destination` (string, required)

Authentication
Requires user auth.

Example Response
```
{
  "distance": { "text": "2,789 miles", "value": 4486540 },
  "duration": { "text": "1 day 18 hours", "value": 154800 }
}
```

`/maps/get-suggestions` Endpoint

Description
Returns autocomplete suggestions for an input string.

HTTP Method
GET

Endpoint
/maps/get-suggestions?input=<partial_address>

Request Parameters
- `input` (string, required, min 3)

Authentication
Requires user auth.

Example Response
```
[
  "1600 Amphitheatre Parkway, Mountain View, CA, USA",
  "1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA"
]
```

---

`/ride/create` Endpoint

Description
Creates a new ride request for the authenticated user.

HTTP Method
POST

Endpoint
/ride/create

Request Body
- `pickup` (string, required, min 3)
- `destination` (string, required, min 3)
- `vehicleType` (string, required): `auto`, `car`, or `moto`

Authentication
Requires user auth (`verifyUser`).

Example Response (success)
- `data.ride` contains ride fields: `user`, `pickup`, `destination`, `fare`, `status`, `otp` (cleared in immediate response), `distance`, `duration`, `createdAt`

Errors
- 400 validation, 500 internal error

`/ride/get-fare` Endpoint

Description
Returns fare estimate for the given pickup and destination.

HTTP Method
GET

Endpoint
/ride/get-fare?pickup=<addr>&destination=<addr>

Request Parameters
- `pickup`, `destination` (required)

Authentication
Requires user auth.

Example Response
```
{ "auto": 50, "car": 75, "moto": 40 }
```

`/ride/confirm-ride` Endpoint

Description
Captain accepts/confirm a ride. Sets `status: 'accepted'` and associates the captain.

HTTP Method
POST

Endpoint
/ride/confirm-ride

Request Body
- `rideId` (string, required): MongoDB ObjectId

Authentication
Requires captain auth (`verifyCaptain`).

Example Response (success)
- `data.ride` with aggregated `user` and `captain` sub-documents and projected fields.

Errors
- 400 validation, 401 unauthorized, 404 ride not found, 500

`/ride/start-ride` and `/ride/end-ride`

Note
Controllers exist but currently empty. Service functions `startRideService` and `endRideService` show expected behavior in `Backend/services/rides.services.js`.

---

Example error response shape
```
{
  "statusCode": 401,
  "message": "Unauthorized request",
  "errors": [],
  "data": null,
  "success": false
}
```

Generated from the code in `Backend/` — update this file when routes or controllers change.
