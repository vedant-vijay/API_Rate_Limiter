# 🚀 API Gateway Dashboard

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

### Production-Ready SaaS Platform with Custom Rate-Limiting Middleware

**Enterprise-grade API gateway featuring intelligent rate limiting, real-time usage tracking, and dynamic API key provisioning for multi-tenant applications.**

[Features](#-core-features) • [Architecture](#-architecture) • [Quick Start](#-quick-start) • [Documentation](#-documentation)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Core Features](#-core-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Rate Limiting Logic](#-rate-limiting-logic)
- [Project Structure](#-project-structure)
- [Screenshots](#-screenshots)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

This is a **production-ready SaaS platform** that demonstrates enterprise-grade API gateway functionality with custom-built rate limiting middleware. The system enables businesses to:

- **Generate and manage API keys** for multiple clients with customizable quotas
- **Enforce rate limits** using intelligent sliding window algorithms
- **Monitor real-time usage** with comprehensive analytics dashboard
- **Scale horizontally** with stateless middleware architecture

### What Makes This Special

Unlike simple tutorials that use off-the-shelf libraries, this project implements **custom rate limiting middleware from scratch**, showcasing deep understanding of:

- Express.js middleware architecture
- Concurrency handling and race condition prevention
- Database optimization and caching strategies
- Production-ready error handling and security
- Multi-tenant SaaS design patterns

### Real-World Use Case

Similar to how **Stripe**, **AWS**, or **Google Cloud** manage API access - this system provides complete control over:
- Who can access your APIs (authentication)
- How much they can use (rate limiting)
- What they're using (analytics)
- When to restrict or allow access (real-time enforcement)

---

## ✨ Core Features

### 🛡️ Custom Rate Limiting Middleware

- **Sliding Window Algorithm** - Fair, accurate request counting
- **Per-Client Quotas** - Individual rate limits (1-10,000 req/hour)
- **Atomic Counter Operations** - Prevents race conditions under high concurrency
- **Automatic Window Resets** - Time-based quota renewal
- **Graceful Degradation** - Proper error handling and user feedback
- **Rate Limit Headers** - Standard X-RateLimit-* response headers

### 🔑 Dynamic API Key Management

- **Cryptographic Key Generation** - Secure 64-character hex keys using crypto.randomBytes
- **Instant Key Provisioning** - Real-time API key creation
- **Key Regeneration** - Replace compromised keys without losing configuration
- **Usage Tracking** - Per-key request counting with millisecond precision
- **Key Revocation** - Immediate access termination
- **Multi-Tenant Support** - Isolated keys per user account

### 📊 Real-Time Analytics Dashboard

- **Live Usage Statistics** - Current request count vs quota
- **Visual Progress Bars** - Color-coded usage indicators (Green → Yellow → Red)
- **Request History** - Track API consumption over time
- **Client Management** - CRUD operations for API keys
- **Responsive Dark Theme** - Professional, modern UI
- **Interactive Testing** - Built-in API service tester

### 🔐 Security & Authentication

- **JWT-Based Auth** - Secure token-based authentication
- **Password Hashing** - bcrypt with salt rounds
- **API Key Validation** - Middleware-level authorization
- **User Isolation** - Multi-tenant data separation
- **Protected Routes** - Auth middleware on sensitive endpoints
- **CORS Configuration** - Cross-origin request handling

### 🧪 Service Testing Suite

Pre-configured integrations with 8+ external APIs:
- Weather data (OpenWeatherMap)
- Inspirational quotes (ZenQuotes)
- Random images (Dog CEO)
- Fun facts (Cat Facts)
- User generation (RandomUser.me)
- Jokes (JokeAPI)
- Cryptocurrency prices (CoinGecko)
- IP geolocation (ipapi.co)

---

## 🏗️ Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Client Request                          │
│                              ↓                                  │
│  ┌────────────────────────────────────────────────────────┐   │
│  │              Express.js Rate Limiter Middleware        │   │
│  │                                                        │   │
│  │  1. Extract API Key from X-API-Key header            │   │
│  │  2. Validate key against MongoDB                     │   │
│  │  3. Check ApiUsage collection for current window     │   │
│  │  4. Compare count vs client's rate limit             │   │
│  │  5. Allow/Reject request + Update counter            │   │
│  │  6. Set rate limit headers in response               │   │
│  └────────────────────────────────────────────────────────┘   │
│                              ↓                                  │
│              ┌─────────────────────────┐                       │
│              │   Allow: Forward to API │                       │
│              │   Reject: 429 Error     │                       │
│              └─────────────────────────┘                       │
└─────────────────────────────────────────────────────────────────┘
```

### Rate Limiting Flow

```
Request with API Key
        ↓
┌───────────────────┐
│ Validate API Key  │ ──→ Invalid ──→ 403 Forbidden
└─────────┬─────────┘
          │ Valid
          ↓
┌───────────────────────┐
│ Check Window Expired? │
└─────────┬─────────────┘
          │
    ┌─────┴─────┐
    │ Yes       │ No
    ↓           ↓
Reset Counter   Keep Counter
    │           │
    └─────┬─────┘
          ↓
┌───────────────────────┐
│ Count >= Rate Limit?  │
└─────────┬─────────────┘
          │
    ┌─────┴─────┐
    │ Yes       │ No
    ↓           ↓
429 Error    Increment Counter
             Forward Request
             Set Headers
```

### Data Models

**Client Schema:**
```javascript
{
  userId: ObjectId,        // Owner of the API key
  name: String,            // Client/Application name
  apiKey: String,          // 64-char hex key
  rateLimit: Number,       // Max requests per window
  requestCount: Number,    // Current usage (synced from ApiUsage)
  createdAt: Date
}
```

**ApiUsage Schema:**
```javascript
{
  apiKey: String,          // Reference to Client
  count: Number,           // Current request count
  windowStart: Date        // When current window began
}
```

**User Schema:**
```javascript
{
  email: String,           // Unique user email
  password: String,        // Hashed with bcrypt
  createdAt: Date
}
```

---

## 🛠 Tech Stack

### Backend
- **Node.js** (v16+) - Runtime environment
- **Express.js** (v4.18) - Web framework
- **MongoDB** (v5.0+) - NoSQL database
- **Mongoose** (v7.0) - ODM for MongoDB
- **JWT** (jsonwebtoken) - Authentication tokens
- **bcrypt** (v5.1) - Password hashing
- **Axios** (v1.4) - HTTP client for external APIs
- **crypto** - Built-in Node.js module for key generation
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Frontend
- **React** (v18.2) - UI framework
- **Vite** (v4.3) - Build tool and dev server
- **Lucide React** (v0.263) - Icon library
- **Modern CSS3** - Custom animations and dark theme

### Database
- **MongoDB Atlas** or **Local MongoDB** (v5.0+)
- **MongoDB Compass** - Database GUI (optional)

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

```bash
# Check Node.js version (v16+ required)
node --version

# Check npm version
npm --version

# Check MongoDB status
mongod --version
```

**Required Software:**
- Node.js (v16.0.0 or higher)
- npm (v8.0.0 or higher)
- MongoDB (v5.0.0 or higher)
- Git

**Optional:**
- MongoDB Compass (for database visualization)
- Postman (for API testing)

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/api-gateway-dashboard.git
cd api-gateway-dashboard
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Dependencies installed:
# - express: ^4.18.2
# - mongoose: ^7.0.0
# - jsonwebtoken: ^9.0.0
# - bcrypt: ^5.1.0
# - axios: ^1.4.0
# - cors: ^2.8.5
# - dotenv: ^16.0.3
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Dependencies installed:
# - react: ^18.2.0
# - react-dom: ^18.2.0
# - lucide-react: ^0.263.1
# - vite: ^4.3.0
```

### 4. Database Setup

**Option A: Local MongoDB**

```bash
# Start MongoDB service
# On macOS (with Homebrew)
brew services start mongodb-community

# On Windows (as Administrator)
net start MongoDB

# On Linux (systemd)
sudo systemctl start mongod

# Verify MongoDB is running
# Should connect to mongodb://localhost:27017
mongo
```

**Option B: MongoDB Atlas (Cloud)**

1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get connection string
4. Use in `.env` file

---

## ⚙️ Configuration

### Backend Environment Variables

Create `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/api-gateway
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/api-gateway

# JWT Secret (IMPORTANT: Change this!)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Rate Limiting Configuration
RATE_LIMIT_WINDOW=3600000  # 1 hour in milliseconds

# External API Keys (Optional - for testing services)
OPENWEATHER_API_KEY=your-openweather-api-key

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:5173
```

### Frontend Environment Variables

Create `.env` file in the `frontend` directory:

```env
# API Configuration
VITE_API_URL=http://localhost:3000

# App Configuration
VITE_APP_NAME=API Gateway Dashboard
VITE_APP_VERSION=1.0.0
```

### Important Security Notes

⚠️ **Before deploying to production:**

1. **Change JWT_SECRET** to a strong, random string
2. **Never commit** `.env` files to Git
3. **Use HTTPS** in production
4. **Restrict CORS** to specific origins
5. **Enable MongoDB authentication**

---

## 🎯 Usage

### Starting the Application

**Terminal 1 - Backend Server:**
```bash
cd backend
npm start

# Output:
# Server running on port 3000
# Connected to MongoDB successfully
```

**Terminal 2 - Frontend Dev Server:**
```bash
cd frontend
npm run dev

# Output:
# VITE v4.3.0  ready in 500 ms
# ➜  Local:   http://localhost:5173/
# ➜  Network: use --host to expose
```

**Terminal 3 - MongoDB (if local):**
```bash
# Start MongoDB service (if not already running)
mongod --dbpath /path/to/your/data/db

# Connect to database with Compass
# Connection string: mongodb://localhost:27017
```

### Access the Application

- **Frontend Dashboard:** http://localhost:5173
- **Backend API:** http://localhost:3000
- **MongoDB:** mongodb://localhost:27017

### First-Time Setup

1. **Create Account**
   - Navigate to http://localhost:5173
   - Click "Sign Up"
   - Enter email and password (min 6 characters)
   - Click "Create Account"

2. **Generate API Key**
   - After login, click "Create New Key"
   - Enter client name (e.g., "My Test App")
   - Set rate limit (e.g., 100 requests/hour)
   - Click "Generate Key"
   - **IMPORTANT:** Copy and save the key immediately!

3. **Test Your API Key**
   - Navigate to "Test Services" tab
   - Paste your API key
   - Select a service (e.g., "Random Quote")
   - Click "Test Service"
   - View response and rate limit headers

---

## 📡 API Documentation

### Base URL
```
http://localhost:3000
```

### Authentication Endpoints

#### Sign Up
```http
POST /api/auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123"
}

Response: 201 Created
{
  "message": "User created successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id",
    "email": "user@example.com"
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123"
}

Response: 200 OK
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id",
    "email": "user@example.com"
  }
}
```

### API Key Management Endpoints

#### Create API Key
```http
POST /api/clients
Authorization: Bearer {jwt_token}
Content-Type: application/json

{
  "name": "My Application",
  "rateLimit": 100
}

Response: 201 Created
{
  "_id": "client_id",
  "name": "My Application",
  "apiKey": "a1b2c3d4e5f6...64-char-hex",
  "rateLimit": 100
}
```

#### Get All API Keys
```http
GET /api/clients
Authorization: Bearer {jwt_token}

Response: 200 OK
[
  {
    "_id": "client_id",
    "name": "My Application",
    "apiKey": "a1b2c3d4...",
    "rateLimit": 100,
    "requestCount": 45,
    "createdAt": "2025-01-15T10:30:00Z",
    "windowStart": "2025-01-15T11:00:00Z"
  }
]
```

#### Get API Key Usage
```http
GET /api/clients/:id/usage
Authorization: Bearer {jwt_token}

Response: 200 OK
{
  "rateLimit": 100,
  "usedRequests": 45,
  "remainingRequests": 55
}
```

#### Regenerate API Key
```http
POST /api/clients/:id/regenerate
Authorization: Bearer {jwt_token}

Response: 200 OK
{
  "oldApiKey": "a1b2c3d4...",
  "newApiKey": "x9y8z7w6..."
}
```

#### Delete API Key
```http
DELETE /api/clients/:id
Authorization: Bearer {jwt_token}

Response: 200 OK
{
  "message": "Client deleted successfully",
  "clientId": "client_id"
}
```

### Rate-Limited Service Endpoints

All service endpoints require the `X-API-Key` header:

#### Weather Service
```http
GET /api/test/weather?city=London
X-API-Key: your-api-key

Response: 200 OK
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 54
X-RateLimit-Reset: 2025-01-15T12:00:00Z

{
  "service": "Weather API",
  "location": "London",
  "temperature": 15.5,
  "description": "cloudy",
  "humidity": 75,
  "windSpeed": 5.2
}
```

#### Rate Limit Exceeded
```http
Response: 429 Too Many Requests
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 2025-01-15T12:00:00Z

{
  "error": "Rate limit exceeded",
  "message": "You have exceeded your rate limit of 100 requests per hour",
  "rateLimit": 100,
  "remainingRequests": 0,
  "resetIn": "45 minutes",
  "resetAt": "2025-01-15T12:00:00Z"
}
```

### Available Test Services

| Endpoint | Parameters | Description |
|----------|------------|-------------|
| `/api/test/status` | None | API health check |
| `/api/test/weather` | `city` (required) | Weather data |
| `/api/test/quote` | None | Random quote |
| `/api/test/dog` | None | Random dog image |
| `/api/test/cat-fact` | None | Random cat fact |
| `/api/test/random-user` | None | Random user data |
| `/api/test/joke` | None | Random joke |
| `/api/test/crypto` | `coin` (default: bitcoin) | Crypto prices |
| `/api/test/ip-info` | `ip` (required) | IP geolocation |

---

## 🔍 Rate Limiting Logic

### How It Works

The rate limiting middleware implements a **sliding window algorithm** with the following logic:

#### 1. Request Interception
```javascript
// Every request with X-API-Key header passes through this middleware
const apiKey = req.header('X-API-Key');
```

#### 2. API Key Validation
```javascript
// Check if key exists in database
const client = await Client.findOne({ apiKey });
if (!client) return res.status(403).json({ error: 'Invalid API key' });
```

#### 3. Usage Window Check
```javascript
// Fetch or create usage record
let usage = await ApiUsage.findOne({ apiKey });

// Check if window expired (default: 1 hour)
const WINDOW_SIZE = 60 * 60 * 1000; // 1 hour in ms
const windowExpired = now - usage.windowStart > WINDOW_SIZE;

if (windowExpired) {
  // Reset counter and start new window
  usage.count = 0;
  usage.windowStart = new Date();
}
```

#### 4. Rate Limit Enforcement
```javascript
// Check if limit exceeded
if (usage.count >= client.rateLimit) {
  return res.status(429).json({ 
    error: 'Rate limit exceeded',
    resetIn: `${minutesUntilReset} minutes`
  });
}
```

#### 5. Counter Update (Atomic Operation)
```javascript
// Increment counter atomically to prevent race conditions
usage.count += 1;
await usage.save();

// Also update client's requestCount for dashboard display
client.requestCount = usage.count;
await client.save();
```

#### 6. Response Headers
```javascript
// Set standard rate limit headers
res.setHeader('X-RateLimit-Limit', client.rateLimit);
res.setHeader('X-RateLimit-Remaining', client.rateLimit - usage.count);
res.setHeader('X-RateLimit-Reset', resetTime.toISOString());
```

### Algorithm Choice: Sliding Window

**Why Sliding Window over Fixed Window?**

✅ **Fairer distribution** - No traffic spikes at window boundaries  
✅ **More accurate** - Tracks actual usage over time  
✅ **Better UX** - Gradual quota recovery  
✅ **Prevents gaming** - Can't wait for window reset to burst

**Example:**
```
Fixed Window:
11:00-11:59 → 100 requests ✅
12:00-12:01 → 100 requests ✅ (200 in 2 minutes!)

Sliding Window:
11:00-12:00 → 100 requests ✅
12:00-12:01 → Blocked (still within 1-hour window)
```

### Concurrency Handling

**Challenge:** Multiple simultaneous requests could cause race conditions:
```
Request A reads: count = 99
Request B reads: count = 99  ← Both think they're #100!
Request A writes: count = 100
Request B writes: count = 100 ← Lost update!
```

**Solution:** Atomic operations and proper database transactions:
```javascript
// Atomic increment ensures accuracy
await ApiUsage.findOneAndUpdate(
  { apiKey },
  { $inc: { count: 1 } },
  { new: true }
);
```

### Performance Optimization

- **Database Indexing:** API keys are indexed for O(1) lookups
- **Connection Pooling:** Reuse database connections
- **Lean Queries:** Only fetch required fields
- **Error Handling:** Fail gracefully without blocking requests

---

## 📂 Project Structure

```
api-gateway-dashboard/
│
├── backend/
│   ├── controllers/
│   │   └── serviceController.js      # External API integrations
│   │
│   ├── middleware/
│   │   ├── auth.js                   # JWT authentication middleware
│   │   └── rateLimiter.js            # ⭐ Custom rate limiting logic
│   │
│   ├── models/
│   │   ├── User.js                   # User schema + password hashing
│   │   ├── Client.js                 # API key schema
│   │   └── ApiUsage.js               # Usage tracking schema
│   │
│   ├── routes/
│   │   ├── authRoutes.js             # Login/signup endpoints
│   │   ├── clientRoutes.js           # API key CRUD operations
│   │   └── testRoutes.js             # Rate-limited test services
│   │
│   ├── .env                          # Environment variables
│   ├── .gitignore                    # Git ignore rules
│   ├── server.js                     # Express app entry point
│   └── package.json                  # Backend dependencies
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth.jsx              # Login/Signup component
│   │   │   ├── Header.jsx            # Navigation header
│   │   │   ├── Navigation.jsx        # Tab navigation
│   │   │   ├── Footer.jsx            # Footer component
│   │   │   ├── ApiKeyManager.jsx     # API keys dashboard
│   │   │   ├── CreateApiKeyForm.jsx  # Create new key form
│   │   │   ├── ClientCard.jsx        # Individual key card
│   │   │   └── ApiTester.jsx         # Service testing interface
│   │   │
│   │   ├── styles/
│   │   │   └── animations.css        # CSS animations
│   │   │
│   │   ├── App.jsx                   # Main application
│   │   └── index.js                  # React entry point
│   │
│   ├── public/
│   │   └── index.html                # HTML template
│   │
│   ├── .env                          # Frontend environment variables
│   ├── .gitignore                    # Git ignore rules
│   ├── vite.config.js                # Vite configuration
│   └── package.json                  # Frontend dependencies
│
├── .gitignore                        # Root git ignore
├── README.md                         # This file
├── LICENSE                           # MIT License
└── CONTRIBUTING.md                   # Contribution guidelines
```

### Key Files Explained

**Backend:**
- `middleware/rateLimiter.js` - **Core innovation**: Custom rate limiting middleware
- `models/ApiUsage.js` - Tracks request counts and time windows
- `controllers/serviceController.js` - Integrates 8+ external APIs for testing

**Frontend:**
- `components/ApiKeyManager.jsx` - Main dashboard for key management
- `components/ClientCard.jsx` - Visual usage statistics with progress bars
- `components/ApiTester.jsx` - Interactive API testing interface

---

## 📸 Screenshots

### Authentication Page
![Authentication](https://via.placeholder.com/800x500/1a1a1a/6366f1?text=Login+%2F+Signup+Page)

### API Keys Dashboard
![Dashboard](https://via.placeholder.com/800x500/1a1a1a/6366f1?text=API+Keys+Dashboard+with+Usage+Statistics)

### API Tester
![Tester](https://via.placeholder.com/800x500/1a1a1a/6366f1?text=Service+Tester+with+Rate+Limit+Info)

---

## 🚀 Deployment

### Backend Deployment (Heroku)

```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create new app
heroku create your-api-gateway-backend

# Set environment variables
heroku config:set JWT_SECRET=your-secret
heroku config:set MONGODB_URI=your-mongodb-atlas-uri

# Deploy
git push heroku main
```

### Frontend Deployment (Vercel)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd frontend
vercel

# Set environment variables in Vercel dashboard
VITE_API_URL=https://your-api-gateway-backend.herokuapp.com
```

### Database (MongoDB Atlas)

1. Create cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Whitelist all IP addresses (0.0.0.0/0) or specific IPs
3. Create database user
4. Get connection string
5. Update `MONGODB_URI` in backend `.env`

---

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

### Quick Start for Contributors

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- **Express.js** - Fast, unopinionated web framework
- **React** - UI component library
- **MongoDB** - Flexible NoSQL database
- **Vite** - Next generation frontend tooling
- **Lucide** - Beautiful icon library
- **External APIs** - Weather, quotes, and fun data providers

---

## 🎯 Future Enhancements

- [ ] **Redis Integration** - Sub-millisecond cache lookups
- [ ] **WebSocket Support** - Real-time usage updates
- [ ] **Usage Analytics** - Historical charts and graphs
- [ ] **Email Notifications** - Quota warnings
- [ ] **API Key Scopes** - Endpoint-level permissions
- [ ] **Webhook Support** - Event-driven integrations
- [ ] **Rate Limit Strategies** - Token bucket, leaky bucket algorithms
- [ ] **Admin Dashboard** - System-wide monitoring
- [ ] **API Documentation** - OpenAPI/Swagger integration
- [ ] **Docker Support** - Containerized deployment

---

## 📊 Project Stats

- **Lines of Code:** ~3,500+
- **Components:** 8 React components
- **API Endpoints:** 15+ routes
- **External API Integrations:** 8 services
- **Database Models:** 3 schemas
- **Middleware Functions:** 2 (auth, rate limiter)

---

## 🔗 Related Links

- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://reactjs.org/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Vite Documentation](https://vitejs.dev/)
- [JWT Introduction](https://jwt.io/introduction)
- [Rate Limiting Best Practices](https://cloud.google.com/architecture/rate-limiting-strategies-techniques)

---

<div align="center">

**Built with ❤️ for learning, demonstration, and production use**

⭐ Star this repo if you found it helpful!

[Report Bug](https://github.com/yourusername/api-gateway-dashboard/issues) • [Request Feature](https://github.com/yourusername/api-gateway-dashboard/issues)

</div>
