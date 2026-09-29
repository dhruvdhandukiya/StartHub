# StartHub 🚀

A comprehensive full-stack MERN platform bridging the gap between **startups**, **investors**, and **administrators** for startup discovery, fundraising workflows, AI viability analysis, and real-time collaboration.

StartHub brings together an end-to-end ecosystem: extensive startup profiling and discovery, an integrated fundraising lifecycle with Razorpay settlements, AI-driven viability analysis and financial projections powered by Google's Gemini API, real-time messaging and peer-to-peer video calling, subscription-gated event management, and cap-table governance analytics.

---

## 📑 Table of Contents

- [Core Features](#-core-features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Project Directory Structure](#-project-directory-structure)
- [User Roles & Permissions](#-user-roles--permissions)
- [Getting Started](#-getting-started)
- [Environment Configuration](#-environment-configuration)
- [API Route Overview](#-api-route-overview)
- [License](#-license)

---

## 🌟 Core Features

### 🏢 Startup Ecosystem & Profiling
- **Extended Startup Profiles:** Create and manage company stage, pitch summaries, financial metrics, team details, and funding traction.
- **AI Viability Analysis:** Deterministic multi-factor scoring (market opportunity, unit economics, runway, competition, and team strength) combined with 12-month financial projections and Gemini-generated strategic insights.
- **Cap Table & Governance Analytics:** Measure investment concentration using the Herfindahl-Hirschman Index (HHI), track funding history, and visualize equity distribution.
- **AI Idea Generator:** Questionnaire-driven AI brainstorming assistant to explore, refine, and validate new startup concepts.

### 💼 Investor Deal Flow & Portfolio
- **Startup Discovery & Filtering:** Filter and explore startups by domain, funding stage, valuation, and traction metrics.
- **Fundraising Request Management:** Review inbound investment requests with complete lifecycle tracking (`pending` → `approved` / `rejected` → `completed`).
- **Portfolio Analytics:** Real-time analytics on deployed capital, sector allocations, and portfolio company performance.
- **Investor Insights & Blogging:** Publish articles, market analysis, and thought leadership for founders.

### ⚡ Real-Time Collaboration & Tools
- **Instant Messaging:** Direct real-time chat between founders and investors powered by Socket.IO.
- **P2P Video Conferencing:** Integrated WebRTC video calls for pitch sessions and investor meetings.
- **Event Discovery & Booking:** Search, register for, and manage pitch days, demo events, and networking sessions with automated Nodemailer email confirmations.
- **Subscription Management:** Razorpay-powered subscription tiers unlocking premium platform capabilities and event access.

---

## 🛠️ Tech Stack

| Domain | Technology / Library |
|---|---|
| **Frontend** | React 19, Vite, React Router v7, Tailwind CSS v4, Lucide React, Chart.js / react-chartjs-2, GSAP, Three.js |
| **Backend** | Node.js, Express 5, Mongoose 8, Socket.IO, JSON Web Tokens (JWT), BcryptJS, Multer |
| **Database** | MongoDB (Mongoose ODM) |
| **AI Integration** | Google Generative AI (Gemini API) |
| **Payments** | Razorpay SDK (Order creation & HMAC-SHA256 signature verification) |
| **Email Service** | Nodemailer (SMTP) |

---

## 🏛️ System Architecture

StartHub operates across decoupled services:

```
                  ┌─────────────────────────────────────┐
                  │          React 19 Frontend          │
                  │             (Port 5173)             │
                  └──────────┬───────────────┬──────────┘
                             │               │
                     REST / HTTP       Socket.IO (WS)
                             │               │
                             ▼               ▼
                  ┌─────────────────────────────────────┐
                  │         Express 5 REST API          │
                  │           & Socket Server           │
                  │             (Port 5001)             │
                  └───┬─────────────┬─────────────┬─────┘
                      │             │             │
                      ▼             ▼             ▼
               ┌───────────┐ ┌─────────────┐ ┌───────────┐
               │  MongoDB  │ │  Razorpay   │ │  Gemini   │
               │  Cluster  │ │   Gateway   │ │  AI API   │
               └───────────┘ └─────────────┘ └───────────┘
```

| Service | Entry File | Port | Purpose |
|---|---|---|---|
| **Main API & WebSocket Server** | `backend/server.js` | `5001` | Core REST API, authentication, database persistence, and Socket.IO real-time broker |
| **Payment Demo Service** | `backend/pay.js` | `5002` | Standalone payment testing microservice |
| **Frontend Client** | `frontend/` | `5173` | Single-page application built with Vite and React |

---

## 📂 Project Directory Structure

```text
StartHub/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection handler
│   ├── controllers/              # Business logic & request controllers
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT verification & role authorization
│   │   └── upload.js             # Multer storage configuration
│   ├── models/                   # Mongoose schemas (Users, Startups, Funds, Blogs, etc.)
│   ├── routes/                   # Modular Express route definitions
│   ├── services/
│   │   ├── openaiClient.js       # Gemini AI integration service
│   │   └── socketService.js      # Socket.IO connection & event handlers
│   ├── uploads/                  # Static media assets & uploaded images
│   ├── utils/
│   │   └── scorer.js             # Viability analysis & scoring algorithm
│   ├── pay.js                    # Standalone payment handler
│   └── server.js                 # Primary backend server entry point
├── frontend/
│   ├── public/                   # Public static assets
│   ├── src/
│   │   ├── api/                  # Axios & fetch API clients
│   │   ├── components/           # Reusable UI components & modals
│   │   ├── context/              # Auth, Socket, and Subscription contexts
│   │   ├── pages/
│   │   │   ├── admin/            # Admin dashboards, events & analytics
│   │   │   ├── investor/         # Investor deal flow & analytics views
│   │   │   └── startup/          # Startup dashboards, pitch & metrics tools
│   │   ├── App.jsx               # Application routing table
│   │   ├── index.css             # Tailwind CSS entry point
│   │   └── main.jsx              # React DOM initialization
│   ├── index.html                # HTML template with script loaders
│   └── vite.config.js            # Vite configuration
└── README.md
```

---

## 👥 User Roles & Permissions

| Role | Capabilities |
|---|---|
| **`startup`** | Build & update startup profile, run AI viability analysis, submit growth metrics, request funding from investors, book events, chat & video call with investors, inspect governance cap-table. |
| **`investor`** | Browse startup catalog, review & approve/reject fund requests, disburse funds via Razorpay, review investment analytics, publish blogs, chat & call founders. |
| **`admin`** | Create and manage global platform events, publish blogs, review platform analytics, moderate users and submissions. |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or newer) & **npm**
- **MongoDB** instance (Local MongoDB or MongoDB Atlas)
- **API Keys** for Google Gemini, Razorpay, and Gmail SMTP

---

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/dhruvdhandukiya/StartHub.git
   cd StartHub
   ```

2. **Install Backend Dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```

---

### Running Locally

To run the full stack, launch the servers in separate terminal tabs:

**Terminal 1 — Main API Server:**
```bash
cd backend
npm run dev
```
*API runs at `http://localhost:5001`*

**Terminal 2 — Frontend Dev Server:**
```bash
cd frontend
npm run dev
```
*Application runs at `http://localhost:5173`*

*(Optional) Terminal 3 — Payment Demo Service:*
```bash
cd backend
npm run pay
```
*Runs at `http://localhost:5002`*

---

## 🔐 Environment Configuration

### Backend (`backend/.env`)
Create a `.env` file in the `backend/` folder:

```env
PORT=5001
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/starthub
JWT_SECRET=your_jwt_secret_key_here
GEMINI_API_KEY=your_gemini_api_key_here
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
```

### Frontend (`frontend/.env`)
Create a `.env` file in the `frontend/` folder:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

---

## 📡 API Route Overview

| Endpoint Prefix | Description | Access / Auth |
|---|---|---|
| `/api/auth` | User registration, login, profile resolution | Public / Protected (`/me`) |
| `/api/startups` | Startup profile management & discovery | Authenticated |
| `/api/fund-requests` | Funding request lifecycle & approvals | Startup / Investor |
| `/api/governance` | Cap table concentration & HHI analysis | Startup Role Protected |
| `/api/investor-analytics` | Investor portfolio & performance stats | Investor Role Protected |
| `/api/events` | Platform event creation & registrations | Role Specific / Admin |
| `/api/blogs` | Rich media blogs & knowledge articles | Public (Read) / Protected (Write) |
| `/api/chat` | Direct messaging history & metadata | Authenticated |
| `/api/analytics` | Growth metrics & analytics tracking | Authenticated |

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
