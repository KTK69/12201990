# 🚀 URL Shortener – React + Middleware Logging

This project is part of a campus evaluation challenge. It demonstrates a **URL shortener frontend built in React**, styled with **Material UI**, and integrated with a **custom logging middleware** to track lifecycle events.

> 🔒 No user login required. All shortened URLs are managed and persisted client-side.

---

## 📁 Project Structure

```
12201990/
├── frontend/              # Main React app
│   └── src/
│       ├── pages/         # Home, Stats, Redirector
│       ├── logging-middleware/  # Logging utility
│       ├── App.js
│       └── index.js
├── README.md              # You're here
```

---

## 🛠️ Tech Stack

- **Frontend**: React.js (via Create React App)
- **Styling**: Material UI (MUI)
- **Routing**: React Router DOM
- **Logging**: Custom Logging Middleware
- **Persistence**: Client-side `localStorage`

---

## ▶️ How to Run

1. Navigate into the `frontend/` folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local server:
   ```bash
   npm start
   ```

4. App will open on [http://localhost:3000](http://localhost:3000)

---

## 🔗 App Features

### ✅ URL Shortener (Main Page)

- Shorten up to 5 URLs at once
- Optional: set custom shortcode and expiry time (in minutes)
- Defaults to 30 mins if validity not specified
- Displays generated links with expiry info

### 📊 Statistics Page

- View all shortened URLs (from current session)
- Displays creation and expiration timestamps
- Tracks click count and click details

### 🔁 Redirection Logic

- Visiting a short link (e.g., `/abc12`) redirects to the long URL
- Expired links show a proper message
- Each redirect logs:
  - Timestamp
  - Referrer
  - (Mock) Geolocation

---

## 🧾 Logging Middleware

A reusable `log(stack, level, package, message)` function is used across the frontend.

**API Used**:  
`http://20.244.56.144/evaluation-service/logs`

**Example Call**:
```js
log("frontend", "info", "page", "Shortened URL for https://google.com");
```

All logs follow the required schema and constraints, using correct `stack`, `level`, and `package` identifiers.

---

## 📦 Assumptions

- No backend used: all data is stored in `localStorage`
- No user login required
- Geolocation data is mocked as "Unknown"
- Valid URL must begin with `http://` or `https://`
- Shortcode uniqueness managed locally

---
