# StartHub 🚀

**StartHub** is a full-stack platform bridging the gap between startups, investors, and administrators. It empowers entrepreneurs to showcase their ideas, analyze metrics, access government schemes, pitch to investors, connect via real-time messaging and video calls, and access AI-driven idea generation tools.

---

## 🌟 Key Features

### 🏢 For Startups
- **Startup Dashboard & Analytics:** Track startup health, growth metrics, and portfolio performance.
- **AI Idea Generator & Evaluator:** Leverage AI to brainstorm, evaluate, and refine business concepts.
- **Browse Investors & Pitching:** Search through verified investor profiles and submit funding requests.
- **Event Discovery:** Browse, register for, and manage attendance at startup and pitch events.
- **Government Schemes & Resources:** Curated listings of startup schemes, grants, and guides.

### 💼 For Investors
- **Investor Dashboard:** Overview of connected startups, investment opportunities, and deal flow.
- **Browse Startups:** Filter startups by sector, traction, and funding requirements.
- **Fund Request Management:** Review and respond to inbound funding requests directly.
- **Investor Blogs & Insights:** Publish and share domain knowledge, insights, and market analysis.

### 🛠️ Real-Time Communication & Collaboration
- **Direct Messaging & Chat:** Powered by Socket.IO for real-time discussions between founders and investors.
- **Peer-to-Peer Video Calling:** WebRTC / PeerJS integrated video calling for virtual pitch meetings.

### 🛡️ Admin Portal
- Comprehensive oversight across user management, events creation, blogs, and platform analytics.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS 4
- **Real-Time:** Socket.IO Client, PeerJS (WebRTC)
- **Data Visualization:** Chart.js & React-ChartJS-2
- **Icons & UI:** Lucide React, GSAP, Three.js
- **Routing:** React Router v7

### Backend
- **Runtime:** Node.js & Express 5
- **Database:** MongoDB & Mongoose
- **Authentication:** JWT (JSON Web Tokens) & BcryptJS
- **Real-Time:** Socket.IO & Peer Server
- **AI Integration:** Google Gemini API / Generative AI
- **Payment Gateway:** Razorpay SDK
- **File Uploads:** Multer

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB instance (local or Atlas)

### 1. Clone the Repository
```bash
git clone https://github.com/dhruvdhandukiya/StartHub.git
cd StartHub
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:
```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
In a new terminal:
```bash
cd frontend
npm install
npm run dev
```

The application will be running locally at `http://localhost:5173`.

---

## 📄 License
This project is licensed under the MIT License.
