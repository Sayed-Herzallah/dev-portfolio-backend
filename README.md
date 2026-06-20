# 💻 Developer Portfolio Backend API

A Node.js & Express.js server backend designed to power developer portfolios, managing contact form emails and API endpoints.

---

## 📌 System Overview
This backend provides secure endpoints for developer portfolio sites. It handles contact forms, integrates with email transport systems, serves projects list data, and supports serverless hosting setups like Vercel.

---

## ⚙️ Tech Stack

| Technology | Purpose |
| ---------- | ------- |
| Node.js    | JS Runtime environment |
| Express.js | Backend API router and middleware server |
| Nodemailer | Secure email dispatch service |
| Cors       | Cross-Origin resource sharing control |
| Vercel     | Serverless deployment routing configurations |

---

## 🚀 Core Features
* ✉️ **Secure Mail System:** Forwards submissions from the contact form directly to your email inbox.
* 🛡️ **CORS Protection:** Limits client-side access to authorized domains only.
* ☁️ **Vercel Deployable:** Includes a preconfigured `vercel.json` for serverless function mappings.
* 📂 **Modular Structure:** Keeps controllers separate from route definitions for clean extension.

---

## 🏗️ Directory Structure
```
├── src/                 # Primary source code
│   └── routes/          # API route definitions
├── app.controller.js    # Route business logic handlers
├── index.js             # Server initialization entrypoint
├── vercel.json          # Vercel serverless configurations
├── package.json         # Project manifests and dependencies
└── .gitignore           # Ignored system folders and keys
```

---

## ⚙️ Setup & Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Sayed-Herzallah/dev-portfolio-backend.git
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables (create `.env` file):
   ```env
   PORT=5000
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password
   ```
4. Run server locally:
   ```bash
   npm run dev
   ```

---

## 👨‍💻 Author
**Sayed Herzallah**  
Full Stack Developer
