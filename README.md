# Restaurant Admin Dashboard 🍽️

A full-stack MERN application for managing restaurant menu items, tracking inventory, and handling customer orders. Built for the Eatoes Intern Technical Assessment.

## 🌟 Features

### Menu Management
- ✅ Full CRUD operations for menu items
- ✅ Real-time search with debouncing (300ms delay)
- ✅ Filter by category and availability
- ✅ Optimistic UI updates for availability toggle
- ✅ Image support for menu items
- ✅ Ingredient tracking

### Order Management
- ✅ View all orders with pagination
- ✅ Filter orders by status
- ✅ Update order status with dropdown
- ✅ Expandable order details
- ✅ Auto-calculated totals
- ✅ Auto-generated order numbers

### Dashboard & Analytics
- ✅ Overview statistics (total orders, revenue, menu items)
- ✅ Top 5 selling items (MongoDB aggregation)
- ✅ Recent orders display
- ✅ Revenue tracking

### Technical Highlights
- ✅ MongoDB text search indexing
- ✅ Custom React hooks (useDebounce, useFetch)
- ✅ Optimistic UI updates with rollback on error
- ✅ Responsive design with Tailwind CSS
- ✅ Form validation on both frontend and backend
- ✅ RESTful API design
- ✅ Environment-based configuration

## 🛠️ Tech Stack

**Frontend:**
- React 18+
- React Router v6
- Axios
- Tailwind CSS
- Lucide React Icons

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS
- dotenv

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account (free tier)
- npm or yarn
- Git

## 🚀 Local Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd restaurant-admin-dashboard
```

### 2. Backend Setup

```bash
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

**Edit `.env` file with your MongoDB credentials:**

```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/restaurant_db?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
```

**Seed the database with sample data:**

```bash
npm run seed
```

**Start the backend server:**

```bash
npm run dev
```

Server will run on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal:

```bash
cd client

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

**Edit `.env` file:**

```env
REACT_APP_API_URL=http://localhost:5000/api
```

**Start the React development server:**

```bash
npm start
```

Frontend will run on `http://localhost:3000`

## 📚 API Documentation

### Base URL
`http://localhost:5000/api`

### Menu Endpoints

#### Get All Menu Items
```http
GET /menu?category=Main Course&isAvailable=true&minPrice=10&maxPrice=20
```

**Query Parameters:**
- `category` (optional): Filter by category
- `isAvailable` (optional): Filter by availability (true/false)
- `minPrice` (optional): Minimum price
- `maxPrice` (optional): Maximum price

**Response:**
```json
{
  "success": true,
  "count": 5,
  "data": [...]
}
```

#### Search Menu Items
```http
GET /menu/search?q=chicken
```

**Query Parameters:**
- `q` (required): Search query

#### Get Single Menu Item
```http
GET /menu/:id
```

#### Create Menu Item
```http
POST /menu
Content-Type: application/json

{
  "name": "Margherita Pizza",
  "description": "Classic pizza with fresh mozzarella",
  "category": "Main Course",
  "price": 14.99,
  "ingredients": ["dough", "tomato", "mozzarella", "basil"],
  "preparationTime": 25,
  "imageUrl": "https://example.com/image.jpg",
  "isAvailable": true
}
```

#### Update Menu Item
```http
PUT /menu/:id
Content-Type: application/json

{
  "price": 15.99,
  "isAvailable": false
}
```

#### Delete Menu Item
```http
DELETE /menu/:id
```

#### Toggle Availability
```http
PATCH /menu/:id/availability
```

### Order Endpoints

#### Get All Orders
```http
GET /orders?status=Pending&page=1&limit=10
```

**Query Parameters:**
- `status` (optional): Filter by status
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Response:**
```json
{
  "success": true,
  "count": 10,
  "total": 50,
  "page": 1,
  "pages": 5,
  "data": [...]
}
```

#### Get Single Order
```http
GET /orders/:id
```

#### Create Order
```http
POST /orders
Content-Type: application/json

{
  "items": [
    {
      "menuItem": "menu_item_id",
      "quantity": 2
    }
  ],
  "customerName": "John Doe",
  "tableNumber": 5
}
```

#### Update Order Status
```http
PATCH /orders/:id/status
Content-Type: application/json

{
  "status": "Preparing"
}
```

**Valid statuses:** Pending, Preparing, Ready, Delivered, Cancelled

#### Get Top Sellers (Analytics)
```http
GET /orders/analytics/top-sellers
```

## 🌐 Deployment Guide

### MongoDB Atlas Setup

1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (M0 free tier)
3. Create database user with read/write permissions
4. Whitelist IP: `0.0.0.0/0` (for testing) or specific IPs
5. Get connection string and add to `.env`

### Backend Deployment (Render)

1. Create account at [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name:** restaurant-admin-api
   - **Root Directory:** server
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
5. Add environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `NODE_ENV`: production
6. Click "Create Web Service"
7. Note your backend URL: `https://your-app.onrender.com`

### Frontend Deployment (Netlify)

1. Create account at [netlify.com](https://www.netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub repository
4. Configure:
   - **Base directory:** client
   - **Build command:** `npm run build`
   - **Publish directory:** client/build
5. Add environment variable:
   - `REACT_APP_API_URL`: `https://your-backend.onrender.com/api`
6. Click "Deploy site"
7. Your site will be live at `https://your-site.netlify.app`

## 🎯 Assessment Challenges Completed

### ✅ Challenge 1: Search with Debouncing
- Custom `useDebounce` hook delays API calls by 300ms
- Prevents unnecessary API requests while user types
- Shows loading indicator during search
- Handles empty queries and special characters

**Implementation:** `client/src/hooks/useDebounce.js`

### ✅ Challenge 2: MongoDB Aggregation
- Top 5 selling items using aggregation pipeline
- Joins Orders with MenuItems collection
- Groups by item and calculates totals
- Sorts by quantity sold

**Implementation:** `server/controllers/orderController.js` → `getTopSellers()`

### ✅ Challenge 3: Optimistic UI Updates
- Availability toggle updates UI immediately
- API call happens in background
- Automatic rollback on error with notification
- Prevents multiple simultaneous updates

**Implementation:** `client/src/components/MenuCard.js` → `handleToggleAvailability()`

## 📁 Project Structure

```
restaurant-admin-dashboard/
├── server/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── models/
│   │   ├── MenuItem.js           # Menu item schema
│   │   └── Order.js              # Order schema
│   ├── controllers/
│   │   ├── menuController.js     # Menu business logic
│   │   └── orderController.js    # Order business logic
│   ├── routes/
│   │   ├── menuRoutes.js         # Menu API routes
│   │   └── orderRoutes.js        # Order API routes
│   ├── scripts/
│   │   └── seed.js               # Database seeder
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── server.js                 # Entry point
│
└── client/
    ├── public/
    │   ├── index.html
    │   └── _redirects            # Netlify SPA routing
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js         # Navigation component
    │   │   ├── MenuCard.js       # Menu item card
    │   │   ├── MenuForm.js       # Add/Edit menu modal
    │   │   └── OrderRow.js       # Order display
    │   ├── pages/
    │   │   ├── Dashboard.js      # Analytics dashboard
    │   │   ├── MenuManagement.js # Menu CRUD page
    │   │   └── Orders.js         # Orders list page
    │   ├── hooks/
    │   │   ├── useDebounce.js    # Debounce hook
    │   │   └── useFetch.js       # API fetch hook
    │   ├── utils/
    │   │   └── api.js            # API service layer
    │   ├── App.js                # Main app component
    │   ├── index.js              # React entry point
    │   └── index.css             # Tailwind imports
    ├── .env.example
    ├── .gitignore
    ├── package.json
    ├── tailwind.config.js
    └── postcss.config.js
```

## 🧪 Testing the Application

### Backend Testing (Postman/Thunder Client)

1. **Health Check:**
   ```
   GET http://localhost:5000/api/health
   ```

2. **Get All Menu Items:**
   ```
   GET http://localhost:5000/api/menu
   ```

3. **Search Menu:**
   ```
   GET http://localhost:5000/api/menu/search?q=pizza
   ```

4. **Create Menu Item:**
   ```
   POST http://localhost:5000/api/menu
   Body: { "name": "Test Item", "category": "Appetizer", "price": 9.99 }
   ```

### Frontend Testing

1. Navigate to `http://localhost:3000`
2. Test search with debouncing (type slowly, note delayed API call)
3. Toggle menu item availability (note instant UI update)
4. Filter menu by category
5. View orders and change status
6. Check dashboard analytics

## 🐛 Common Issues & Solutions

### Issue: MongoDB Connection Error
**Solution:** Check your connection string, ensure IP is whitelisted, verify username/password

### Issue: CORS Error
**Solution:** Verify backend CORS is configured, check frontend API URL

### Issue: Port Already in Use
**Solution:** 
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or use different port in .env
PORT=5001
```

### Issue: Build Fails on Netlify
**Solution:** Ensure all dependencies are in `package.json`, not `devDependencies`

## 📝 Features Implemented

- ✅ RESTful API design
- ✅ MongoDB indexing (text search, compound indexes)
- ✅ Mongoose schema validation
- ✅ Custom React hooks
- ✅ Debounced search
- ✅ Pagination
- ✅ Optimistic UI
- ✅ Responsive design
- ✅ Form validation
- ✅ Error handling
- ✅ Environment configuration
- ✅ MongoDB aggregation
- ✅ Auto-generated order numbers
- ✅ Auto-calculated totals

## 🎓 Learning Outcomes

This project demonstrates:
- Full-stack MERN development
- RESTful API design patterns
- MongoDB query optimization
- React state management
- Performance optimization techniques
- Production deployment workflows
- Best practices for code organization

## 👨‍💻 Author

Developed as part of the Eatoes Intern Technical Assessment

## 📄 License

ISC

---

**Note:** This is a technical assessment project. For production use, add authentication, rate limiting, input sanitization, and comprehensive error logging.
