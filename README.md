# 🚀 API Gateway Dashboard - Complete Setup Guide

A modern, dark-themed API management dashboard built with React. Features include API key management, rate limiting visualization, and service testing.

## ✨ Features

- 🎨 **Modern Dark Theme** - Sleek, professional UI with purple gradient accents
- 🔐 **Authentication** - Secure login/signup with JWT tokens
- 🔑 **API Key Management** - Create, view, and delete API keys
- 📊 **Usage Tracking** - Real-time monitoring with color-coded progress bars
- 🧪 **Service Testing** - Built-in API tester with rate limit display
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- ✨ **Smooth Animations** - Professional transitions and loading states

## 📁 Project Structure

```
api-gateway-dashboard/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Auth.jsx
│   │   ├── Header.jsx
│   │   ├── Navigation.jsx
│   │   ├── Footer.jsx
│   │   ├── ApiKeyManager.jsx
│   │   ├── CreateApiKeyForm.jsx
│   │   ├── ClientCard.jsx
│   │   └── ApiTester.jsx
│   ├── styles/
│   │   └── animations.css
│   ├── App.jsx
│   └── index.js
├── package.json
└── README.md
```

## 🛠️ Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API running on `http://localhost:3000`

### Step 1: Create React App

```bash
npx create-react-app api-gateway-dashboard
cd api-gateway-dashboard
```

### Step 2: Install Dependencies

```bash
npm install lucide-react
```

### Step 3: Create Project Structure

```bash
# Create directories
mkdir -p src/components src/styles

# You can use these commands or create manually
```

### Step 4: Copy Files

Copy all the component files into their respective directories:

**Components** (`src/components/`):
- `Auth.jsx`
- `Header.jsx`
- `Navigation.jsx`
- `Footer.jsx`
- `ApiKeyManager.jsx`
- `CreateApiKeyForm.jsx`
- `ClientCard.jsx`
- `ApiTester.jsx`

**Styles** (`src/styles/`):
- `animations.css`

**Root** (`src/`):
- `App.jsx`
- `index.js`

**Public** (`public/`):
- `index.html`

**Project Root**:
- `package.json` (update with provided dependencies)

### Step 5: Start Development Server

```bash
npm start
```

The app will open at `http://localhost:3000`

## 🔧 Configuration

### Backend URL

Update the backend URL in each component if your backend runs on a different port:

```javascript
const BASE_URL = 'http://localhost:3000'; 
```

Files to update:
- `Auth.jsx`
- `ApiKeyManager.jsx`
- `CreateApiKeyForm.jsx`
- `ClientCard.jsx`
- `ApiTester.jsx`

### API Endpoints

The dashboard expects these endpoints:

**Authentication:**
- `POST /api/auth/login`
- `POST /api/auth/signup`

**API Keys:**
- `GET /api/clients` - Get all API keys
- `POST /api/clients` - Create new API key
- `DELETE /api/clients/:id` - Delete API key

**Testing:**
- `GET /api/test/:service` - Test API service

## 🎨 Customization

### Colors

Edit the color scheme in component styles:

```javascript
const styles = {
  // Primary colors
  primaryGradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
  
  // Status colors
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  
  // Background colors
  bg: '#0a0a0a',
  cardBg: '#1a1a1a',
  
  // Text colors
  text: '#e5e7eb',
  textMuted: '#9ca3af'
};
```

### Animations

Edit animations in `src/styles/animations.css`:

```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
```

## 📖 Usage Guide

### 1. Authentication

**Sign Up:**
1. Click "Sign Up" on the login page
2. Enter email and password (min 6 characters)
3. Click "Create Account"

**Login:**
1. Enter your credentials
2. Click "Sign In"
3. You'll be redirected to the dashboard

### 2. Creating API Keys

1. Navigate to "API Keys" tab
2. Click "Create New Key"
3. Enter client name (e.g., "My App")
4. Set rate limit (requests per window)
5. Click "Generate Key"
6. **Important:** Copy and save the key immediately!

### 3. Managing API Keys

**View Key:**
- Click the eye icon to show/hide the key

**Copy Key:**
- Click the copy icon to copy to clipboard

**Delete Key:**
- Click the trash icon
- Confirm deletion

**Monitor Usage:**
- View real-time usage statistics
- Color-coded progress bar:
  - 🟢 Green: < 70% used
  - 🟡 Yellow: 70-90% used
  - 🔴 Red: > 90% used

### 4. Testing Services

1. Navigate to "Test Services" tab
2. Paste your API key
3. Select a service from the dropdown
4. Enter required parameters (if any)
5. Click "Test Service"
6. View response and rate limit info

**Available Services:**
- API Status
- Weather (requires city)
- Random Quote
- Random Dog Image
- Cat Fact
- Random User
- Random Joke
- Crypto Price (requires coin)
- IP Geolocation (requires IP)

## 🐛 Troubleshooting

### Network Error

**Problem:** "Network error. Please try again."

**Solutions:**
1. Ensure backend is running on `http://localhost:3000`
2. Check if CORS is enabled on backend
3. Verify API endpoints are correct

### Authentication Issues

**Problem:** Can't login or signup

**Solutions:**
1. Check backend auth endpoints
2. Verify JWT token is returned
3. Clear localStorage: `localStorage.clear()`
4. Check browser console for errors

### API Keys Not Loading

**Problem:** Empty state shows despite having keys

**Solutions:**
1. Check authentication token in localStorage
2. Verify GET `/api/clients` endpoint
3. Check browser network tab for response
4. Ensure Authorization header is sent

### Rate Limit Not Updating

**Problem:** Usage statistics don't change

**Solutions:**
1. Refresh the API keys list
2. Check if backend is updating requestCount
3. Verify the response includes updated data


## 📦 Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "lucide-react": "^0.263.1",
  "react-scripts": "5.0.1"
}
```

## 🎯 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 License

MIT License - feel free to use for personal or commercial projects.

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the project structure documentation
3. Inspect browser console for errors
4. Verify backend API is functioning

## 🎉 Credits

Built with:
- React
- Lucide React Icons
- Modern CSS3 Features
- Lots of ❤️

---

**Happy Coding! 🚀**