# 🚀 Quick Start Guide

Get the Restaurant Admin Dashboard up and running in 5 minutes!

## Prerequisites Checklist

- [ ] Node.js installed (v18+) - [Download](https://nodejs.org/)
- [ ] MongoDB Atlas account - [Sign up free](https://www.mongodb.com/cloud/atlas)
- [ ] Git installed
- [ ] Code editor (VS Code recommended)

---

## ⚡ Fast Setup (5 Minutes)

### 1️⃣ Get MongoDB Connection String (2 min)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Build a Database" → Choose FREE M0
3. Create cluster (AWS, any region)
4. Security Quickstart:
   - Username: `admin`
   - Password: `admin123` (or your choice)
   - Click "Create User"
5. Network Access → "Add IP Address" → "Allow Access from Anywhere" (0.0.0.0/0)
6. Database → "Connect" → "Connect your application"
7. Copy connection string:
   ```
   mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
8. Replace `<password>` with your actual password

### 2️⃣ Setup Backend (2 min)

```bash
# Navigate to server folder
cd server

# Install dependencies
npm install

# Create .env file
echo "MONGODB_URI=mongodb+srv://admin:admin123@cluster0.xxxxx.mongodb.net/restaurant_db?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development" > .env

# Seed database with sample data
npm run seed

# Start server
npm run dev
```

✅ Backend running at `http://localhost:5000`

### 3️⃣ Setup Frontend (1 min)

**Open new terminal:**

```bash
# Navigate to client folder
cd client

# Install dependencies
npm install

# Create .env file
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env

# Start React app
npm start
```

✅ Frontend running at `http://localhost:3000`

---

## 🎉 You're Done!

Your dashboard is now running. Open browser to:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api

---

## 🧪 Quick Test

### Test the Dashboard:
1. Go to http://localhost:3000
2. You should see the Dashboard page with stats
3. Click "Menu Management" - see 15 sample menu items
4. Try searching for "chicken"
5. Click "Orders" - see 10 sample orders
6. Try changing an order status

### Test the API:
Open browser or Postman:
```
http://localhost:5000/api/health
http://localhost:5000/api/menu
http://localhost:5000/api/orders
```

---

## 📱 Features to Try

### Menu Management Page
1. **Search:** Type in search box (note 300ms delay - debouncing!)
2. **Filter:** Select category dropdown
3. **Toggle Availability:** Click green/red button (instant UI update - optimistic!)
4. **Add Item:** Click "Add New Menu Item" button
5. **Edit:** Click "Edit" on any card
6. **Delete:** Click "Delete" (confirms first)

### Orders Page
1. **Filter:** Select status from dropdown
2. **Expand:** Click any order to see details
3. **Update Status:** Change status dropdown
4. **Pagination:** Click Next/Previous buttons

### Dashboard
1. **Stats Cards:** Total orders, revenue, menu items
2. **Top Sellers:** See 5 best-selling items (MongoDB aggregation!)
3. **Recent Orders:** Latest 5 orders

---

## 🐛 Troubleshooting

### Backend won't start?
```bash
# Check if MongoDB URI is correct
# Make sure .env file exists in server folder
# Check if port 5000 is free
lsof -ti:5000 | xargs kill -9
```

### Frontend won't start?
```bash
# Make sure .env file exists in client folder
# Clear npm cache
npm cache clean --force
# Reinstall
rm -rf node_modules package-lock.json
npm install
```

### Can't connect to MongoDB?
1. Check username/password in connection string
2. Verify IP address is whitelisted (0.0.0.0/0)
3. Make sure you replaced `<password>` with actual password
4. Try the connection string in MongoDB Compass first

### API calls fail from frontend?
1. Check backend is running on port 5000
2. Verify REACT_APP_API_URL in client/.env
3. Check browser console for CORS errors

---

## 📝 Next Steps

### Want to Deploy?
See [README.md](README.md#-deployment-guide) for detailed deployment instructions.

### Want to Customize?
- Add more menu items in `server/scripts/seed.js`
- Change colors in `client/tailwind.config.js`
- Modify API endpoints in `server/routes/`
- Update UI components in `client/src/components/`

### Want to Test API?
See [API_TESTING.md](API_TESTING.md) for complete API documentation and Postman collection.

---

## 🎯 Assessment Checklist

- [x] RESTful API with Express
- [x] MongoDB with Mongoose
- [x] React frontend with routing
- [x] Search with debouncing (300ms)
- [x] Optimistic UI updates
- [x] MongoDB aggregation (top sellers)
- [x] Form validation
- [x] Error handling
- [x] Pagination
- [x] Responsive design
- [x] Environment variables
- [x] Seed script
- [x] README documentation

---

## 💡 Pro Tips

1. **Use MongoDB Compass** to view your database visually
2. **Use React DevTools** to inspect component state
3. **Check Network Tab** in browser DevTools to see API calls
4. **Watch terminal logs** for backend errors
5. **Test on mobile** - it's responsive!

---

## 🆘 Need Help?

Common issues and solutions in [README.md](README.md#-common-issues--solutions)

---

**Happy Coding! 🚀**
