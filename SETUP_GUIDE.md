# 🚀 E-Commerce Project Setup Guide

This guide will help you set up and run the e-commerce project with both frontend and backend components.

## 🔧 Step-by-Step Setup

### 1. Install Dependencies

First, install all project dependencies:

```Terminal
# Navigate to project directory
cd ecommerce

# Install all dependencies (with legacy peer deps to resolve conflicts)
npm install --legacy-peer-deps
```

### 2. Database Setup

#### Local MongoDB

1. **Start MongoDB Service:**

   ```
   # In Windows
   net start MongoDB
   ```

2. **Use Local Connection String:**
   - `mongodb://localhost:27017/ecommerce`

### 3. Environment Configuration

1. **Create Environment File:**

   ```Terminal
   # Copy the example environment file
   cp api/config/config.env.example api/.env
   ```

2. **Configure Environment Variables:**
   Edit `api/.env`:

### 4. Database Initialization

The database will be created automatically when you first run the application. However, you can manually create some initial data:

1. **Start the application first:**

   ```Terminal
   npm start
   ```

2. **Check MongoDB Connection:**
   - Look for "Mongoose Connected" in the console
   - If you see this, the database connection is successful

### 5. Running the Application

#### Method 1: Run Both Frontend and Backend Together (Recommended)

```Terminal
npm start
```

This command runs:

- Backend server on `http://localhost:4000`
- Frontend React app on `http://localhost:3000`

#### Method 2: Run Separately

```bash
# Terminal 1: Start backend only
npm run server

# Terminal 2: Start frontend only
npm run client
```

### 6. Verify Installation

1. **Backend API:**

   - Open `http://localhost:4000` in your browser

2. **Frontend:**
   - Open `http://localhost:3000` in your browser

### For Backend Development:

```Terminal
# Start backend
npm run server

# The server will restart automatically on file changes -->
```

### For Frontend Development:

```Terminal
# Start frontend
npm run client
```

### For Full-Stack Development:

```Terminal
# To Start both frontend and backend
npm start
```

## 🎉 Success!

Once everything is running, you should see:

- Backend server running on port 4000
- Frontend React app running on port 3000
- MongoDB connection established
- E-commerce application accessible in your browser

Happy coding! 🚀
