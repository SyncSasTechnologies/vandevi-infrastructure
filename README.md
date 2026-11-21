# Vandevi Infrastructure — Luxury Architecture & Spatial Design

A full-stack, enterprise-grade MERN monorepo for **Vandevi Infrastructure Pvt. Ltd.**, featuring a bespoke architectural public showcase, a production lead generation engine, and a secure internal administrative workspace with a one-time Super Admin setup wizard.

---

## Architecture Overview

```
vandevi-infrastructure/
├── client/                     # React 19 + Vite + Tailwind CSS v4 + TypeScript
│   ├── src/
│   │   ├── features/           # Modular domain slices (auth, leads, projects, services, about, home)
│   │   ├── pages/              # Route views (public pages & /admin portal)
│   │   └── shared/             # Reusable UI primitives, layout wrappers, API client
│   └── .env.example            # Frontend environment template
│
├── server/                     # Node.js + Express 5 + TypeScript + MongoDB (Mongoose)
│   ├── src/
│   │   ├── modules/            # Domain modules (admin, leads, projects, media)
│   │   ├── shared/             # Middleware (authGuard, rateLimiter), utility services
│   │   └── config/             # Database & environment configurations
│   └── .env.example            # Backend environment template
│
└── package.json                # Monorepo orchestration scripts (npm workspaces)
```

---

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, React Router 7, React Hook Form, Zod, Lucide Icons, Axios.
- **Backend**: Node.js, Express 5, TypeScript, MongoDB & Mongoose, Firebase Admin SDK, Multer, Sharp, Nodemailer, Compression, Helmet.
- **Authentication**: Firebase Authentication (Client SDK on frontend, Firebase Admin SDK token verification on backend).
- **Database**: MongoDB (Local or MongoDB Atlas).

---

## Prerequisites

Ensure the following tools are installed on your local machine:

1. **Node.js**: `v18.0.0` or higher (LTS recommended) -> [Download Node.js](https://nodejs.org/)
2. **npm**: `v9.0.0` or higher (included with Node.js)
3. **Git**: [Download Git](https://git-scm.com/)
4. **MongoDB**:
   - **Option A (Local)**: [MongoDB Community Server](https://www.mongodb.com/try/download/community) running on port `27017`.
   - **Option B (Cloud)**: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) connection URI.
5. **Firebase Project**:
   - A free Firebase project with **Email/Password** authentication enabled in the Firebase Console.

---

## Quickstart: Running Locally After Cloning

### Step 1: Clone the Repository

```bash
git clone https://github.com/<your-username>/vandevi-infrastructure.git
cd vandevi-infrastructure
```

---

### Step 2: Install Monorepo Dependencies

Install dependencies for both `client` and `server` in a single command from the root directory:

```bash
npm install
```

---

### Step 3: Configure Environment Variables

#### 3.1 Backend Environment (`server/.env`)
Copy the server template file:
```bash
cp server/.env.example server/.env
```
*(On Windows PowerShell: `Copy-Item server/.env.example server/.env`)*

Open `server/.env` and update the values:
```env
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:5173
MONGODB_URI=mongodb://127.0.0.1:27017/vandevi_infrastructure

# Firebase Admin Credentials (from Firebase Console > Project Settings > Service Accounts > Generate new private key)
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYourPrivateKeyHere\n-----END PRIVATE KEY-----\n"

# SMTP Settings for Lead Notifications (Optional in local dev)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=inquiries@yourdomain.com
SMTP_PASS=your-app-specific-password
ADMIN_ALERT_EMAIL=leads@yourdomain.com
```

#### 3.2 Frontend Environment (`client/.env`)
Copy the client template file:
```bash
cp client/.env.example client/.env
```
*(On Windows PowerShell: `Copy-Item client/.env.example client/.env`)*

Open `client/.env` and update with your Firebase Web App configuration (from Firebase Console > Project Settings > General > Your Apps):
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_STATIC_UPLOADS_URL=http://localhost:5000/uploads

# Firebase Client Web App Credentials
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

### Step 4: Start MongoDB

- **If using local MongoDB Service (Windows/macOS/Linux)**: Ensure the MongoDB service is running on port `27017`:
  ```bash
  # Windows (via mongod)
  mongod --dbpath <path-to-data-dir> --port 27017
  
  # macOS/Linux (via systemctl or brew)
  brew services start mongodb-community
  ```
- **If using MongoDB Atlas**: Provide your cloud connection string in `server/.env` under `MONGODB_URI`.

---

### Step 5: Start Development Servers

Run both the Express backend and Vite frontend concurrently with one command from the project root:

```bash
npm run dev
```

- **Frontend Client**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000/api`
- **Static Media Uploads**: `http://localhost:5000/uploads`

---

### Step 6: Initial One-Time Super Admin Provisioning

1. Open your browser and navigate to:
   ```
   http://localhost:5173/admin/login
   ```
2. Because no administrator exists initially in the database, the portal automatically presents the **One-Time Master Administrator Setup Wizard**.
3. Fill in the master details:
   - **Full Name**
   - **Official Admin Email**
   - **Master Password** (min 8 characters, uppercase, lowercase, number)
   - **Confirm Master Password**
4. Click **Initialize Portal & Sign In**.
5. The setup wizard provisions the master user in Firebase Authentication, grants custom claims (`superadmin`), creates the database record in MongoDB, and **permanently locks the setup endpoint**.
6. You will be automatically redirected to the **Admin Dashboard** (`/admin`).

---

## Production Build & Deployment

To compile TypeScript and bundle assets for production:

```bash
# 1. Build both server and client
npm run build

# 2. Run the production server
npm start
```

---

## Security & Architectural Policies

- **Single Super Admin Policy**: By design, only one root Super Admin account is permitted. All secondary registration routes are disabled.
- **Zero Mock Credentials**: Production security verified with real Firebase token decoding and database session checks.
- **Rate Limiting**: Tiered rate limiters protect public inquiries (10 req/hour) and administrative mutations (100 req/15 min).
- **No Secrets in Git**: `.env`, `node_modules`, `dist/`, and database binaries are strictly ignored by `.gitignore`.

---

## License

Private and proprietary. Developed for **Vandevi Infrastructure Pvt. Ltd.**
