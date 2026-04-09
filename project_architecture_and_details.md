# Kagal Bykes Showroom Website - Architecture & Details

This document comprehensively outlines the architecture, technology stack, component integration, and data flow of the **Kagal Bykes Showroom Website**. It is structured to help you confidently explain your project in an interview setting.

---

## 1. High-Level Architecture
The project follows a modern, decoupled **Client-Serverless** architecture. While it originally started with a standard PERN/MERN stack (React + Express + MongoDB/PostgreSQL), it has been actively **migrated to Supabase (Backend-as-a-Service)**. 

### Architecture Flow:
- **Frontend Layer:** Built with React 19 and Vite. It handles all UI rendering, routing, and global state.
- **Backend / Database Layer (Supabase):** The frontend directly communicates with Supabase for:
  - **Authentication:** Email/Password login, Sign-ups, and Admin Role verification.
  - **Database (PostgreSQL):** Tables for `bikes`, `user_activity`, `appointments`, `profiles`, `reviews`, `test_rides`, and `site_config`.
  - **Storage:** Handling image uploads (e.g., bike images).
- **AI Microservice:** A separate LangGraph Python backend running on `localhost:8000` powers the [ChatWidget.jsx](file:///a:/Showroom%20Website/frontend/src/components/ChatWidget.jsx).

---

## 2. Technology Stack

### Frontend Stack (Client-Side)
- **Core:** `React 19.2` and `Vite` (Build Tool).
- **Styling:** `Tailwind CSS 3.4` (Utility-first CSS framework for rapid and responsive UI development).
- **Routing:** `react-router-dom v6` (Client-side routing for seamless navigation without page reloads).
- **State Management:** React Context API (custom contexts for Auth, Bikes, and Dark Mode).
- **Animations & 3D:** 
  - `framer-motion` (Declarative animations, page transitions, and micro-interactions).
  - `@react-three/fiber` & `@react-three/drei` (For rendering 3D bike models on the web).
- **Internationalization (i18n):** `i18next` and `react-i18next` (Supports English, Marathi, and Hindi translations).
- **UI Components:** `react-icons` (Iconography) and `swiper` (For immersive image and testimony carousels).

### Backend & Database Stack
- **Primary Backend (BaaS):** `Supabase` (@supabase/supabase-js). Replaces the need to maintain a custom Node.js server for standard CRUD operations.
- **Database:** PostgreSQL (Hosted inside Supabase).
- **AI Backend:** A custom python server (LangGraph/FastAPI) running on `http://localhost:8000/chat`.
- **Legacy/Deprecated Backend:** Node.js/Express server in the `/backend` folder. Used for initial setup with bcrypt, JWT, and CORS but is currently marked as *migrated to Supabase*.

---

## 3. Component Integration & State Management

### How Components Are Integrated
The app uses a modular **Component-Based Architecture**.
1. **Layout Components:** `Navbar.jsx`, `Sidebar.jsx`, `BottomNav.jsx`, and `Footer.jsx` wrap around the main `<Routes>` in `App.jsx`. This ensures a persistent layout across page changes.
2. **Page Components:** Different views are organized in `src/pages/` (e.g., `Home.jsx`, `Bikes.jsx`, `Admin.jsx`). Pages compose smaller reusable components from the `src/components/` folder (like `HeroSlider.jsx`, `AppointmentForm.jsx`).
3. **Prop Drilling vs Context:** To avoid deeply passing props (prop-drilling), global data is lifted to the **React Context API**.

### Global State Details
The global state wraps the entire application in `App.jsx`:
- **`AuthProvider` (`AuthContext.jsx`):** Listens to Supabase Auth State changes. It securely manages `user` object, `isAdmin` boolean (strictly checking the admin email: *savitashete85@gmail.com*), and provides global `signIn`, `signUp`, and `signOut` functions.
- **`BikesProvider` (`BikesContext.jsx`):** Fetches all available bikes from Supabase PostgreSQL database once and shares them across pages (like `Bikes.jsx` and `BikeDetails.jsx`), minimizing redundant network requests.
- **`DarkModeProvider`:** Toggle standard UI and dark mode themes.

---

## 4. API Calls & Network Requests

If asked **"How many APIs does the app call?"**, clarify the difference between generic HTTP calls and SDK calls.

### A. Custom HTTPS/REST API Calls
You only have **ONE** direct external REST API call using the browser's native `fetch` API:
1. **AI Chatbot Connection:** `ChatWidget.jsx` makes a `POST` request to `http://localhost:8000/chat` sending user messages and receiving AI responses powered by LangGraph.

### B. Supabase SDK Data Fetching (Database Calls)
Instead of custom Node.js REST endpoints, you used the Supabase JS client (`supabase.from(...)`) heavily. It acts as an ORM making GraphQL/PostgREST API calls under the hood over secure HTTPS.
Key interactions include:
- **Authentication:** `supabase.auth.getSession()`, `signInWithPassword()`, `signUp()`, `signOut()`.
- **Bikes Data:** `supabase.from('bikes').select('*')` (inside `BikesContext`).
- **Site Analytics:** `supabase.from('user_activity').insert({...})` (tracking visits in `App.jsx`, signups, and logins).
- **Forms & Appointments:** `supabase.from('appointments').insert()` and `test_rides.insert()`.
- **Admin Dashboard:** Bulk fetches for analytics, users, and config in `Admin.jsx`.
- **Storage/Images:** `supabase.storage.from('images').upload()` and `.getPublicUrl()` in the Admin panel.

---

## 5. File Structure and Import Strategies

### Import System
The app uses modern **ES Modules (ESM)** syntax (`import/export`).
- Libraries are imported via named or default imports from `node_modules`.
- Environment variables are securely handled via Vite's `import.meta.env.VITE_SUPABASE_URL` to prevent leaking secret keys to the browser.
- Centralized instances: The Supabase client is initialized once in `src/lib/supabase.js` and exported. Every component that needs database access simply imports this active instance (`import { supabase } from '../lib/supabase'`).

### Folder Structure
```text
Showroom Website/
├── frontend/
│   ├── src/
│   │   ├── assets/       # Static images, 3d models
│   │   ├── components/   # Reusable UI parts (Navbar, Sliders, Forms)
│   │   ├── context/      # Global state providers (Auth, Bikes)
│   │   ├── lib/          # Core utilities (supabase.js client setup)
│   │   ├── pages/        # Route components (Home, Admin, Explore)
│   │   ├── App.jsx       # Root component & Routing configuration
│   │   └── main.jsx      # React DOM rendering entry point
│   ├── tailwind.config.js
│   └── package.json
└── backend/              # Legacy Node.js backend (Migrating to Supabase)
```

---

## 6. Interview Talking Points & Highlights

When explaining this project in an interview, focus on these strong engineering decisions you made:

1. **"I migrated from a custom Node.js/Express backend to Supabase Serverless Architecture."**
   - *Why?* To reduce server maintenance overhead, improve security, and heavily speed up frontend development time by leveraging built-in Auth, Storage, and PostgreSQL APIs.
2. **"I implemented robust Global State Management using React Context API."**
   - *Why?* To prevent prop drilling. Auth Context efficiently handles the lifecycle of user sessions dynamically, automatically granting Admin rights dynamically instead of rigid hardcoding.
3. **"I integrated an AI-powered conversational Assistant using LangGraph."**
   - *Why?* To elevate user experience by answering complex showroom queries faster than traditional UI browsing.
4. **"I built a scalable and fully responsive UI."**
   - *Why?* By combining React 19, Tailwind CSS, and Framer Motion, the application remains performant and visually stunning across mobile and desktop devices.
5. **"I engineered an all-in-one Admin CMS Dashboard."**
   - *Why?* Instead of hardcoding bike prices and offers on the frontend code, the admin panel allows the showroom manager to perform full CRUD operations directly on the PostgreSQL database from a secure UI.
